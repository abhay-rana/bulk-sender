import React from 'react';
import Header from '~/components/container/header';
import Footer from '~/components/footer';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <div className="flex min-h-full w-full flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </>
    );
};

export default Container;
