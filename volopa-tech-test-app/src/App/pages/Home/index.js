import { Button, Card, Col, Row } from "antd";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Home() {
    const { auth } = useAuth();
    const navigate = useNavigate();

    return (
        <Row className="full-height" align="middle" justify="center">
            <Col xxl={6} xl={9} lg={12} md={12} sm={18} xs={22}>
                <Card>
                    <Card.Grid className="full-width rounded">
                        <Row>
                            <Col span={24}>
                                {!!auth.auth_token
                                    ? <Button type="primary" onClick={() => navigate('/wallet/dashboard')}>Go to dashboard</Button>
                                    : <Button onClick={() => navigate('/login')} type="primary">Login</Button>
                                }
                                
                            </Col>
                        </Row>
                    </Card.Grid>
                </Card>
            </Col>
        </Row>
    )
}

export default Home;