import { combineReducers } from "redux";

import AuthReducers from "./auth";
import UserReducers from "./users"

const rootReducer = combineReducers({
    AuthReducers,
    UserReducers
})

export default rootReducer;