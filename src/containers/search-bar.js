import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather,determineEnableOrDisableSubmiting } from '../actions/index'
import { ALLOWED, NOT_ALLOWED, PENDING} from '../reducers/reducer_app'
class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = { term : ''};
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(e){
        // console.log(e.target.value);
        this.setState({ term : e.target.value});
    }

    onFormSubmit(event){
        event.preventDefault();
        this.props.fetchWeather(this.state.term);
        this.setState({ term : ''});
    }

    onTestSubmitting(e){
        this.props.determineEnableOrDisableSubmiting();
    }

    render(){
        return  (
            <form onSubmit={this.onFormSubmit} className="input-group">
                <span className="input-group-btn">
                    <button type="button" className="btn btn-secondary" onClick={this.onTestSubmitting.bind(this)}>test</button>
                </span>
                <input 
                    placeholder="Get a five-day forecast in your favorite cities"
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange}
                />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary" disabled={this.props.app.isAbleSubmitting != ALLOWED}>{
                        (() => {
                            console.log(this.props.app.isAbleSubmitting)
                            switch(this.props.app.isAbleSubmitting){
                                case ALLOWED:
                                    return 'Submit';
                                case NOT_ALLOWED:
                                    return 'Not Allowed Submitting';
                                case PENDING:
                                    return "Pending";
                            }
                        })()
                        }</button>
                </span>
            </form>
        )
    }
}

function mapStateToProps(state){
    return { app : state.app};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchWeather,determineEnableOrDisableSubmiting }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);