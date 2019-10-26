import React, {Component} from 'react';
import './Survey.css';
import {Card} from 'antd';

class Survey extends Component {

    render() {
        return (
            <div className="survey-item" onClick={() => {
                this.props.fetchNode(this.props.childId)
            }}>
                <Card className="survey-card" hoverable>
                    <p>{this.props.childDesc}</p>
                </Card>
            </div>
        );
    }
}

export default Survey;