import {TOGGLE_SUBMITTING} from '../actions/index';

export const NOT_ALLOWED = -1;
export const ALLOWED = 1;
export const PENDING = 0;
var appState = {
    isAbleSubmitting : PENDING
}
export default function (state = appState, action) {
    console.log('app action received', action);
    switch (action.type){
        case TOGGLE_SUBMITTING:
        //never manipulte state.
            return {...state, isAbleSubmitting : action.payload};
    }
    return state;
}