import React, {Component} from 'react';
import './FinalPage.css';

import {Button} from "antd";

class FinalPage extends Component {

    render() {
        return (
            <div className="survey-submit">
                <h2 className="survey-submit-header">
                    Our Panda bot has found a list of experts for you
                </h2>
                <Button type="primary" htmlType="submit" size="large" className="survey-submit-button"
                        onClick={this.props.handleSurveySubmit}>View Results</Button>
            </div>
        );
    }
}

export default FinalPage;