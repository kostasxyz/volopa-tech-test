import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";

function Login() {
    const [form] = Form.useForm();
    const api = useApi();
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(auth?.auth_token) {
            navigate('/wallet/dashboard');
        }
    }, [auth]);

    const onSubmit = async (values) => {

        try {
            const { data } = await api.post('/login', values);
            setAuth(() => ({user: data.user, auth_token: data.auth_token}));
        }
        catch(err) {
            form.setFields([
                {
                  email: 'email',
                  errors: err?.response?.data?.errors?.email,
                },
                {
                    name: 'password',
                    value: '',
                    errors: err?.response?.data?.errors?.password,
                  },
             ]);
        }
    }

    return (
        <Row className="full-height" align="middle" justify="center">
            <Col xxl={6} xl={9} lg={12} md={12} sm={18} xs={22}>
                <Card>
                    <Card.Grid className="full-width rounded">
                        <Row>
                            <Col span={24}>
                                <Typography.Text className="medium fs-28px dark-green">Login</Typography.Text>
                            </Col>
                        </Row>
                        <Row className="m-t-10">
                            <Col span={24}>
                                <Form 
                                    onFinish={onSubmit}
                                    form={form}
                                    layout="vertical"
                                    requiredMark={false}
                                    initialValues={{ email: 'user@test.com', password: 'password' }}
                                >
                                    <Form.Item
                                        label={<span className="muli semi-bold">Email</span>}
                                        name='email'
                                        rules={[{ required: true, message: 'Please enter a valid email!' }]}
                                    >
                                        <Input  type="email" />
                                    </Form.Item>
                                    <Form.Item
                                        label={<span className="muli semi-bold">Password</span>}
                                        name='password'
                                        rules={[{ required: true, message: 'Please enter your password' }]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Button type="primary" htmlType="submit" className="right-align-text">Login</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Grid>
                </Card>
            </Col>
        </Row>
    );
}

export default Login;