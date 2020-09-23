import React, {Fragment, Suspense} from 'react';
import {MDBContainer} from "mdbreact";

const Header = React.lazy(() => import("../components/header/Header"));

const BasicShell = ({children}) => {

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                <Header/>
            </Suspense>
            <MDBContainer>
                {children}
            </MDBContainer>
        </Fragment>
    );
};

export default BasicShell;
