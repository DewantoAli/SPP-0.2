import React, { useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbx8uiM0F-WhrOy1Lu6rIt9vF9QkQvfAj-JXLS55zq5iL5VyvVOv9QVRMjiiuGkabTxz/exec";

export default function StudentForm() {
  const [form, setForm] = useState({
    nis: "",
    nama: "",
    kelas: "",
    alamat: "",
    telepon: "",
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
          action: "saveStudent",
          nis: form.nis,
          nama: form.nama,
          kelas: form.kelas,
          alamat: form.alamat,
          telepon: form.telepon,
        }),
      });

      const data = await res.json();
      alert(data.message || "Gagal simpan siswa");
      if (data.status === "success") {
        setForm({ nis: "", nama: "", kelas: "", alamat: "", telepon: "" });
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
      <h2 className="font-semibold">Tambah Siswa</h2>
      <input
        name="nis"
        placeholder="NIS"
        value={form.nis}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="nama"
        placeholder="Nama"
        value={form.nama}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="kelas"
        placeholder="Kelas"
        value={form.kelas}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="alamat"
        placeholder="Alamat"
        value={form.alamat}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        name="telepon"
        placeholder="Telepon"
        value={form.telepon}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  );
}
