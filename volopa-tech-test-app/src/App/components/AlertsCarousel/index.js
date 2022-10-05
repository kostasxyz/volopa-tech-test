import Icon, { LeftCircleOutlined, RightCircleFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Collapse, Image, Row, Space, Typography } from "antd";
import user from './store/images/user.png';
import { ReactComponent as successDot } from './store/images/success-dot.svg';
import { notificationData } from "./store/data";

function AlertsCarousel() {
    const item = notificationData.notifications[0];
    const SuccessDotIcon = (props) => <Icon component={successDot} {...props} />
    return (
        <Row>
            <Col span={24}>
                <Card className="bg-gradient big-rounded">
                    <Row>
                        <Col span={24}>
                            <Typography.Text level={4} className='dark-green medium fs-25px'>
                                Alerts - <Typography.Text type='danger'>{notificationData.alerts}</Typography.Text>
                            </Typography.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={21}>
                            <Typography.Text className='dark-green medium fs-18px'>Mark all as read</Typography.Text>
                        </Col>
                        <Col span={3}>
                            {notificationData.notifications.length > 1 && (
                                <Space size='middle' className='dark-green' style={{ fontSize: '15px' }}>
                                    <LeftCircleOutlined /><RightCircleFilled />
                                </Space>
                            )}
                        </Col>
                    </Row>
                    <Row className="m-t-5">
                        <Col span={24}>
                            <Col span={24}>
                                <Collapse ghost className="bg-white">
                                    <Collapse.Panel className="full-width-pannel-header" header={
                                        <>
                                            <Row align="middle">
                                                <Col span={18}>
                                                    <Space align="center">
                                                        <Avatar shape="square" size={64} icon={<UserOutlined />} src={user} />
                                                        <Space direction="vertical" size={0}>
                                                            <Typography.Text className="fs-18px medium">{item.name}</Typography.Text>
                                                            <Typography.Text className="light-green muli semi-bold fs-18px">{item.messsage}</Typography.Text>
                                                        </Space>
                                                    </Space>
                                                </Col>
                                                <Col span={6}>
                                                    <Button type="primary" className="right-align-text big-rounded bg-green" icon={<SuccessDotIcon />}>
                                                        {item.type}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </>
                                    }
                                        showArrow={false}>
                                        <Row align="bottom">
                                            <Col span={18}>
                                                <Space direction="vertical" size={0}>
                                                    <Typography.Text className="medium fs-18px">Transaction Date</Typography.Text>
                                                    <Typography.Text className="light-green muli semi-bold fs-18px">{item.date}</Typography.Text>
                                                    <Typography.Text className="medium fs-18px">You Send</Typography.Text>
                                                    <Space align="center">
                                                        {item.sendImage && <Image src={item.sendImage} preview={false} height={48} />}
                                                        <Typography.Text className="light-green muli semi-bold fs-18px">{item.send}</Typography.Text>
                                                    </Space>
                                                    <Typography.Text className="medium fs-18px">Recipient(s) Receive</Typography.Text>
                                                    <Space align="center">
                                                        {item.receiveImage && <Image src={item.receiveImage} preview={false} height={48} />}
                                                        <Typography.Text className="light-green muli semi-bold fs-18px">{item.receive}</Typography.Text>
                                                    </Space>
                                                </Space>
                                            </Col>
                                            <Col span={6}>
                                                <Button type="primary" block>Clear</Button>
                                            </Col>
                                        </Row>
                                    </Collapse.Panel>
                                </Collapse>
                            </Col>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
}

export default AlertsCarousel;