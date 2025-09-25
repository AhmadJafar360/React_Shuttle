import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

export default function SearchPage() {
  return (
    <main>
      <Container className="container-custom py-4">
        {/* Form Pencarian */}
        <section aria-labelledby="search-form">
          <h1 id="search-form">Cari Shuttle</h1>
          <Form className="mb-4">
            <Row className="g-3">
              <Col lg={3} md={6} xs={12}>
                <Form.Group controlId="asal">
                  <Form.Label>Asal</Form.Label>
                  <Form.Control type="text" placeholder="Pilih kota asal" />
                </Form.Group>
              </Col>
              <Col lg={3} md={6} xs={12}>
                <Form.Group controlId="tujuan">
                  <Form.Label>Tujuan</Form.Label>
                  <Form.Control type="text" placeholder="Pilih kota tujuan" />
                </Form.Group>
              </Col>
              <Col lg={2} md={6} xs={12}>
                <Form.Group controlId="tanggal">
                  <Form.Label>Tanggal</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col lg={2} md={6} xs={12}>
                <Form.Group controlId="kursi">
                  <Form.Label>Kursi</Form.Label>
                  <Form.Control type="number" min="1" defaultValue="1" />
                </Form.Group>
              </Col>
              <Col lg={2} xs={12} className="d-flex align-items-end">
                <Button type="submit" className="w-100">
                  Ubah Pencarian
                </Button>
              </Col>
            </Row>
          </Form>
        </section>

        {/* Hasil Pencarian */}
        <section aria-labelledby="search-results">
          <h2 id="search-results">Hasil Pencarian</h2>
          <Row className="g-3">
            <Col lg={4} md={6} xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Shuttle Express</Card.Title>
                  <Card.Text>
                    Jakarta → Bandung <br />
                    Jam: 08:00 | Durasi: 3j 30m
                  </Card.Text>
                  <Button>Pilih</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
}