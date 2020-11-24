import React from 'react';
import { withCookies } from 'react-cookie';
import { Button, Card } from 'react-bootstrap'
export const Home = ({ cookies, userInfo, setuserInfo }) => {


  const logout = () => {
    cookies.remove('token')
    setuserInfo(null)
  }
  return (
    <div className="main-view">
      <div className="login-view">
        <div className="login-form">
          <Card>
            <Card.Body>
              {userInfo && <div className="user-detail">
                <div>
                  Name: {`${userInfo.firstName} ${userInfo.lastName}`}
                </div>
                <div>
                  Email: {`${userInfo.email}`}
                </div>
              </div>}
              <Button onClick={() => logout()} size="lg" type="submit" className="btn btn-success round-input w-100 reg-login-btn" type="submit">
                Logout
            </Button>
            </Card.Body>
          </Card>

        </div>
      </div>
    </div>
  );
}

export default withCookies(Home);