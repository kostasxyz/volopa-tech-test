import { useEffect, useMemo, useState } from "react";
import { Row, Col, Typography, Card, Form, Input, Select, Space, Progress, Button, Modal } from "antd";
import useCurrencyRatesQuery from "../../hooks/useCurrencyRatesQuery";

function RateChecker() {
    const ratesQuery = useCurrencyRatesQuery();
    const [currencyToId, setCurrencyToId] = useState();
    const [currencyFromId, setCurrencyFromId] = useState();
    const [currencyTo, setCurrencyTo] = useState();
    const [currencyFrom, setCurrencyFrom] = useState();
    const [amountTo, setAmountTo] = useState(0);
    const [amountFrom, setAmountFrom] = useState(0);
    const [confirmConvertionModal, setConfirmConvertionModal] = useState(false);
    const [form] = Form.useForm();

    // Group currencies (common, other), 
    // memoize values since we refresh every minute
    const rateGroupsMemo = useMemo(() => {
        return  {
            common: ratesQuery.data ? ratesQuery.data.filter(rate => rate.group === 'common') : [],
            other: ratesQuery.data ? ratesQuery.data.filter(rate => rate.group === 'other') : [],
        }
    }, [ratesQuery.data]);

    useEffect(() => {
        setAmountFrom(() => convertCurrency('to', amountTo));
    },[currencyToId, currencyFromId]);

    const showConfirmConvertionModal = () => {
        if(amountTo && amountFrom) {
            setConfirmConvertionModal(true);
        }
      };
    
      const handleConfirmConvertionModal = () => {
        setConfirmConvertionModal(false);
      };
    
      const handleCancelConfirmConvertionModal = () => {
        setConfirmConvertionModal(false);
      };

    const handleToChange = (val) => {
        setCurrencyToId(() => val);
        setCurrencyTo(() => ratesQuery?.data?.find(rate => rate.id === val));
    }

    const handleFromChange = (val) => {
        setCurrencyFromId(() => val);
        setCurrencyFrom(() => ratesQuery?.data?.find(rate => rate.id === val));
    }

    const handleAmountToChange = (val) => {
        setAmountTo(() => val);
        setAmountFrom(() => convertCurrency('to', val));
    }

    const handleAmountFromChange = (val) => {
        setAmountFrom(() => val);
        setAmountTo(() => convertCurrency('from', val));
    }

    const convertCurrency = (direction, amount) => {
        if(!currencyToId || !currencyFromId) return 0;

        const x = amount * (direction === 'to' ? currencyTo.rate : currencyFrom.rate);
        const y = x * (1 / (direction === 'to' ? currencyFrom.rate : currencyTo.rate));

        return y.toFixed(5);
    }

    return (
        <>
            <Modal 
                title="Confirm Convertion" 
                visible={confirmConvertionModal} 
                onOk={handleConfirmConvertionModal} 
                onCancel={handleCancelConfirmConvertionModal}
            >
                <p>You are about to convert {amountFrom} {currencyFrom?.target}</p>
                <p>to {amountTo} {currencyTo?.target}</p>
            </Modal>
            <Row>
                <Col span={24}>
                    <Typography.Text className='dark-green medium fs-25px'>Rate Checker</Typography.Text>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card>
                        <Card.Grid className='full-width rounded b-g hover:border-transparent'>
                            <Form layout='vertical' onFinish={showConfirmConvertionModal} form={form}>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            name='convertTo'
                                            label={<span className='muli semi-bold fs-18px'>Convert To</span>}
                                        >
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Select
                                                        className='dark-green'
                                                        showSearch
                                                        onChange={handleToChange}
                                                    >
                                                        {!!rateGroupsMemo.common.length
                                                            ? <Select.OptGroup label='Common'>
                                                                {rateGroupsMemo.common
                                                                    // .filter(frate => frate.id !== currencyFromId)
                                                                    .map(rate => 
                                                                        <Select.Option key={rate.id} value={rate.id}>{rate.target}</Select.Option>
                                                                )}
                                                            </Select.OptGroup>
                                                            : null
                                                        }
                                                        {!!rateGroupsMemo.other.length
                                                            ? <Select.OptGroup label='Other'>
                                                                {rateGroupsMemo.other
                                                                    // .filter(frate => frate.id !== currencyFromId)
                                                                    .map(rate => 
                                                                        <Select.Option key={rate.id} value={rate.id}>{rate.target}</Select.Option>
                                                                )}
                                                            </Select.OptGroup>
                                                            : null
                                                        }
                                                    </Select>
                                                </Col>
                                                <Col span={18}>
                                                    <Input type="number" placeholder='Enter Amount' value={amountTo} onChange={evt => handleAmountToChange(evt.target.valueAsNumber)}/>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                        <Form.Item
                                            name='convertFrom'
                                            label={<span className='muli semi-bold fs-18px'>Convert From</span>}
                                        >
                                            <Row gutter={8}>
                                                <Col span={6}>
                                                    <Select
                                                        className='dark-green'
                                                        showSearch
                                                        onChange={handleFromChange}
                                                    >
                                                        {!!rateGroupsMemo.common.length
                                                            ? <Select.OptGroup label='Common'>
                                                                {rateGroupsMemo.common
                                                                    // .filter(frate => frate.id !== currencyToId)
                                                                    .map(rate => 
                                                                        <Select.Option key={rate.id} value={rate.id}>{rate.target}</Select.Option>
                                                                )}
                                                            </Select.OptGroup>
                                                            : null
                                                        }
                                                        {!!rateGroupsMemo.other.length
                                                            ? <Select.OptGroup label='Other'>
                                                                {rateGroupsMemo.other
                                                                    // .filter(frate => frate.id !== currencyToId)
                                                                    .map(rate => 
                                                                        <Select.Option key={rate.id} value={rate.id}>{rate.target}</Select.Option>)
                                                                }
                                                            </Select.OptGroup>
                                                            : null
                                                        }
                                                    </Select>
                                                </Col>
                                                <Col span={18}>
                                                    <Input type="number" placeholder='Enter Amount' value={amountFrom} onChange={evt => handleAmountFromChange(evt.target.valueAsNumber)}/>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row align='bottom'>
                                    <Col span={12}>
                                        <Space>
                                            <Progress type='circle' percent={75} width={40} format={() => `30s`} />
                                            <Space direction='vertical' size={0}>
                                                <Typography.Text className='muli semi-bold light-green'>FX Rate</Typography.Text>
                                                <Typography.Text className='muli semi-bold light-green'>1 GBP = 1.19 EUR</Typography.Text>
                                            </Space>
                                        </Space>
                                    </Col>
                                    <Col span={12} className='right-align-text'>
                                        <Button type='primary' htmlType='submit'>Convert</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Grid>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default RateChecker;