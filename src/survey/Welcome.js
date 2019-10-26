import React, {Component} from 'react';
import './SurveyWrap.css';
import {Button, Icon} from 'antd';
import {APP_NAME} from "../constants";

class Welcome extends Component {
    render() {
        return (
            <div className="welcome-wrap">
                <h4 className="welcome">
                    Welcome to {APP_NAME} !
                </h4>
                <div className="desc">
                    We can help you find the best services you need!
                </div>
                <Button type="primary" onClick={this.props.onFetchFirst} className="survey-start-button"> Onward!<Icon
                    type="right"/>
                </Button>
            </div>
        );
    }
}

export default Welcome;