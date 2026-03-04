import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/api";

export default function MainPage() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");
        const data = await getUsers();
        if (alive) setUsers(data);
      } catch (e) {
        if (alive) setErr(e?.message || "Failed to load users.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return users.filter((u) => {
      return (
        u.name.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        u.username.toLowerCase().includes(s)
      );
    });
  }, [q, users]);

  return (
    <div className="container">
      <div className="card stack">
        <div className="row space">
          <h2 style={{ margin: 0 }}>Users</h2>
          <span className="badge">{users.length} total</span>
        </div>

        <input
          className="input"
          placeholder="Search by name, username, or email..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        {loading ? <div style={{ color: "var(--muted)" }}>Loading...</div> : null}
        {err ? <div className="error">{err}</div> : null}

        {!loading && !err ? (
          <ul className="list" aria-label="user-list">
            {filtered.map((u) => (
              <li
                key={u.id}
                className="item"
                onClick={() => nav(`/detail/${u.id}`)}
                role="button"
                tabIndex={0}
              >
                <div className="row space">
                  <div style={{ fontWeight: 700 }}>{u.name}</div>
                  <span className="badge">@{u.username}</span>
                </div>
                <div style={{ color: "var(--muted)", marginTop: 6 }}>{u.email}</div>
              </li>
            ))}
            {filtered.length === 0 ? (
              <div style={{ color: "var(--muted)" }}>No results.</div>
            ) : null}
          </ul>
        ) : null}
      </div>
    </div>
  );
}