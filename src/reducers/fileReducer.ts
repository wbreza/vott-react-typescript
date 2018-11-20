import * as ActionTypes from '../actions/actionTypes';

export const fileReducer = (state: any = {}, action: any) => {
    switch (action.type) {
        case ActionTypes.READ_FILE:
            return { ...state, path: action.value.path };
        case ActionTypes.WRITE_FILE:
            return { ...state, path: action.value.path, contents: action.value.contents };
        default:
            return state;
    }
}