import * as ActionTypes from './actionTypes';
import { IpcRendererProxy } from '../common/ipcRendererProxy';

export interface IFileActions {
    writeFile(path: string, content: object): Promise<object>;
    readFile(path: string): Promise<object>;
}

export function writeFile(path: string, content: object) {
    const payload = {
        path: path,
        content: content
    };
    const actionType = ActionTypes.WRITE_FILE;

    return (dispatch) => {
        IpcRendererProxy.send(actionType, payload)
            .then((result) => {
                console.log(result);
                dispatch({ type: actionType, value: payload });
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export function readFile(path: string) {
    const payload = { path: path }
    const actionType = ActionTypes.READ_FILE;

    return (dispatch) => {
        IpcRendererProxy.send(actionType, payload)
            .then(() => {
                dispatch({ type: actionType, value: payload });
            }).catch(e => {
                console.log(e);
                console.log(payload);
                console.log(actionType);
            });
    }
}