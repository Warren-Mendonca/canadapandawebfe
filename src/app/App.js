import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';

import {getCurrentUser} from '../utils/APIUtils';
import {ACCESS_TOKEN, APP_NAME} from '../constants';

import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';

import {Layout, notification} from 'antd';
import SurveyWrap from "../survey/SurveyWrap";

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'bottomRight',
      top: 70,
      duration: 3,
    });
  }

  loadCurrentUser() {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
        .then(response => {
          this.setState({
            currentUser: response,
            isAuthenticated: true,
            isLoading: false
          });
        }).catch(error => {
      this.setState({
        isLoading: false
      });
    });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/", notificationType="success", description="You're successfully logged out.") {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.replace(redirectTo);

    notification[notificationType]({
      message: APP_NAME,
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: APP_NAME,
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push("/");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated}
                     currentUser={this.state.currentUser}
                     onLogout={this.handleLogout} />

          <Content className="app-content">
            <div className="container">
              <Switch>
                <Route exact path="/"
                       render={(props) => <SurveyWrap isAuthenticated={this.state.isAuthenticated}
                                                      currentUser={this.state.currentUser}
                                                      handleLogout={this.handleLogout} {...props} />}>
                </Route>
                <Route path="/login"
                       render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/users/:username"
                       render={(props) => <Profile isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                <Route component={NotFound}/>
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);