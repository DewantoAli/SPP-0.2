import React, { useEffect, useState } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycbxgCVsrefiW0Dor_bwMSzCdQ8510ZzS2EVCw5F3PDF8EPjiek5OfFN7tfqsEhiz8hh9/exec";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await fetch(API_URL + "?action=getStudents");
    const data = await res.json();
    if (data.status === "success") setStudents(data.students || []);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Daftar Siswa</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">NIS</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Kelas</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td className="border p-2">{s.nis}</td>
              <td className="border p-2">{s.nama}</td>
              <td className="border p-2">{s.kelas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
