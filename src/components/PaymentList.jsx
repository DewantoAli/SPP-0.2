import React, { useEffect, useState } from "react";

const API_URL = "https://script.google.com/macros/s/AKfycbxdwvTX-HagzdmUHYuDGBZVEQEK99nmvt-9TzpF-aFI0Hqg6eyCkaOw62kQVne6di0/exec";

export default function PaymentList() {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    const res = await fetch(API_URL + "?action=getPayments");
    const data = await res.json();
    if (data.status === "success") setPayments(data.payments || []);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Daftar Pembayaran</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">NIS</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Periode</th>
            <th className="border p-2">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={i}>
              <td className="border p-2">{p.nis}</td>
              <td className="border p-2">{p.nama}</td>
              <td className="border p-2">{p.periode}</td>
              <td className="border p-2">{p.jumlah}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
