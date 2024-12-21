import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Features/UserSlice';

const Header = () => {
  let Profiler = useSelector((state) => state.users.user.imgUrl);
  let username = useSelector((state) => state.users.user.user);
  let gender = useSelector((state) => state.users.user.gender);
  let defimg =
    'https://static.vecteezy.com/system/resources/thumbnails/013/360/247/small/default-avatar-photo-icon-social-media-profile-sign-symbol-vector.jpg';

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  let NavTo = useNavigate();
  const ToHome = () => {
    NavTo('/home');
  };
  const ToContact = () => {
    NavTo('/contact');
  };
  const ToCompleted = () => {
    NavTo('/completedTasks');
  };

  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logoutUser());
    NavTo('/');
  };

  return (
    <Navbar className="navbar-h" expand="lg" fixed="top">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div className="profile-image-container">
            <img
              className="profile-image"
              src={Profiler ? Profiler : defimg}
              alt="profile"
              width="40px"
              height="40px"
            />
          </div>
          <NavbarBrand href="#">
            <h5 className="mb-0">
              {gender === 'Male' ? 'Mr.' : 'Ms.'} {username}
            </h5>
          </NavbarBrand>
        </div>
        <Nav className="d-flex align-items-center gap-2 text-white" navbar>
          <NavItem>
            <button className="button-no-color" onClick={ToHome}>
              Home
            </button>
          </NavItem>
          <NavItem className="nav-link active">/</NavItem>
          <NavItem>
            <button className="button-no-color" onClick={ToContact}>
              Contact
            </button>
          </NavItem>
          <NavItem>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle nav caret className="button-no-color">
                More
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Options</DropdownItem>
                <DropdownItem
                  className="bi bi-check2-square"
                  onClick={ToCompleted}
                >
                  Completed Tasks
                </DropdownItem>
                <DropdownItem
                  className="bi bi-box-arrow-left"
                  onClick={handleSignOut}
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
