import React from 'react';
import Tabs from '~/components/library/tabs/tabs';

const FirstComponent: React.FC = () => {
    return (
        <>
            <div>first component</div>
        </>
    );
};

const SecondComponent: React.FC = () => {
    return (
        <>
            <div>second component</div>
        </>
    );
};

const TabScreen = () => {
    function changeTab(value: number) {
        console.log(value);
    }
    return (
        <>
            <Tabs value={1} onChange={changeTab}>
                <Tabs.Tab
                    value={1}
                    component={FirstComponent}
                    label="first item"
                />
                <Tabs.Tab
                    value={2}
                    component={SecondComponent}
                    label="second  item"
                />
            </Tabs>
        </>
    );
};

export default TabScreen;
