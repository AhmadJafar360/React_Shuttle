import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <Container>
      <Row className="mt-5">
        <Col className="md">
          <p>Jalan Suroyo No. 161 Mayangan Kota Jember 672000</p>
          <p>binarcarrental@gmail.com</p>
          <p>081233334808</p>
        </Col>
        <Col className="md">
          <p>Our services</p>
          <p>Why Us</p>
          <p>Testimonial</p>
          <p>FAQ</p>
        </Col>
        <Col className="md">
          <p>Connect with us</p>
          <img src="./assets/img/icon_facebook.png" alt="facebook" />
          <img src="./assets/img/icon_instagram.png" alt="instagram" />
          <img src="./assets/img/icon_twitter.png" alt="twitter" />
          <img src="./assets/img/icon_mail.png" alt="mail" />
          <img src="./assets/img/icon_twitch.png" alt="twitch" />
        </Col>
        <Col className="md">
          <p></p>
          <img src="./assets/img/logo.png" alt="logo" />
        </Col>
      </Row>
    </Container>
  );
}