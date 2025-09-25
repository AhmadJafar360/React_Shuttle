// src/pages/PaymentPage.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Accordion,
  Button,
  Alert,
} from "react-bootstrap";

export default function PaymentPage() {
  const bill = {
    operator: "Shuttle Express",
    asal: "Jakarta",
    tujuan: "Bandung",
    kursi: [2, 3],
    total: 240000,
  };

  const [method, setMethod] = useState("transfer");
  const [showFull, setShowFull] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 menit
  const [status, setStatus] = useState("pending"); // pending | success | expired

  // Countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setStatus("expired");
      return;
    }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const accountNumber = "123456789012";

  const masked = showFull
    ? accountNumber
    : accountNumber.replace(/.(?=.{4})/g, "*");

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setShowFull(true);
    setTimeout(() => setShowFull(false), 3000);
  };

  // Simulasi pembayaran sukses
  useEffect(() => {
    if (status === "pending") {
      const timer = setTimeout(() => setStatus("success"), 10000); // auto success setelah 10 detik
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <Container fluid className="p-4">
      <Row>
        {/* Panel Pembayaran */}
        <Col md={8}>
          <h4>Metode Pembayaran</h4>
          <Accordion
            activeKey={method}
            onSelect={(key) => setMethod(key || "transfer")}
          >
            {/* Transfer */}
            <Accordion.Item eventKey="transfer">
              <Accordion.Header>Transfer Bank</Accordion.Header>
              <Accordion.Body>
                <p>Silakan transfer ke rekening berikut:</p>
                <h5>{masked}</h5>
                <Button size="sm" onClick={handleCopy}>
                  Salin Nomor
                </Button>
                <div className="mt-3">
                  <h6>Tutorial Pembayaran</h6>
                  <Accordion>
                    <Accordion.Item eventKey="bca">
                      <Accordion.Header>BCA</Accordion.Header>
                      <Accordion.Body>
                        Buka m-BCA, pilih Transfer, masukkan nomor rekening di
                        atas.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="mandiri">
                      <Accordion.Header>Mandiri</Accordion.Header>
                      <Accordion.Body>
                        Masuk ke Livin, pilih Transfer, isi nomor rekening di
                        atas.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            {/* QRIS */}
            <Accordion.Item eventKey="qris">
              <Accordion.Header>QRIS</Accordion.Header>
              <Accordion.Body>
                <p>Scan QR code berikut menggunakan aplikasi pembayaran Anda:</p>
                <img
                  src="https://dummyimage.com/200x200/000/fff.png&text=QRIS"
                  alt="QRIS Code"
                />
              </Accordion.Body>
            </Accordion.Item>

            {/* Virtual Account */}
            <Accordion.Item eventKey="va">
              <Accordion.Header>Virtual Account</Accordion.Header>
              <Accordion.Body>
                <p>Gunakan nomor VA berikut:</p>
                <h5>{masked}</h5>
                <Button size="sm" onClick={handleCopy}>
                  Salin Nomor
                </Button>
                <p className="mt-2 text-muted">
                  Dapat dibayar lewat ATM / mBanking sesuai bank yang tersedia.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Status */}
          <div className="mt-4">
            {status === "pending" && (
              <Alert variant="warning">
                Menunggu pembayaran... waktu tersisa{" "}
                <span aria-live="polite">{formatTime(timeLeft)}</span>
              </Alert>
            )}
            {status === "success" && (
              <Alert variant="success">
                ✅ Pembayaran berhasil! <br />
                <Button className="mt-2">Unduh E-Ticket</Button>
              </Alert>
            )}
            {status === "expired" && (
              <Alert variant="danger">❌ Waktu pembayaran habis.</Alert>
            )}
          </div>
        </Col>

        {/* Ringkasan Tagihan */}
        <Col md={4}>
          <Card className="p-3 sticky-top">
            <h5>Ringkasan Tagihan</h5>
            <p>
              {bill.asal} → {bill.tujuan}
            </p>
            <p>Kursi: {bill.kursi.join(", ")}</p>
            <h6>Total: Rp {bill.total.toLocaleString()}</h6>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
