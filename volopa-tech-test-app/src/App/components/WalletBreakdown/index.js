import { Row, Col, Typography, Card, Space, Spin  } from "antd";
import useUserWalletsQuery from "../../hooks/useUserWalletsQuery";
import useAuth from "../../hooks/useAuth";

function WalletBreakdown() {

    const { auth } = useAuth();

    const walletsQuery = useUserWalletsQuery(auth?.user?.id);

    return (
        <>
        { walletsQuery.isFetching || walletsQuery.isRefetching
            ? <Space size="middle">
                <Spin size="small" />
                <Spin />
                <Spin size="large" />
            </Space>
            : <Row>
                <Col span={24}>
                    <Typography.Text className='dark-green medium fs-25px'>Wallet Breakdown</Typography.Text>
                    <Row>
                        <Col span={16}>
                            <Card className='bg-gradient big-rounded'>
                                <Row className='m-b-5'>
                                    <Col span={24} className='right-align-text'>
                                        <Typography.Text className='medium fs-18px pointer'>Show All</Typography.Text>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 8]}>
                                    {walletsQuery.data?.map((item, key) => (
                                        (key < 6) && (
                                            <Col span={12} key={key}>
                                                <Card className='b-g ant-card-body-p-5'>
                                                    <Row align='middle'>
                                                        <Col span={12}>
                                                            <Space>
                                                                <span className={`flag flag-${item.currency}`}></span>
                                                                <Typography.Text className='dark-green medium fs-18px'>{item.currency}</Typography.Text>
                                                            </Space>
                                                        </Col>
                                                        <Col span={12} className='right-align-text'>
                                                            <Typography.Text className='dark-green medium fs-18px'>{item.amount > 0 && (item.amount / 100).toFixed(2)}</Typography.Text>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </Col>
                                        )
                                    ))}
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        }
        </>
    );
}

export default WalletBreakdown;
