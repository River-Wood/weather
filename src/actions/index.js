import axios from 'axios';
import { ALLOWED, NOT_ALLOWED, PENDING} from '../reducers/reducer_app'
const API_KEY = 'c0c31e488297e0d029279f5cf8890844';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER'
export const REMOVE_WEATHER = 'REMOVE_WEATHER'
export const TOGGLE_SUBMITTING = 'TOGGLE_SUBMITTING'

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},us`;
    const request = axios({url,withCredentials: false});

    console.log('Request:', request);
    return {
        type : FETCH_WEATHER,
        payload : request
    };
}

export function removeWeather(cityId){
    return {
        type : REMOVE_WEATHER,
        payload : cityId
    }
}

export function determineEnableOrDisableSubmiting(){
    return function (dispatch) {
        setTimeout(function () {
            let ran = Math.random();
            let res = (() => {
                if ((ran - 0.33) < 0)
                    return NOT_ALLOWED;
                else if ((ran - 0.66) < 0)
                    return ALLOWED;
                else
                    return PENDING;
            })();    
            dispatch({
                type: TOGGLE_SUBMITTING,
                payload : res
            })
        }, 2000)
    }
}