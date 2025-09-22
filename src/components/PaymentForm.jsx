import React, { useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxjC_ptZXW5PUeMZ8mbvPkQobEQzDrLEr4UgkW77UpmjTzBgs9qhPpR_It4BLUfdLmZ/exec";

export default function PaymentForm() {
  const [form, setForm] = useState({
    id_siswa: "",
    nis: "",
    nama: "",
    periode: "",
    jumlah: "",
    metode: "",
    keterangan: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "savePayment",
          id_siswa: form.id_siswa,
          nis: form.nis,
          nama: form.nama,
          periode: form.periode,
          jumlah: form.jumlah,
          metode: form.metode,
          keterangan: form.keterangan,
        }),
      });

      const data = await res.json();
      alert(data.message || "Gagal simpan pembayaran");
      if (data.status === "success") {
        setForm({
          id_siswa: "",
          nis: "",
          nama: "",
          periode: "",
          jumlah: "",
          metode: "",
          keterangan: "",
        });
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-2"
    >
      <h2 className="font-semibold">Tambah Pembayaran</h2>
      <input
        name="id_siswa"
        placeholder="ID Siswa"
        value={form.id_siswa}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="nis"
        placeholder="NIS"
        value={form.nis}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="nama"
        placeholder="Nama"
        value={form.nama}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="periode"
        placeholder="Periode (misal: 2025-09)"
        value={form.periode}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        name="jumlah"
        placeholder="Jumlah"
        value={form.jumlah}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="metode"
        placeholder="Metode (Cash/Transfer)"
        value={form.metode}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="keterangan"
        placeholder="Keterangan"
        value={form.keterangan}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  );
}
