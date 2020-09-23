import React, {Fragment, Suspense} from 'react';
import {MDBContainer} from "mdbreact";
import PropTypes from "prop-types";

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

BasicShell.propTypes = {
    children: PropTypes.node.isRequired
};

export default BasicShell;
