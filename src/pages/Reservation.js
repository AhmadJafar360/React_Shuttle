// src/pages/ReservationPage.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Toast,
  Alert,
} from "react-bootstrap";

export default function ReservationPage() {
  // Ringkasan perjalanan (dummy)
  const trip = {
    asal: "Jakarta",
    tujuan: "Bandung",
    tanggal: "2025-09-30",
    jam: "07:00",
    operator: "Shuttle Express",
    harga: 120000,
  };

  // Countdown (10 menit)
  const [timeLeft, setTimeLeft] = useState(600);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  // Form Pemesan
  const [pemesan, setPemesan] = useState({ nama: "", email: "", wa: "" });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let e = {};
    if (!pemesan.nama) e.nama = "Nama wajib diisi";
    if (!/\S+@\S+\.\S+/.test(pemesan.email)) e.email = "Email tidak valid";
    if (!/^\d{10,15}$/.test(pemesan.wa)) e.wa = "Nomor WA tidak valid";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Seat Selection
  const totalSeats = 12;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState({});

  const toggleSeat = (num) => {
    if (selectedSeats.includes(num)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== num));
      const copy = { ...passengers };
      delete copy[num];
      setPassengers(copy);
    } else {
      setSelectedSeats([...selectedSeats, num]);
      setPassengers({ ...passengers, [num]: "" });
    }
  };

  // Kupon
  const [kupon, setKupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyKupon = () => {
    if (kupon === "DISKON10") {
      setDiscount(0.1);
      showToast("Kupon berhasil! Diskon 10%");
    } else {
      showError("Kupon tidak valid");
    }
  };

  // Alert/Toast
  const [toast, setToast] = useState({ show: false, msg: "", variant: "" });
  const showToast = (msg) =>
    setToast({ show: true, msg, variant: "success" });
  const showError = (msg) =>
    setToast({ show: true, msg, variant: "danger" });

  // Hitung total
  const subtotal = trip.harga * selectedSeats.length;
  const total = subtotal - subtotal * discount;

  // Submit
  const handleSubmit = () => {
    if (timeLeft <= 0) return showError("Waktu habis!");
    if (!validateForm()) return showError("Form pemesan tidak valid");
    if (selectedSeats.length === 0) return showError("Pilih kursi dulu!");
    // Simulasi seat conflict
    if (selectedSeats.includes(5)) return showError("Kursi 5 sudah terisi!");

    showToast("Reservasi berhasil, lanjut ke pembayaran...");
  };

  return (
    <Container className="p-4">
      {/* Ringkasan Perjalanan */}
      <Card className="p-3 mb-4">
        <Row>
          <Col>
            <h5>{trip.operator}</h5>
            <p>
              {trip.asal} → {trip.tujuan} ({trip.tanggal}, {trip.jam})
            </p>
          </Col>
          <Col className="text-end">
            <h6>Harga: Rp {trip.harga.toLocaleString()}</h6>
            <span className="text-danger">
              Waktu tersisa: {formatTime(timeLeft)}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Form Pemesan */}
      <Card className="p-3 mb-4">
        <h5>Data Pemesan</h5>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              value={pemesan.nama}
              onChange={(e) => setPemesan({ ...pemesan, nama: e.target.value })}
              isInvalid={!!errors.nama}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nama}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={pemesan.email}
              onChange={(e) =>
                setPemesan({ ...pemesan, email: e.target.value })
              }
              isInvalid={!!errors.email}
            />
            <Form.Text className="text-muted">
              E-ticket dikirim via email
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>No. WhatsApp</Form.Label>
            <Form.Control
              value={pemesan.wa}
              onChange={(e) => setPemesan({ ...pemesan, wa: e.target.value })}
              isInvalid={!!errors.wa}
            />
            <Form.Control.Feedback type="invalid">
              {errors.wa}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Card>

      {/* Seat Selection */}
      <Card className="p-3 mb-4">
        <h5>Pilih Kursi</h5>
        <Row xs={4} className="g-2">
          {Array.from({ length: totalSeats }, (_, i) => i + 1).map((num) => (
            <Col key={num}>
              <Button
                variant={
                  selectedSeats.includes(num) ? "success" : "outline-secondary"
                }
                className="w-100"
                onClick={() => toggleSeat(num)}
              >
                {num}
              </Button>
            </Col>
          ))}
        </Row>
        {selectedSeats.length > 0 && (
          <div className="mt-3">
            <h6>Data Penumpang</h6>
            {selectedSeats.map((s) => (
              <Form.Group key={s} className="mb-2">
                <Form.Label>Kursi {s}</Form.Label>
                <Form.Control
                  placeholder="Nama penumpang"
                  value={passengers[s]}
                  onChange={(e) =>
                    setPassengers({ ...passengers, [s]: e.target.value })
                  }
                />
              </Form.Group>
            ))}
          </div>
        )}
      </Card>

      {/* Kupon */}
      <Card className="p-3 mb-4">
        <h5>Kupon</h5>
        <Row className="g-2">
          <Col>
            <Form.Control
              value={kupon}
              onChange={(e) => setKupon(e.target.value)}
              placeholder="Masukkan kode kupon"
            />
          </Col>
          <Col md="auto">
            <Button onClick={applyKupon}>Terapkan</Button>
          </Col>
        </Row>
      </Card>

      {/* S&K */}
      <Card className="p-3 mb-4">
        <h5>Syarat & Ketentuan</h5>
        <p>
          Tiket tidak dapat dibatalkan setelah pembayaran.{" "}
          <a href="#">Lihat Selengkapnya</a>
        </p>
      </Card>

      {/* Ringkasan Harga & Submit */}
      <Card className="p-3 mb-4">
        <Row>
          <Col>
            <h6>Subtotal: Rp {subtotal.toLocaleString()}</h6>
            {discount > 0 && (
              <h6>Diskon: -{(discount * 100).toFixed(0)}%</h6>
            )}
            <h5>Total: Rp {total.toLocaleString()}</h5>
          </Col>
          <Col className="text-end">
            <Button onClick={handleSubmit}>Lanjut Pembayaran</Button>
          </Col>
        </Row>
      </Card>

      {/* Toast */}
      <Toast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        bg={toast.variant}
        delay={3000}
        autohide
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body className="text-white">{toast.msg}</Toast.Body>
      </Toast>
    </Container>
  );
}
