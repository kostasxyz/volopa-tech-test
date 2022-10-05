import { SyncOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import convertBalances from './images/convertBalances.png'
import fund from './images/fund.png'
import cards from './images/cards.png'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => text,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button type="primary" size="small" icon={<SyncOutlined />}>Repeat</Button>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'Wallet Top Up',
        age: '£699',
        address: 'Manual Push Funds',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Wallet Top Up',
        age: '£699',
        address: 'Easy Transfer',
        tags: ['nice', 'developer'],
    },
    {
        key: '3',
        name: 'Wallet Top Up',
        age: '£699',
        address: 'Easy Transfer',
        tags: ['nice', 'developer'],
    },
    {
        key: '4',
        name: 'Wallet Top Up',
        age: '£699',
        address: 'Easy Transfer',
        tags: ['nice', 'developer'],
    },
];

const dashboardProps = {
    headers: [
        '£721.07',
        '£710.50',
        '£10.57'
    ],
    cards: [
        {
            image: convertBalances,
            text: 'Convert Balances'
        },
        {
            image: cards,
            text: 'Fund Card'
        },
        {
            image: fund,
            text: 'Add Funding Account'
        },
    ]
}

export { columns, data, dashboardProps }