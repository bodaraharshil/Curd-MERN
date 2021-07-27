import React, { useState } from 'react';
import { connect } from "react-redux";
import { withRouter, useHistory } from 'react-router-dom';
import { Superlogin, Userlogin } from "../store/actions/auth"
const Login = (props) => {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const history = useHistory();
    const myfunction=()=>{
            var x = document.getElementById("myInput");
            if (x.type === "password") {
              x.type = "text";
            } else {
              x.type = "password";
            }
    }
    const Postdata = () => {
        props.Superlogin({ Username: Username, Password: Password }, history);
        props.Userlogin({ Username: Username, Password: Password }, history);
    }
    console.log('isLoggedInisLoggedInisLoggedIn', props.isLoggedIn);
    return (
        <React.Fragment>
            <div className="mycard">
                <div className="card auth-card imput-field col">
                    <br />
                    <h2>Login user</h2>
                    <input
                        class="col"
                        type="text"
                        placeholder="Username"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                    /><br />
                    <input
                        type="password"
                        placeholder="password"
                        id="myInput"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <p>
                        <label>
                            <input type="checkbox"  onClick={()=>myfunction()}/>
                            <span>show password</span>
                        </label>
                    </p>
                    <br />
                    <button onClick={() => Postdata()} className="btn waves-effect waves-light-#64b5f6 blue lighten-2" type="submit" name="action">Login
                    </button>
                    <br /><br />
                </div>
            </div>
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
        Superlogin: (data, history) => dispatch(Superlogin(data, history)),
        Userlogin: (data, history) => dispatch(Userlogin(data, history))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));