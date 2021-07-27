import axios from "axios";

export function setLoggedIn() {
    return dispatch => {
        dispatch({
            type: 'SET_LOGGED_IN'
        })
    }
}

export function userRegister(user, history) {
    return (dispatch) => {
        return axios.post('/newuser', user, {headers: { 'content-type': 'multipart/form-data' }})
            .then(response => {
                dispatch({
                    type: 'USER_SUCCESS',
                    message: response.data.message,
                    status: response.data.status
                })
                history.push("/");
            })
            .catch(function (error) { 
                dispatch({
                    type: 'USER_FAILURE',
                    message: 'Something went wrong',
                })
            })
    }
}


export function userGet(page) {
    return (dispatch) => {
        return axios.get(`/alluser/${page}`)
            .then(response => {
                dispatch({
                    type: 'USERGET_SUCCESS',
                    message: "user get list success",
                    data:response.data
                })
            })
            .catch(function (error) { 
                dispatch({
                    type: 'USERGET_FAILURE',
                    message: 'Something went wrong',
                })
            })
    }
}

export function userDelete(id, history) {
    return (dispatch) => {
        return axios.delete(`/userdelete/${id}`)
            .then(response => {
                dispatch({
                    type: 'USERDELETE_SUCCESS',
                    message: "user delete success",
                    // data:response.data
                })
            })
            .catch(function (error) { 
                dispatch({
                    type: 'USERDELETE_FAILURE',
                    message: 'Something went wrong',
                })
            })
    }
}

export function userUpdate(id, data, history) {
    return (dispatch) => {
        return axios.post(`/userupdate/${id}`, data, {headers:{'Content-Type': 'application/json', 'content-type': 'multipart/form-data'}})
            .then(response => {
                dispatch({
                    type: 'USERUPDATE_SUCCESS',
                    message: "data updated success..",
                })
                history.push("/");
            })
            .catch(function (error) { 
                dispatch({
                    type: 'USERUPDATE_FAILURE',
                    message: 'Something went wrong',
                })
            })
    }
}

