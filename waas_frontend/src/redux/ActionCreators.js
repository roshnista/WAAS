import * as ActionTypes from './ActionTypes';
import history from "../history";

export const addComment =(username , password)=>({
    type : ActionTypes.ADD_COMMENT,
    payload : {
        username:username,
        password:password
    }
})