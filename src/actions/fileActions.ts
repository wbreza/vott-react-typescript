import * as ActionTypes from './actionTypes';
import { IpcRendererProxy } from '../common/ipcRendererProxy';

export interface IFileActions {
    writeFile(path: string, content: object): Promise<object>;
    readFile(path: string): Promise<object>;
}

export function writeFile(path: string, content: object) {
    var payload = {"path": path, "content": content};
    var actionType = ActionTypes.WRITE_FILE;
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

export function readFile(path: string) {
    var payload = {"path": path}
    var actionType = ActionTypes.READ_FILE;
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