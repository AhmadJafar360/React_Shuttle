# Shuttle (Frontend SPA)

**Ringkasan**
Proyek ini adalah implementasi frontend (single-page application) untuk alur: **Beranda → Pencarian → Reservasi → Pembayaran**. Fokus: *desktop‑first*, responsif ke tablet & mobile, aksesibilitas, dan tanpa backend.

---

---
## Cara menjalankan (development)

1. Clone repo

```bash
git clone <repo-url>
cd bhisa-shuttle-frontend
```

2. Install dependencies

```bash
npm install
```

3. Jalankan dev server

```bash
npm start
```

4. (Opsional) Jika `/data/shuttles.json` dipanggil sebagai file statis, pastikan development server menyajikan folder `public/data/shuttles.json`.

Build produksi

```bash
npm run build
npx serve -s build
```

---
## Routing

* `/` — **HomePage**
* `/search` — **SearchPage** (query params: `origin`, `destination`, `date`, `seats`, `sort`)
* `/booking` — **BookingPage** (state passed or url query/ticket id)
* `/payment` — **PaymentPage** (order id in state or query)

Gunakan React Router dan simpan parameter pencarian di URL query untuk shareable links.

---

## Komponen Utama & Behavior

### Global

* **Navbar**: akses navbar utama, memiliki link ke Home, Pencarian; pada desktop menampilkan quick search (shortcut). Responsive: collapse menjadi hamburger.
* **Footer**: informasi & link bantuan.
* **Toast**: untuk error/success (aria-live polite/assertive sesuai konteks).
* **Modal/Drawer**: untuk detail syarat & ketentuan atau filter di mobile.
* **Skeleton**: card skeleton saat loading.

### Form

* **TextField**: label terasosiasi, helper text & error message inline.
* **Select**: accessible select; keyboard friendly.
* **DatePicker**: disable dates sebelum hari ini.
* **PhoneInput**: helper untuk +62 prefiks, validasi basic.

### Pencarian

* **SearchBar**: asal, tujuan, tanggal, jumlah kursi; tombol `Cari Shuttle`.
* **FilterSidebar / Drawer**: filter operator, time range, price range, sisa kursi.
* **CardShuttle**: operator, jam keberangkatan (per jam), durasi (opsional), titik jemput/antar, harga (format IDR), sisa kursi, tombol `Pilih` per jam.
* **PriceTag**: format `Rp120.000` (gunakan Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }))

### Reservasi

* **SeatMap**: grid seat, disabled seats, multi-selection (max sesuai jumlah penumpang). Keyboard support.
* **PassengerForm**: untuk tiap kursi (nama, email, WhatsApp). Validasi realtime.
* **CouponField**: apply coupon (mock validation). Mengubah total bila valid.
* **TermsPreview**: ringkasan S&K + link `Lihat Selengkapnya` (modal).
* Guard: tombol lanjut nonaktif jika form invalid/seat belum dipilih.
* Error handling: seat conflict, kupon invalid, timeout → tampilkan toast & detail.

### Pembayaran

* **OrderSummary**: ringkasan biaya; pada desktop `sticky` di kanan; mobile di atas atau collapsible.
* **PaymentMethodTabs**: Transfer Bank | QRIS | Virtual Account
* **CopyField**: nomor rekening/VA dengan tombol `Salin` (clipboard API) + masking saat tidak fokus.
* **Countdown**: aksesibel (use `aria-live` untuk update setiap menit/detik) dan `role="timer"`.
* **AccordionTutorial**: instruksi per bank (tampilkan hanya untuk metode aktif).
---