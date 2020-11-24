import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap'
import { config } from '../../config/api.constants';
import API from '../../config/api';
import { withCookies } from 'react-cookie';
import { toast } from 'react-toastify';

export const Forget = ({ cookies, history }) => {
    const [{
        email
    }, setFormValues] = useState({
        email: '',
        password: ''
    })
    const api = new API(cookies);

    const handleForgot = async (e) => {
        e.preventDefault()
        let result = await api.post(config.forgotPassword, { email });
        if (result) {
            toast.success(result.message);
            history.push('/login')
        }
    }

    const setFormValuesByKeyValue = (key, value) => {
        setFormValues({
            ...{
                email
            },
            ...{
                [key]: value
            }
        })
    }
    return (
        <div className="main-view">
            <div className="login-view">
                <Form onSubmit={handleForgot} className="login-form">
                    <Card>
                        <Card.Body>
                            <Form.Group>
                                <Form.Control className="round-input" value={email} onChange={(e) => setFormValuesByKeyValue('email', e.target.value)} type="email" placeholder="Email" required />
                            </Form.Group><Button varient="primary" type="submit" className="btn btn-primary round-input w-100 login-btn" type="submit">
                                Forget password
                        </Button>
                            <div className="border">

                            </div>
                            <div className="forget-password">
                                <span onClick={() => history.push('/login')}>
                                    Go to login?
                                </span>
                            </div>
                        </Card.Body>
                    </Card>

                </Form>
            </div>

        </div>
    );
}

export default withCookies(Forget);