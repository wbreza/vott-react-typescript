import { combineReducers } from 'redux'
import * as menu from './applicationReducer';
import * as file from './fileReducer'

export default combineReducers({
    appSettings: menu.applicationReducer,
    fileIO: file.fileReducer
});