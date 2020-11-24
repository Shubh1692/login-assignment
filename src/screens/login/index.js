import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap'
import { config } from '../../config/api.constants';
import API from '../../config/api';
import { withCookies } from 'react-cookie';
import { toast } from 'react-toastify';

export const Login = ({ cookies, setuserInfo, history }) => {
    const [{
        email, password
    }, setFormValues] = useState({
        email: '',
        password: ''
    })
    const api = new API(cookies);

    const handleLogin = async (e) => {
        e.preventDefault()
        let result = await api.post(config.login, { email, password });
        if (result && result.data) {
            cookies.set('token', result.data.token)
            setuserInfo(result.data);
            toast.success(result.message);
        }
    }

    const setFormValuesByKeyValue = (key, value) => {
        setFormValues({
            ...{
                email, password
            },
            ...{
                [key]: value
            }
        })
    }
    return (
        <div className="main-view">
            <div className="login-view">

                <Form onSubmit={handleLogin} className="login-form">
                    <Card>
                        <Card.Body>
                            <Form.Group>
                                <Form.Control className="round-input" value={email} onChange={(e) => setFormValuesByKeyValue('email', e.target.value)} type="email" placeholder="Email" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control className="round-input" value={password} onChange={(e) => setFormValuesByKeyValue('password', e.target.value)} type="password" placeholder="Password" required />
                            </Form.Group>

                            <Button size="lg" varient="primary" type="submit" className="btn btn-primary round-input w-100 login-btn" type="submit">
                                Login
                            </Button>
                            <div className="forget-password">
                                <span onClick={() => history.push('/forget-password')}>
                                    Forgotten Password?
                                </span>
                            </div>
                            <div className="border">

                            </div>
                            <Button onClick={() => history.push('/register')} size="lg"  type="submit" className="btn btn-success round-input w-100 reg-login-btn" type="submit">
                                Create New Account
                            </Button>
                        </Card.Body>
                    </Card>

                </Form>
            </div>

        </div>
    );
}

export default withCookies(Login);