import axios from "axios"

export function setLoggedIn() {
    return dispatch => {
        dispatch({
            type: 'SET_LOGGED_IN'
        })
    }
}

export function Superlogin(user, history) {
    return (dispatch) => {
        return axios.post('/superlogin', user)
            .then(response => {
                localStorage.setItem("jwt", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("username", JSON.stringify(user.Username));
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    message: response.data.message,
                    status: response.data.status
                })
                history.push("/");
            })
            .catch(function (error) { 
                dispatch({
                    type: 'LOGIN_FAILURE',
                    message: 'Something went wrong',
                })
            })
    }
}

export function Userlogin(user, history) {
    return (dispatch) => {
        return axios.post('/userlogin', user)
            .then(response => {
                localStorage.setItem("jwt", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("username", JSON.stringify(user.Username));
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    message: response.data.message,
                    status: response.data.status
                })
                history.push("/");
            })
            .catch(function (error) { 
                dispatch({
                    type: 'LOGIN_FAILURE',
                    message: 'Something went wrong',
                })
            })
    }
}

export function logoutUser(history) {

    return (dispatch) => {
        localStorage.removeItem("jwt")
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        dispatch({
            type: 'LOGGOUT_SUCCESS',
            message: "logout_success",
        })
        history.push("/login");

    }
}