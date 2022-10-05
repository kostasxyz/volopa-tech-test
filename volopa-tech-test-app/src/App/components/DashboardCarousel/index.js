import { Card, Col, Image, Row, Space, Typography } from "antd";

function DashboardCarousel(props) {
    return (
        <>
            {props && (
                <Row>
                    <Col span={24}>
                        <Card className="bg-gradient big-rounded dashboard-carousel">
                            {props.headers && (
                                <>
                                    <Row className="m-r-160">
                                        <Col span={10}>
                                            <Typography.Text className='light-green right-align-text medium fs-28px'>Total Company Balance</Typography.Text>
                                        </Col>
                                        <Col span={7}>
                                            <Typography.Text className='dark-green right-align-text medium fs-28px'>Wallet Ballance</Typography.Text>
                                        </Col>
                                        <Col span={7}>
                                            <Typography.Text className='dark-green right-align-text medium fs-28px'>Cards Balance</Typography.Text>
                                        </Col>
                                    </Row>
                                    <Row className="m-r-160">
                                        <Col span={10}>
                                            <Typography.Text className='right-align-text bold fs-28px'>{props.headers[0] ? props.headers[0] : '-'}</Typography.Text>
                                        </Col>
                                        <Col span={7}>
                                            <Typography.Text className='right-align-text bold fs-28px'>{props.headers[1] ? props.headers[1] : '-'}</Typography.Text>
                                        </Col>
                                        <Col span={7}>
                                            <Typography.Text className='right-align-text bold fs-28px'>{props.headers[2] ? props.headers[2] : '-'}</Typography.Text>
                                        </Col>
                                    </Row>
                                </>
                            )}
                            {props.cards && (
                                <>
                                    <Row className='p-r-80 p-l-80 m-b-40'>
                                        <Col span={24}>
                                            <Row>
                                                {props.cards.map((item, key) => (
                                                    // Each child in a list should have a unique "key" prop.
                                                    <Col span={8} key={key}>
                                                        <div className="m-t-10 m-r-12 m-b-12 m-l-10">
                                                            <Card.Grid className="full-width bg-white b-g rounded center-align-text hover-no-border">
                                                                <Space direction="vertical">
                                                                    <Image src={item.image} preview={false} height='8.5vw' />
                                                                    <Typography.Text className="muli semi-bold fs-18px">{item.text}</Typography.Text>
                                                                </Space>
                                                            </Card.Grid>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default DashboardCarousel;