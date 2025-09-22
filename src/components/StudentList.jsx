import React, { useEffect, useState } from "react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbx8uiM0F-WhrOy1Lu6rIt9vF9QkQvfAj-JXLS55zq5iL5VyvVOv9QVRMjiiuGkabTxz/exec";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [editForm, setEditForm] = useState(null);

  // 🔄 ambil data siswa
  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}?action=getStudents`);
      const data = await res.json();
      if (data.status === "success") setStudents(data.data);
    } catch (err) {
      console.error("Fetch students error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 📝 edit siswa
  const handleEdit = (student) => {
    setEditForm(student);
  };

  // 💾 simpan update siswa
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateStudent", ...editForm }),
      });
      const data = await res.json();
      alert(data.message);
      setEditForm(null);
      fetchStudents();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // ❌ hapus siswa
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin hapus siswa ini?")) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "deleteStudent", id_siswa: id }),
      });
      const data = await res.json();
      alert(data.message);
      fetchStudents();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="font-semibold text-lg">Daftar Siswa</h2>

      {/* Form edit */}
      {editForm && (
        <form
          onSubmit={handleUpdate}
          className="border p-3 rounded space-y-2 bg-gray-50"
        >
          <h3 className="font-medium">Edit Siswa</h3>
          <input
            type="text"
            value={editForm.nis}
            onChange={(e) =>
              setEditForm({ ...editForm, nis: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="NIS"
          />
          <input
            type="text"
            value={editForm.nama}
            onChange={(e) =>
              setEditForm({ ...editForm, nama: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="Nama"
          />
          <input
            type="text"
            value={editForm.kelas}
            onChange={(e) =>
              setEditForm({ ...editForm, kelas: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="Kelas"
          />
          <input
            type="text"
            value={editForm.alamat}
            onChange={(e) =>
              setEditForm({ ...editForm, alamat: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="Alamat"
          />
          <input
            type="text"
            value={editForm.telepon}
            onChange={(e) =>
              setEditForm({ ...editForm, telepon: e.target.value })
            }
            className="w-full border p-2 rounded"
            placeholder="Telepon"
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

      {/* Tabel siswa */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">NIS</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Kelas</th>
            <th className="border p-2">Alamat</th>
            <th className="border p-2">Telepon</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id_siswa}>
              <td className="border p-2">{s.id_siswa}</td>
              <td className="border p-2">{s.nis}</td>
              <td className="border p-2">{s.nama}</td>
              <td className="border p-2">{s.kelas}</td>
              <td className="border p-2">{s.alamat}</td>
              <td className="border p-2">{s.telepon}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(s)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s.id_siswa)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-3 text-gray-500">
                Belum ada data siswa
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
