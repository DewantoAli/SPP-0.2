import React, { useState } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycbxdwvTX-HagzdmUHYuDGBZVEQEK99nmvt-9TzpF-aFI0Hqg6eyCkaOw62kQVne6di0/exec";

export default function PaymentForm() {
  const [form, setForm] = useState({ nis: "", nama: "", periode: "", jumlah: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "savePayment", ...form }),
    });
    const data = await res.json();
    alert(data.message);
    setForm({ nis: "", nama: "", periode: "", jumlah: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-2"
    >
      <h2 className="font-semibold">Input Pembayaran</h2>
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
        name="jumlah"
        type="number"
        placeholder="Jumlah"
        value={form.jumlah}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  );
}
