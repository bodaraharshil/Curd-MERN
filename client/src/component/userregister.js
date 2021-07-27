import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userRegister, userUpdate } from '../store/actions/users';
import { Field, Formik,ErrorMessage } from 'formik';
import M from 'materialize-css';
import * as Yup from 'yup';
import { useHistory,Link,withRouter, useLocation } from 'react-router-dom';

const Signup = (porps) => {

    const history = useHistory();
    const [Photo, setPhoto] = useState(null);


    //*********update user ********* */
    const [UpdateName, setUpdateName] = useState();
    const [UpdateEmail, setUpdateEmail] = useState('');
    const [UpdateUsername, setUpdateUsername] = useState('');
    const [UpdatePhoto, setUpdatePhoto] = useState('');
    const [UpdateAddress, setUpdateAddress] = useState('');
    const [UpdatedId, setUpdatedId] = useState('');

        const senddata = (fields) => {
            console.log('Photo', Photo);
            let formData = new FormData();

            formData.append('Name', fields.Name);
            formData.append('Email', fields.Email); 
            formData.append('Username', fields.Username);
            formData.append('Photo', Photo);
            formData.append('Address', fields.Address);
            formData.append('Password', fields.Password);
            formData.append('Cpassword', fields.Cpassword);
            porps.userRegister(formData, history);
        }

    const updateData = (fields) => {
        let formData = new FormData();
        formData.append('Name', fields.UpdateName);
        formData.append('Email', fields.UpdateEmail);
        formData.append('Username', fields.UpdateUsername);
        formData.append('Photo', UpdatePhoto);
        formData.append('Address', fields.UpdateAddress);
        porps.userUpdate(UpdatedId, formData, history);
    }

    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const data = location.state;
            console.log(data);
            setUpdateName(data.Name);
            setUpdateEmail(data.Email);
            setUpdateUsername(data.Username);
            setUpdateAddress(data.Address);
            setUpdatedId(data._id);
        }
    }, [])

    return (
        <React.Fragment>
            {location.state ?
                <div>
                    <Formik initialValues={{
                        UpdateName: location.state ? location.state.Name : "",
                        UpdateEmail: location.state ? location.state.Email : "",
                        UpdateUsername: location.state ? location.state.Username : "",
                        UpdatePhoto: "",
                        UpdateAddress: location.state ? location.state.Address : "",
                    }}
                        validationSchema={Yup.object().shape({
                            UpdateName: Yup.string()
                                .required('UpdateName is required'),
                            UpdateEmail: Yup.string()
                                .email('Invalid email')
                                .required('UpdateEmail is required'),
                            UpdateUsername: Yup.string()
                                .required("UpdateUsername is required"),
                            UpdateAddress: Yup.string()
                                .required('UpdateAddress is required'),
                        })}
                        onSubmit={fields => {
                            M.toast({ html: 'data updated successfuly....', classes: 'green' });
                            updateData(fields);
                        }}
                        render={({
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                                <div className="mycard">
                                  <Link to="/"><button style={{marginLeft:"50px",marginTop:"100px"}} className="btn waves-effect waves-light-#64b5f6 blue darken-1" type="submit" name="action">Back to
                                    </button></Link>
                                    <form method="post" onSubmit={handleSubmit}>
                                        <div className="card auth-card imput-field">
                                            <br />
                                            <h2>User update information</h2>
                                            <Field name="UpdateName" type="text" value={values.UpdateName} onChange={handleChange} className={'form-control' + (errors.UpdateName && touched.UpdateName ? ' is-invalid' : '')} />
                                            <font color="red"><ErrorMessage name="UpdateName" component="div" className="invalid-feedback " /></font>
                                            <br />
                                            <Field name="UpdateEmail" type="text" value={values.UpdateEmail} onChange={handleChange} className={'form-control' + (errors.UpdateEmail && touched.UpdateEmail ? ' is-invalid' : '')} />
                                            <font color="red"><ErrorMessage name="UpdateEmail" component="div" className="invalid-feedback " /></font>
                                            <br />
                                            <Field name="UpdateUsername" type="text" value={values.UpdateUsername} onChange={handleChange} className={'form-control' + (errors.UpdateUsername && touched.UpdateUsername ? ' is-invalid' : '')} />
                                            <font color="red"><ErrorMessage name="UpdateUsername" component="div" className="invalid-feedback " /></font>
                                            <br />
                                            <div className="file-field input-field">
                                                <div className="btn #64b5f6 blue darken-1">
                                                    <span>File</span>
                                                    <input type="file" onChange={(e) => setUpdatePhoto(e.target.files[0])} />
                                                </div>
                                                <div className="file-path-wrapper">
                                                    <input className="file-path validate" type="text" />
                                                </div>
                                            </div>
                                            <br />
                                            <Field name="UpdateAddress" type="text" value={values.UpdateAddress} onChange={handleChange} className={'form-control' + (errors.UpdateAddress && touched.UpdateAddress ? ' is-invalid' : '')} />
                                            <font color="red"><ErrorMessage name="UpdateAddress" component="div" className="invalid-feedback " /></font>
                                            <br />
                                            <button className="btn waves-effect waves-light-#64b5f6 blue darken-1 " type="submit" name="action">Update user</button>
                                            <br /><br/>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    />
                </div>
                :
                <div>
                    <Formik initialValues={{
                        Name: '',
                        Email: '',
                        Username: '',
                        Address: '',
                        Password: '',
                        Cpassword: ''
                    }}
                        validationSchema={Yup.object().shape({
                            Name: Yup.string()
                                .required('Name is required'),
                            Email: Yup.string()
                                .email('Invalid email')
                                .required('Email is required'),
                            Username: Yup.string()
                                .required("Username is required"),
                            Address: Yup.string()
                                .required('Address is required'),
                            Password: Yup.string()
                                .min(6, 'Password must be at least 6 characters.')
                                .required('Password is required'),
                            Cpassword: Yup.string()
                                .oneOf([Yup.ref('Password'), null], 'Passwords must match')
                                .required('confirm password is required')
                        })}
                        onSubmit={  fields => {
                            M.toast({ html: 'successfuly registred', classes: "green" });
                            senddata(fields);
                        }}
                        render={({
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                                <div className="mycard">
                                      <Link to="/"><button style={{marginLeft:"50px",marginTop:"100px"}} className="btn waves-effect waves-light-#64b5f6 blue darken-1" type="submit" name="action">Back to
                                        </button></Link>
                                    <form method="post" onSubmit={handleSubmit}>
                                        <div className="card auth-card imput-field">
                                            <br />
                                            <h2>User information</h2>
                                            <Field name="Name" type="text" value={values.Name} onChange={handleChange} placeholder="Name" className={'form-control' + (errors.Name && touched.Name ? ' is-invalid' : '')} />
                                            <font color="red"><ErrorMessage name="Name" component="div" className="invalid-feedback" /></font>
                                            <br />
                                            <Field name="Email" type="text" value={values.Email} placeholder="Email" onChange={handleChange} className={'form-control' + (errors.Email && touched.Email ? ' is-invalid' : '')} />
                                            <font color="red"><ErrorMessage name="Email" component="div" className="invalid-feedback " /></font>
                                            <br />
                                            <Field name="Username" type="text" value={values.Username} placeholder="Username" onChange={handleChange} className={'form-control' + (errors.Username && touched.Username ? ' is-invalid' : '')} />
                                            <font color="red"><ErrorMessage name="Username" component="div" className="invalid-feedback " /></font>
                                            <div className="file-field input-field">
                                                <div className="btn #64b5f6 blue darken-1">
                                                    <span>File</span>
                                                    <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                                                </div>
                                                <div className="file-path-wrapper">
                                                    <input className="file-path validate" type="text" />
                                                </div>
                                            </div>
                                            <Field name="Address" type="text" placeholder="Address" value={values.Address} onChange={handleChange} className={'form-control' + (errors.Address && touched.Address ? ' is-invalid' : '')} />
                                            <font color="red"><ErrorMessage name="Address" component="div" className="invalid-feedback " /></font>
                                            <br />
                                            <Field name="Password" type="password" placeholder='Password' value={values.Password} onChange={handleChange} className={'form-control' + (errors.Password && touched.Password ? ' is-invalid' : '')} />
                                            <font color="red"><ErrorMessage name="Password" component="div" className="invalid-feedback " /></font>
                                            <br />
                                            <Field name="Cpassword" type="password" placeholder="Confirm password" values={values.Cpassword} className={'form-control' + (errors.Cpassword && touched.Cpassword ? ' is-invalid' : '')} />
                                            <font color="red"><ErrorMessage name="Cpassword" component="div" className="invalid-feedback " /></font>
                                            <br /><br />
                                            <button className="btn waves-effect waves-light-#64b5f6 blue darken-1" type="submit" name="action">ADD user
                                    </button> <button onClick={() => senddata()} className="btn waves-effect waves-light-#64b5f6 blue darken-1" type="reset" name="action">Reset
                                    </button>
                                            <br /><br />
                                        </div>
                                    </form>
                                </div>
                            )}

                    />
                </div>
            }
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.AuthReducers.showLoginModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userRegister: (data, history) => dispatch(userRegister(data, history)),
        userUpdate: (id, data, history) => dispatch(userUpdate(id, data, history))
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));