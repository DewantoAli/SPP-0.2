import React from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import PaymentForm from "./components/PaymentForm";
import PaymentList from "./components/PaymentList";

export default function App() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">📊 Dashboard SPP</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <StudentForm />
        <PaymentForm />
      </div>

      <StudentList />
      <PaymentList />
    </div>
  );
}
