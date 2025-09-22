import React, { useEffect, useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbyDIvkwAdyZaYkrCZzTrRkwRhlRrjwFpwPmlp5-2EDtQuIZMS7IhYlgQC4O5imWazqU/exec";

export default function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [editForm, setEditForm] = useState(null);

  // 🔄 ambil data pembayaran
  const fetchPayments = async () => {
    try {
      const res = await fetch(`${API_URL}?action=getPayments`);
      const data = await res.json();
      if (data.status === "success") setPayments(data.data);
    } catch (err) {
      console.error("Fetch payments error:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // 📝 edit pembayaran
  const handleEdit = (payment) => {
    setEditForm(payment);
  };

  // 💾 update pembayaran
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updatePayment", ...editForm }),
      });
      const data = await res.json();
      alert(data.message);
      setEditForm(null);
      fetchPayments();
    } catch (err) {
      console.error("Update payment error:", err);
    }
  };

  // ❌ hapus pembayaran
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin hapus pembayaran ini?")) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deletePayment", id_pembayaran: id }),
      });
      const data = await res.json();
      alert(data.message);
      fetchPayments();
    } catch (err) {
      console.error("Delete payment error:", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-semibold text-lg">Daftar Pembayaran</h2>

      {/* Form edit */}
      {editForm && (
        <form
          onSubmit={handleUpdate}
          className="border p-3 rounded space-y-2 bg-gray-50"
        >
          <h3 className="font-medium">Edit Pembayaran</h3>
          <input
            type="text"
            value={editForm.nis}
            onChange={(e) => setEditForm({ ...editForm, nis: e.target.value })}
            className="w-full border p-2 rounded"
            placeholder="NIS"
          />
          <input
            type="text"
            value={editForm.id_siswa}
            onChange={(e) =>
              setEditForm({ ...editForm, id_siswa: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="ID Siswa"
          />
          <input
            type="text"
            value={editForm.bulan}
            onChange={(e) =>
              setEditForm({ ...editForm, bulan: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="Bulan"
          />
          <input
            type="text"
            value={editForm.tahun}
            onChange={(e) =>
              setEditForm({ ...editForm, tahun: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="Tahun"
          />
          <input
            type="number"
            value={editForm.jumlah}
            onChange={(e) =>
              setEditForm({ ...editForm, jumlah: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="Jumlah"
          />
          <input
            type="date"
            value={editForm.tanggal_bayar}
            onChange={(e) =>
              setEditForm({ ...editForm, tanggal_bayar: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="Tanggal Bayar"
          />
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Simpan
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => setEditForm(null)}
            >
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Tabel pembayaran */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID Pembayaran</th>
            <th className="border p-2">NIS</th>
            <th className="border p-2">ID Siswa</th>
            <th className="border p-2">Bulan</th>
            <th className="border p-2">Tahun</th>
            <th className="border p-2">Jumlah</th>
            <th className="border p-2">Tanggal Bayar</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id_pembayaran}>
              <td className="border p-2">{p.id_pembayaran}</td>
              <td className="border p-2">{p.nis}</td>
              <td className="border p-2">{p.id_siswa}</td>
              <td className="border p-2">{p.bulan}</td>
              <td className="border p-2">{p.tahun}</td>
              <td className="border p-2">{p.jumlah}</td>
              <td className="border p-2">{p.tanggal_bayar}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id_pembayaran)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {payments.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center p-3 text-gray-500">
                Belum ada data pembayaran
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
