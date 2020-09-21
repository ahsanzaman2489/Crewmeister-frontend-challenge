import React, {Fragment} from 'react';
import Header from "../components/header/Header";
import {MDBContainer} from "mdbreact";

const BasicShell = ({children}) => {

    return (
        <Fragment>
            <Header/>
            <MDBContainer>
                {children}
            </MDBContainer>
        </Fragment>
    );
};

export default BasicShell;
