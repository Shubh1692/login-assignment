import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap'
import { config } from '../../config/api.constants';
import API from '../../config/api';
import { withCookies } from 'react-cookie';
import { toast } from 'react-toastify';

export const Register = ({ cookies, setuserInfo, history }) => {
    const [{
        email, password, firstName, lastName
    }, setFormValues] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    })
    const api = new API(cookies);

    const handleRegister = async (e) => {
        e.preventDefault()
        let result = await api.post(config.register, { email, password, firstName, lastName });
        if (result && result.data) {
            cookies.set('token', result.data.token)
            setuserInfo(result.data);
            toast.success(result.message);
        }
    }

    const setFormValuesByKeyValue = (key, value) => {
        setFormValues({
            ...{
                email, password, firstName, lastName
            },
            ...{
                [key]: value
            }
        })
    }
    return (
        <div className="main-view">
            <div className="login-view">

                <Form onSubmit={handleRegister} className="login-form">
                    <Card>
                        <Card.Body> <Form.Group>
                            <Form.Control className="round-input" value={firstName} onChange={(e) => setFormValuesByKeyValue('firstName', e.target.value)} type="text" placeholder="Firstname" required />
                        </Form.Group>
                            <Form.Group>
                                <Form.Control className="round-input" value={lastName} onChange={(e) => setFormValuesByKeyValue('lastName', e.target.value)} type="text" placeholder="Lastname" required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control className="round-input" value={email} onChange={(e) => setFormValuesByKeyValue('email', e.target.value)} type="email" placeholder="Email" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control className="round-input" value={password} onChange={(e) => setFormValuesByKeyValue('password', e.target.value)} type="password" placeholder="Password" required />
                            </Form.Group>

                            <Button varient="primary" type="submit" className="btn btn-primary round-input w-100 login-btn" type="submit">
                                Register
                        </Button>
                            <div className="border">

                            </div>
                            <div className="forget-password">
                                <span onClick={() => history.push('/login')}>
                                    Already have an account?
                                </span>
                            </div>
                        </Card.Body>
                    </Card>

                </Form>
            </div>

        </div>
    );
}

export default withCookies(Register);