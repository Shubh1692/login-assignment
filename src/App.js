import React, { Fragment, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route, Redirect, Switch
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { withCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from './screens/login';
import Home from './screens/home';
import Reset from './screens/reset';
import Register from './screens/register';
import Forget from './screens/forgot';
import { config } from './config/api.constants';
import API from './config/api';
import './App.css';

function App({
  cookies
}) {
  const [authenticateLoading, setAuthLoading] = useState(true);
  const [userInfo, setuserInfo] = useState(null);
  const api = new API(cookies);
  useEffect(() => {
    validateUser();
  }, []);
  /**
   * This method user for fetch user based on token
   */
  const token = cookies.get('token');
  const validateUser = async () => {
    if (token) {
      const validateUserApiReq = await api.get(config.getUser);
      if (validateUserApiReq && validateUserApiReq.data)
        setuserInfo(validateUserApiReq.data)
    }
    setAuthLoading(false);
  }

  if (authenticateLoading) {
    return <Fragment>
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
    </Fragment>
  }
  return (
    <Fragment>
      <ToastContainer />
      <Router>
        {token ? <Switch>
          <Route exact path='/home' render={() => (<Home {
            ...{
              token,
              cookies, userInfo, setuserInfo
            }
          } />)}></Route>
          <Route exact path='/reset-password/:token' render={(props) => (<Reset {
            ...{
              cookies, userInfo
            }
          } {...props} />)}></Route>
          <Route render={() => (<Redirect to='/home' />)} />
        </Switch> :
          <Switch>
            <Route exact path='/login' render={(props) => (<Login {
              ...{
                cookies, userInfo, setuserInfo
              }
            } {...props} />)}></Route>
            <Route exact path='/register' render={(props) => (<Register {
              ...{
                cookies, userInfo, setuserInfo
              }
            } {...props} />)}></Route>
            <Route exact path='/forget-password' render={(props) => (<Forget {
              ...{
                cookies, userInfo
              }
            } {...props} />)}></Route>
            <Route exact path='/reset-password/:token' render={(props) => (<Reset {
              ...{
                cookies, userInfo
              }

            } {...props} />)}></Route>
            <Route render={() => (<Redirect to='/login' />)} />
          </Switch>
        }
      </Router>

    </Fragment>
  );
}

export default withCookies(App);
