import React, { useState } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycbxdwvTX-HagzdmUHYuDGBZVEQEK99nmvt-9TzpF-aFI0Hqg6eyCkaOw62kQVne6di0/exec";

export default function StudentForm() {
  const [form, setForm] = useState({ nis: "", nama: "", kelas: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "saveStudent", ...form }),
    });
    const data = await res.json();
    alert(data.message);
    setForm({ nis: "", nama: "", kelas: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-2"
    >
      <h2 className="font-semibold">Tambah Siswa</h2>
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
        name="kelas"
        placeholder="Kelas"
        value={form.kelas}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  );
}
