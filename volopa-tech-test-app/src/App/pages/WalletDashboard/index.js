import { Col, Divider, Row, Table, Typography, Layout } from "antd";
import AlertsCarousel from "../../components/AlertsCarousel";
import DashboardCarousel from "../../components/DashboardCarousel";
import RateChecker from "../../components/RateChecker";
import WalletBreakdown from "../../components/WalletBreakdown";
import NavBar from "../../components/NavBar";
import { columns, dashboardProps, data } from "./store/data";

function WalletDashboard() {
    return (
        <>
            <Layout>
                <Layout.Header>
                    <NavBar />
                </Layout.Header>
                <Layout.Content className='content'>
                    <Row>
                        <Col span={16}>
                            <DashboardCarousel {...dashboardProps} />
                        </Col>
                        <Col span={1}>
                            <Divider type='vertical' style={{ height: '100%', margin: '0 50%' }} />
                        </Col>
                        <Col span={6} offset={1}>
                            <AlertsCarousel />
                        </Col>
                    </Row>
                    <Row className='m-t-20' gutter={16}>
                        <Col span={8}>
                            <WalletBreakdown />
                        </Col>
                        <Col span={6}>
                            <RateChecker />
                        </Col>
                        <Col span={7} offset={3}>
                            <Row>
                                <Col span={24}>
                                    <Typography.Text className='medium fs-25px dark-green'>Recent Funding History</Typography.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Typography.Text className='right-align-text p-b-5 medium fs-18px'>View All</Typography.Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Table
                                        columns={columns}
                                        dataSource={data}
                                        pagination={false}
                                        size='small'
                                        showHeader={false}
                                        rowClassName={(data, index) => index % 2 === 0 ? 'row-border medium fs-18px' : 'medium fs-18px'} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout>
        </>
    );
}

export default WalletDashboard;