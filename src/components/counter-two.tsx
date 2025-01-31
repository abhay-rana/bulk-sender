import { useAppDispatch, useAppSelector } from '~/hooks/redux-hooks';

import { memo } from 'react';
import { counterTwo } from '~/redux/slices/count-slice';

const CounterTwo = () => {
    const dispatch = useAppDispatch();
    const store = useAppSelector((state) => ({
        counter_two: state.counter_store.counter_two,
    }));
    function increaseSecondCounter() {
        dispatch(counterTwo());
    }
    console.log('re-renders component two');
    return (
        <>
            <div>Counter Two</div>
            <button onClick={increaseSecondCounter}>
                Counter Two : {store.counter_two}
            </button>
        </>
    );
};

export default memo(CounterTwo);
