import React from 'react';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBContainer,
} from 'mdbreact';
import {BrowserRouter as Router} from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <header>
                        <MDBNavbar color="black" fixed="top" dark expand="md">
                            <MDBContainer>
                                <MDBNavbarBrand href="/">
                                    <strong>CrewMeister</strong>
                                </MDBNavbarBrand>
                            </MDBContainer>
                        </MDBNavbar>
                    </header>
                </Router>
            </div>
        )
    }
}

export default Header;