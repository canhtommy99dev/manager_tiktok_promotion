import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "./../context/useContext";

import { toast } from "react-toastify";

const Header = (props) => {
  const { logout, user } = useContext(UserContext);
  // const [hideHeader, setHideHeader] = useState(false);

  // useEffect(() => {
  //   if (window.location.pathname === "/login") {
  //     setHideHeader(true);
  //   }
  // }, []);

  const navigate = useNavigate();
  const handleClickSignOut = () => {
    logout();
    navigate("/");
    toast.success("Bạn đã đăng xuất thành công");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Tiktok Promotion Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user && user.auth && (
            <>
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about" eventKey="link-1">
                  Link
                </Nav.Link>
                {user && user.email && (
                  <span className="nav-link">Welcome to {user.email}</span>
                )}
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                  {user && user.auth === true ? (
                    <NavDropdown.Item onClick={() => handleClickSignOut()}>
                      Logout
                    </NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  )}

                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;