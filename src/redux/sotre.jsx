import {combineReducers, createStore} from "redux"
import { Sidereducer } from "./reducer/Sidereducer";
import { Searchreducer } from "./reducer/Searchreducer";
const allReducers={
    sideState:Sidereducer,
    searchMMSI:Searchreducer,
}
const rootReducer=combineReducers(allReducers);
const store=createStore(rootReducer);
export default store;