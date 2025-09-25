import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

export default function NavbarLayout() {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          {" "}
          <h3 className="text-success">Shuttle</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{ margin: "0px 10px 0px 0px" }}>
          <Nav className="ms-auto" style={{ margin: "8px 10px 0px 10px" }}>
            <Nav.Link href="#home" style={{ font: "14px", marginRight: "25px" }}>
              <div className="h6 text-dark">Our Service</div>
            </Nav.Link>
            <Nav.Link href="#link" style={{ marginRight: "25px" }}>
              <div className="h6 text-dark">Why Us</div>
            </Nav.Link>
            <Nav.Link href="#link" style={{ marginRight: "25px" }}>
              <div className="h6 text-dark">Testimonial</div>
            </Nav.Link>
            <Nav.Link href="#link" style={{ marginRight: "25px" }}>
              <div className="h6 text-dark">FAQ</div>
            </Nav.Link>
          </Nav>
          <Button type="button" className="btn btn-success">
            Search
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}