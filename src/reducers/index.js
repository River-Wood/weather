import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather';
import AppReducer from './reducer_app';

const rootReducer = combineReducers({
  weather : WeatherReducer,
  app : AppReducer
});

export default rootReducer;
