// src/pages/SearchPage.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Offcanvas,
  Placeholder,
} from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  // Ambil query dari URL
  const [formData, setFormData] = useState({
    asal: searchParams.get("asal") || "",
    tujuan: searchParams.get("tujuan") || "",
    tanggal: searchParams.get("tanggal") || "",
    kursi: searchParams.get("kursi") || 1,
  });

  // Simulasi fetch data
  useEffect(() => {
    setLoading(true);
    setResults([]);
    setTimeout(() => {
      const dummyData = [
        {
          id: 1,
          operator: "Shuttle Express",
          jam: "07:00",
          durasi: "3j 30m",
          jemput: "Jakarta - Terminal A",
          antar: "Bandung - Pasteur",
          harga: 120000,
          sisa: 5,
        },
        {
          id: 2,
          operator: "Travel Cepat",
          jam: "09:00",
          durasi: "3j",
          jemput: "Jakarta - Terminal B",
          antar: "Bandung - Cihampelas",
          harga: 150000,
          sisa: 2,
        },
      ];
      setResults(dummyData);
      setLoading(false);
    }, 1500);
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams(formData);
  };

  return (
    <Container fluid className="p-4">
      {/* Form Ubah Pencarian */}
      <section className="mb-4">
        <Form onSubmit={handleSubmit}>
          <Row className="g-2">
            <Col md>
              <Form.Control
                placeholder="Asal"
                value={formData.asal}
                onChange={(e) =>
                  setFormData({ ...formData, asal: e.target.value })
                }
              />
            </Col>
            <Col md>
              <Form.Control
                placeholder="Tujuan"
                value={formData.tujuan}
                onChange={(e) =>
                  setFormData({ ...formData, tujuan: e.target.value })
                }
              />
            </Col>
            <Col md>
              <Form.Control
                type="date"
                value={formData.tanggal}
                onChange={(e) =>
                  setFormData({ ...formData, tanggal: e.target.value })
                }
              />
            </Col>
            <Col md>
              <Form.Control
                type="number"
                min="1"
                value={formData.kursi}
                onChange={(e) =>
                  setFormData({ ...formData, kursi: e.target.value })
                }
              />
            </Col>
            <Col md="auto">
              <Button type="submit">Ubah Pencarian</Button>
            </Col>
          </Row>
        </Form>
      </section>

      <Row>
        {/* Sidebar Filter (desktop) */}
        <Col md={3} className="d-none d-md-block">
          <Card className="p-3">
            <h5>Filter & Sort</h5>
            <Form.Check type="checkbox" label="Paling Murah" />
            <Form.Check type="checkbox" label="Paling Cepat" />
            <Form.Check type="checkbox" label="Jam Pagi" />
          </Card>
        </Col>

        {/* Offcanvas Filter (mobile) */}
        <Button
          variant="outline-secondary"
          className="mb-3 d-md-none"
          onClick={() => setShowFilter(true)}
        >
          Filter & Sort
        </Button>
        <Offcanvas
          show={showFilter}
          onHide={() => setShowFilter(false)}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter & Sort</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form.Check type="checkbox" label="Paling Murah" />
            <Form.Check type="checkbox" label="Paling Cepat" />
            <Form.Check type="checkbox" label="Jam Pagi" />
          </Offcanvas.Body>
        </Offcanvas>

        {/* Hasil Pencarian */}
        <Col md={9}>
          {loading ? (
            // Skeleton Loading
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="mb-3 p-3">
                  <Placeholder as="h5" animation="wave">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder animation="wave">
                    <Placeholder xs={4} /> <Placeholder xs={3} />
                  </Placeholder>
                  <Placeholder.Button xs={2} />
                </Card>
              ))}
            </>
          ) : results.length === 0 ? (
            // Empty State
            <div className="text-center p-5">
              <h5>Tidak ada shuttle tersedia</h5>
              <p>Coba ubah pencarian Anda.</p>
            </div>
          ) : (
            results.map((item) => (
              <Card key={item.id} className="mb-3 p-3">
                <Row>
                  <Col md={8}>
                    <h5>{item.operator}</h5>
                    <p>
                      {item.jam} • {item.durasi}
                    </p>
                    <small>
                      Jemput: {item.jemput} <br />
                      Antar: {item.antar}
                    </small>
                  </Col>
                  <Col md={4} className="text-end">
                    <h5>Rp {item.harga.toLocaleString()}</h5>
                    <p>Sisa {item.sisa} kursi</p>
                    <Button>Pilih</Button>
                  </Col>
                </Row>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
}
