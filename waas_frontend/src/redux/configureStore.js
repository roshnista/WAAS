import {createStore , combineReducers} from "redux";
import {Reducer , initialState} from "./reducer";
//import all the states and cut above line

export const ConfigureStore=()=>{
        const store = createStore(
            combineReducers({
                //dishes:DISHES and so on...
            })
        )
    return store;
}