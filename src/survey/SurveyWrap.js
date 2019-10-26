import React, {Component} from 'react';
import './SurveyWrap.css';
import Welcome from "./Welcome";
import {getMatchingAgent, getSurveyNode} from "../utils/APIUtils";
import {Col, notification, Row} from 'antd';
import {APP_NAME} from "../constants";
import LoadingIndicator from "../common/LoadingIndicator";
import Survey from "./Survey";
import FinalPage from "./FinalPage";

class SurveyWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initial: true,
            isLoading: false,
            question: '',
            children: [],
            final: false,
            finalQ: '',
            agent: null

        }
        this.fetchfirst = this.fetchfirst.bind(this);
        this.handleSurveySubmit = this.handleSurveySubmit.bind(this)
    }

    fetchNode(nodeId) {
        this.setState({
            isLoading: true
        })

        getSurveyNode(nodeId)
            .then(response => {
                if (!response.children) {
                    this.setState({
                        isLoading: false,
                        final: true,
                        finalQ: response.surveyid
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        question: response.question,
                        children: response.children
                    })
                }

            }).catch(error => {
            this.setState({
                isLoading: false
            })
            notification.error({
                message: APP_NAME,
                description: error.message || 'Sorry! Something went wrong. Please try again!'

            })
        });

    }

    fetchfirst() {
        this.setState(
            {
                initial: false
            });
        this.fetchNode('R')
    }

    handleSurveySubmit() {
        if (!this.props.isAuthenticated) {
            this.props.history.push("/login");
            notification.info({
                message: APP_NAME,
                description: "Please login to vote.",
            });

        }

        this.setState({
            isLoading: true
        })

        getMatchingAgent(this.state.finalQ)
            .then(response => {
                this.setState({
                    agent: response,
                    isLoading: false
                })
                console.log(this.state.agent)
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });

    }

    render() {
        const cardViews = [];
        Object.entries(this.state.children).map(([key, value]) => {
            cardViews.push(<Col className="gutter-col" span={6}><Survey
                childId={key}
                childDesc={value.toString()}
                fetchNode={(id) => this.fetchNode(id)}
            /></Col>)
        })

        return (
            <div className="survey-wrap">
                {this.state.initial ? (
                        <div className="welcome"><Welcome onFetchFirst={this.fetchfirst}/>
                        </div>
                    ) :
                    !this.state.final ? (
                        this.state.isLoading ? (
                                <LoadingIndicator/>) :
                            <div className="survey-container">
                                <h1 className="survey-question">{this.state.question}</h1>
                                <div className="survey-items">
                                    <Row className="gutter-row" gutter={20}>{cardViews}</Row>
                                </div>
                            </div>) : (<FinalPage handleSurveySubmit={this.handleSurveySubmit}/>)
                }

            </div>
        );
    }
}

export default SurveyWrap;