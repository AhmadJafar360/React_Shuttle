// src/pages/HomePage.js
import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Tab, Tabs, Accordion } from "react-bootstrap";

export default function HomePage() {
  const [kodeTiket, setKodeTiket] = useState("");
  const [searchData, setSearchData] = useState({
    asal: "",
    tujuan: "",
    tanggal: "",
  });

  const wilayah = ["Jabodetabek", "Bandung", "Semarang", "Surabaya"];

  const handleReservasi = (e) => {
    e.preventDefault();
    alert("Cek reservasi kode: " + kodeTiket);
  };

  const handleQuickSearch = (e) => {
    e.preventDefault();
    alert(
      `Cari shuttle dari ${searchData.asal} ke ${searchData.tujuan} tanggal ${searchData.tanggal}`
    );
  };

  return (
    <Container fluid className="p-4">
      {/* Hero */}
      <section className="text-center my-5">
        <h1>Cari Shuttle dengan Mudah</h1>
        <p>Pesan tiket shuttle antar kota lebih cepat dan nyaman.</p>
        <Button variant="primary" href="/search">
          Cari Shuttle
        </Button>
      </section>

      {/* Daftar Wilayah */}
      <section className="my-5">
        <h3 className="mb-3">Pilih Wilayah</h3>
        {/* Desktop */}
        <div className="d-none d-md-block">
          <Row>
            {wilayah.map((w, i) => (
              <Col key={i} md={3} className="border p-3 text-center">
                {w}
              </Col>
            ))}
          </Row>
        </div>
        {/* Mobile/Tablet */}
        <div className="d-block d-md-none">
          <Tabs defaultActiveKey={wilayah[0]}>
            {wilayah.map((w, i) => (
              <Tab eventKey={w} title={w} key={i}>
                <p className="p-3">{w} – daftar titik keberangkatan...</p>
              </Tab>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Form Cek Reservasi */}
      <section className="my-5">
        <h3>Cek Reservasi</h3>
        <Form onSubmit={handleReservasi} className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Masukkan kode tiket"
            value={kodeTiket}
            onChange={(e) => setKodeTiket(e.target.value)}
          />
          <Button type="submit" variant="success">
            Cari
          </Button>
          <Button
            variant="outline-primary"
            href="https://wa.me/6281234567890"
            target="_blank"
          >
            Chat WhatsApp
          </Button>
        </Form>
      </section>

      {/* Pencarian Cepat */}
      <section className="my-5">
        <h3>Pencarian Cepat</h3>
        <Form onSubmit={handleQuickSearch}>
          <Row className="g-2">
            <Col md>
              <Form.Control
                placeholder="Asal"
                value={searchData.asal}
                onChange={(e) =>
                  setSearchData({ ...searchData, asal: e.target.value })
                }
              />
            </Col>
            <Col md>
              <Form.Control
                placeholder="Tujuan"
                value={searchData.tujuan}
                onChange={(e) =>
                  setSearchData({ ...searchData, tujuan: e.target.value })
                }
              />
            </Col>
            <Col md>
              <Form.Control
                type="date"
                value={searchData.tanggal}
                onChange={(e) =>
                  setSearchData({ ...searchData, tanggal: e.target.value })
                }
              />
            </Col>
            <Col md="auto">
              <Button type="submit" variant="primary">
                Cari
              </Button>
            </Col>
          </Row>
        </Form>
      </section>
    </Container>
  );
}
