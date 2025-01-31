import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { increaseCounterBy } from '~/redux/slices/count-slice';

const CounterIncrease = () => {
    const [increase, setIncrease] = useState('');
    const dispatch = useDispatch();
    function increaseAmount() {
        dispatch(increaseCounterBy(Number(increase)));
    }
    return (
        <>
            <div>This is counter</div>
            <input
                placeholder="increase by"
                value={increase}
                onChange={(e) => setIncrease(e.target.value)}
            />
            <button
                className="rounded-lg bg-red-300 p-4"
                onClick={increaseAmount}
            >
                Increase
            </button>
        </>
    );
};

export default CounterIncrease;
