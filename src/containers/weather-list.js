import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Chart  from '../components/chart';
import GoogleMap from '../components/google-map';
import { removeWeather } from '../actions/index';
import { bindActionCreators } from 'redux';


class WeatherList extends Component {
    onRemoveCity(id){
        console.log(id)
        this.props.removeWeather(id);
    }

    renderWeather(cityData){
        const name = cityData.city.name;

        const temps = cityData.list.map(weather => weather.main.temp);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        // debugger;
        const { lon , lat } = cityData.city.coord;
        return (
            <tr key={name}>
                <th>{name}<i className="fa fa-times" onClick={ () => {this.onRemoveCity(cityData.city.id)}}></i></th>
                <td><GoogleMap lon={lon} lat={lat} /></td>
                <td>
                    <Chart data={temps} color="orange" units="K"></Chart>
                </td>
                <td>
                    <Chart data={pressures} color="black" units="hPa"></Chart>
                </td>
                <td>
                    <Chart data={humidities} color="green" units="%"></Chart>
                </td>
                
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>    
                        <th>CityName</th>
                        <th>City</th>
                        <th>Temperature (K)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather.bind(this))}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps(state){
    return { weather : state.weather};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ removeWeather }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);