const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { JWT_SECRET } = require("../connect");
const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null, file.fieldname + '-' + Date.now() + "." + ext)
    }
})

var upload = multer({ storage: storage })


const Superadmin = require("../models/superadmin");
const Admin = require("../models/admin");

router.post("/superinert", (req, res) => {
    const { Username, Password } = req.body;
    bcrypt.hash(Password, 12).then((hashpassword) => {
        const superadd = new Superadmin({
            Username,
            Password: hashpassword
        })
        superadd.save().then((data) => {
            res.json("ucess")
        }).catch((error) => {
            console.log(error);
        })
    }).catch((error) => {
        console.log(error);
    })
})

router.post("/userlogin", (req, res) => {
    const { Username, Password } = req.body;
    if (!Username || !Password) {
        return res.status(422).json({
            error: "please add all field"
        })
    }
    Admin.findOne({ Username: Username })
        .then((saveuser) => {
            if (!saveuser) {
                return res.status(401).json({
                    error: "Invalid Username"
                })
            }
            else {
                bcrypt.compare(Password, saveuser.Password)
                    .then((domatch) => {
                        if (domatch) {
                            const token = jwt.sign({ _id: saveuser._id }, JWT_SECRET);
                            const { _id, Username } = saveuser;
                            res.json({ token, user: { _id, Username } });
                            return res.status(200).json({
                                message: "login sucess"
                            })
                        }
                        else {
                            return res.status(401).json({
                                error: "Invalid Password"
                            })
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
            }
        }).catch((error) => {
            console.log(error);
        })
})

router.post("/superlogin", (req, res) => {
    const { Username, Password } = req.body;
    if (!Username || !Password) {
        return res.status(422).json({
            error: "please add all field"
        })
    }
    Superadmin.findOne({ Username: Username })
        .then((saveuser) => {
            if (!saveuser) {
                return res.status(401).json({
                    error: "Invalid Username"
                })
            }
            else {
                bcrypt.compare(Password, saveuser.Password)
                    .then((domatch) => {
                        if (domatch) {
                            const token = jwt.sign({ _id: saveuser._id }, JWT_SECRET);
                            const { _id, Username } = saveuser;
                            res.json({ token, user: { _id, Username } });
                            return res.status(200).json({
                                message: "login sucess"
                            })
                        }
                        else {
                            return res.status(401).json({
                                error: "Invalid Password"
                            })
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
            }
        }).catch((error) => {
            console.log(error);
        })
})

router.post("/newuser", upload.single('Photo'), (req, res) => {
    const { Name, Email, Username, Address, Password, Cpassword } = req.body;
    const Photo = req.file.filename;
    console.log('req.body.Photo', req.file.filename);
    if (!Name || !Email || !Username || !Address || !Password || !Cpassword) {
        return res.status(422).json({
            error: "please add all field"
        })
    }
    Admin.findOne({ Email: Email })
        .then((saveuser) => {
            if (saveuser) {
                return res.status(401).json({
                    error: "Email alerady used"
                })
            }
            else {
                bcrypt.hash(Password, 12)
                    .then((hashpassword) => {
                        const newuser = new Admin({
                            Name,
                            Email,
                            Username,
                            Photo,
                            Address,
                            Password: hashpassword,
                            Cpassword: hashpassword
                        });
                        newuser.save().then((data) => {
                            return res.status(200).json({
                                message: "successfuly add user"
                            })
                        }).catch((error) => {
                            console.log(error);
                        })
                    }).catch((error) => {
                        console.log(error);
                    })
            }
        }).catch((error) => {
            console.log(error);
        })
})

router.post("/logout", (req, res) => {
    res.send("success logout");
})

router.get('/alluser/:page',(req, res) => {
    let qpage = req.params.page
    const pages = (qpage * 3) - 3;

    try {
        Admin.find().populate('user').skip(pages).limit(3).then((data) => {
            Admin.find().countDocuments().then((num) => {
                res.status(200).send({ 'doc': num, 'data': data })
            })
        })
    } catch (error) {
        res.status(400).json({ error: 'Error in fetch data' })
    }
})

router.delete("/userdelete/:id", (req, res) => {
    id = req.params.id;
    Admin.findByIdAndRemove(id)
        .then((data) => {
            return res.status(200).json({
                message: "data deleted success"
            })
        }).catch((error) => {
            console.log(error);
        })
})

router.post("/userupdate/:id", upload.single('Photo'), (req, res) => {
    id = req.params.id;
    const { Name, Email, Username, Address } = req.body;
    if (!Name || !Email || !Username || !Address) {
        return res.status(422).json({
            error: "please add all field"
        })
    }
    if (req.file) {
        const updatedaita = {   
            Name: Name,
            Email: Email,
            Username: Username,
            Photo: req.file.filename,
            Address: Address
        }
        Admin.findByIdAndUpdate(id, { $set: updatedaita })
            .then((response) => {
                console.log(response);
                return res.status(200).json({
                    message: "data updated"
                })
            }).catch((error) => {
                console.log(error);
            })
    }
    else {
        const updatedaita = {
            Name: Name,
            Email: Email,
            Username: Username,
            Address: Address
        }
        Admin.findByIdAndUpdate(id, { $set: updatedaita })
            .then((response) => {
                console.log(response);
                return res.status(200).json({
                    message: "data updated"
                })
            }).catch((error) => {
                console.log(error);
            })
    }


})

module.exports = router;