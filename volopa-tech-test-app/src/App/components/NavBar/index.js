import logo from '../../../logo.png'
import { Avatar, Col, Row, Space, Tabs } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import user from './store/images/Ellipse_12@2x.png';

function NavBar() {

    return (
        <Row>
            <Col span={3}>
                <div className="logo"><img src={logo} alt='logo' /></div>
            </Col>
            <Col span={20}>
                <Tabs size='large' className='m-t-4'>
                        <Tabs.TabPane 
                        key={0}
                        tab={<span className='fs-18px medium'>Wallet Dashboard</span>} />
                </Tabs>
            </Col>
            <Col span={1}>
                <Space size="small">
                    <Avatar icon={<UserOutlined />} src={user} size={42} />
                    <DownOutlined style={{ fontSize: '10px' }} />
                </Space>
            </Col>
        </Row>
    )
}
export default NavBar;