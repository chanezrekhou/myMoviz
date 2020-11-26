import React, { useState } from 'react';
import { Nav, NavbarBrand, NavItem, NavLink, Popover, PopoverHeader, PopoverBody, } from 'reactstrap';
import { MDBBtn } from 'mdbreact';

const NavBar = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    var wishList = props.wishList;
    var list = [];
    for (let i = 0; i < wishList.length; i++) {
        let parameter = wishList[i].titreFilm;
        list.push(
            <div class="border p-2">
                <img width="20%" src={wishList[i].imgFilm} alt="star wars" />
                <span class="pl-2">{wishList[i].titreFilm}</span>
                <MDBBtn rounded color="danger" onClick={() => handleDeleteClick(parameter)}>Déjà vu</MDBBtn>
            </div>
        )
    }

    var handleDeleteClick = (titreFilm) => {
        props.handleDeleteClickParent(titreFilm)
        
      }    
      
      return (
        <div>
            <Nav>
                <NavbarBrand><img src="/logo.png" alt="logo" /></NavbarBrand>
                <NavItem><NavLink style={{ color: 'white' }}>Last Releases</NavLink></NavItem>
                <NavItem>
                    <MDBBtn rounded color="danger" id="Popover1" type="button">{wishList.length} film</MDBBtn>
                    <Popover width="30" placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                        <PopoverHeader>Wishlist</PopoverHeader>
                        <PopoverBody>{list}</PopoverBody>
                    </Popover>
                </NavItem>
            </Nav>
        </div>
    );
}

export { NavBar };