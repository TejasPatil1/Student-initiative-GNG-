"use client";
import React, { useState } from "react";
import AdminPanel from "../../components/ui/AdminPanel";

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function AdminPage() {
  const [input, setInput] = useState("");
  const [auth, setAuth] = useState(false);

  const login = () => {
    if (input === ADMIN_PASS) setAuth(true);
    else alert("Incorrect Password");
  };

  if (auth) return <AdminPanel />;

  return (
    <div style={{ padding:"20px" }}>
      <h1>Admin Login</h1>
      <input type="password" placeholder="Enter Admin Password" onChange={e => setInput(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
