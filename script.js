// --- FUNGSI ORDER LANGSUNG KE WHATSAPP BESERTA TAGIHAN ---
function handleOrder(event) {
    event.preventDefault();

    const form = document.getElementById('orderForm');
    const successAlert = document.getElementById('successMessage');

    // Mengambil data value dari Form input
    const nama = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const produk = document.getElementById('product').value;
    const jumlah = parseInt(document.getElementById('quantity').value) || 1;

    // Pemetaan Harga Produk Berdasarkan Katalog
    const hargaProdukMap = {
        "Penyiram Tanaman Otomatis": 175000,
        "Sistem Penyiraman & Monitoring Tanaman OLED": 200000
    };

    // Mengambil harga berdasarkan produk yang dipilih (default ke 175.000 jika tidak cocok)
    const hargaPerPaket = hargaProdukMap[produk] || 175000;
    const totalTagihan = hargaPerPaket * jumlah;

    // Fungsi helper mengubah angka ke format rupiah mata uang IDR
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    // Nomor WhatsApp Tujuan
    const nomorWA = "6289613904967";

    // Penyusunan teks pesan cetak Invoice tagihan rapi
    const teksPesan = `Halo Agrisha, saya ingin memesan produk berikut:

📝 *INVOICE PEMESANAN PINTAR*

Nama Lengkap : ${nama}
Email Pengguna : ${email}

🌱 *DETAIL ITEM PRODUK*

Jenis Produk : ${produk}
Kuantitas Pesan : ${jumlah} Paket
Harga Satuan : ${formatRupiah(hargaPerPaket)}

💰 *TOTAL TAGIHAN*
*${formatRupiah(totalTagihan)}*

Mohon infokan detail nomor rekening untuk penyelesaian transaksi pembayaran. Terima kasih!`;

    // Pengkodean string URL teks agar aman dikirim via Web browser API
    const urlWA = `https://api.whatsapp.com/send?phone=${nomorWA}&text=${encodeURIComponent(teksPesan)}`;

    // Menyembunyikan form awal dan memunculkan pesan alert sukses sementara
    form.style.display = 'none';
    successAlert.style.display = 'block';

    // Otomatis mengalihkan / membuka link WA di Tab Baru setelah delay 1.5 detik
    setTimeout(() => {
        window.open(urlWA, '_blank');

        // Reset form input setelah pengguna dialihkan
        setTimeout(() => {
            form.reset();
        }, 500);
    }, 1500);
}
