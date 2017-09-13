import {FETCH_WEATHER, REMOVE_WEATHER} from '../actions/index';

export default function (state = [], action) {
    console.log('action received', action);
    switch (action.type){
        case FETCH_WEATHER:
        //never manipulte state.
            return [action.payload.data, ...state];
        case REMOVE_WEATHER:
        //never manipulte state.
            return state.filter((item, index) => item.city.id != action.payload);
    }
    return state;
}