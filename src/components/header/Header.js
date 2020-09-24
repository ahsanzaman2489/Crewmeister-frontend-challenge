import React from 'react';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBContainer,
} from 'mdbreact';

const Header = () => {
    return (
        <header>
            <MDBNavbar color="black" dark expand="md">
                <MDBContainer>
                    <MDBNavbarBrand>
                        <strong>Crewmeister frontend coding challenge</strong>
                    </MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar>
        </header>
    )
};

export default Header;