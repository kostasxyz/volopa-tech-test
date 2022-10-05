import { Select } from "antd";
import { useMemo } from "react";
import useCurrencyRatesQuery from "../../hooks/useCurrencyRatesQuery";
import useSelectedCurrencyStore from "../../hooks/useSelectedCurrencyStore";

function CurrencySelector({slot, onChange = () => {}}) {

    const ratesQuery = useCurrencyRatesQuery();
    const selectedCurrency = useSelectedCurrencyStore();

    // Group currencies (common, other), 
    // memoize values since we refresh every minute
    const rateGroupsMemo = useMemo(() => {
        return  {
            common: ratesQuery.data ? ratesQuery.data.filter(rate => rate.group === 'common') : [],
            other: ratesQuery.data ? ratesQuery.data.filter(rate => rate.group === 'other') : [],
        }
    }, [ratesQuery.data]);

    const handleChange = (val) => {
        setSlot(slot, val);
    }

    return (
        <Select
            className='dark-green'
            showSearch
            onChange={handleChange}
        >
            {!!rateGroupsMemo.common.length
                ? <Select.OptGroup label='Common'>
                    {rateGroupsMemo.common.filter(frate => frate.id !== selectedCurrency[]).map(rate => <Select.Option key={rate.id} value={rate.amount}>{rate.target}</Select.Option>)}
                </Select.OptGroup>
                : null
            }
            {!!rateGroupsMemo.other.length
                ? <Select.OptGroup label='Other'>
                    {rateGroupsMemo.other.filter(frate => frate.id !== from).map(rate => <Select.Option key={rate.id} value={rate.amount}>{rate.target}</Select.Option>)}
                </Select.OptGroup>
                : null
            }
        </Select>
    );
}

export default CurrencySelector;