import React from 'react';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBContainer,
} from 'mdbreact';
import {BrowserRouter as Router} from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Router>
                <header>
                    <MDBNavbar color="black" dark expand="md">
                        <MDBContainer>
                            <MDBNavbarBrand href="/">
                                <strong>Crewmeister frontend coding challenge</strong>
                            </MDBNavbarBrand>
                        </MDBContainer>
                    </MDBNavbar>
                </header>
            </Router>
        </div>
    )
};

export default Header;