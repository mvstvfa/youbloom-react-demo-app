import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../services/api";

export default function DetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");
        const data = await getUser(id);
        if (alive) setUser(data);
      } catch (e) {
        if (alive) setErr(e?.message || "Failed to load user.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [id]);

  return (
    <div className="container">
      <div className="card stack">
        <div className="row space">
          <h2 style={{ margin: 0 }}>User Detail</h2>
          <Link className="btn ghost" to="/">
            Back
          </Link>
        </div>

        {loading ? <div style={{ color: "var(--muted)" }}>Loading...</div> : null}
        {err ? <div className="error">{err}</div> : null}

        {!loading && !err && user ? (
          <div className="stack" style={{ gap: 10 }}>
            <div>
              <div style={{ color: "var(--muted)", fontSize: 12 }}>Name</div>
              <div style={{ fontWeight: 800, fontSize: 20 }}>{user.name}</div>
            </div>

            <div className="row" style={{ flexWrap: "wrap" }}>
              <span className="badge">@{user.username}</span>
              <span className="badge">{user.email}</span>
              <span className="badge">{user.phone}</span>
              <span className="badge">{user.website}</span>
            </div>

            <div className="card" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 8 }}>
                Company
              </div>
              <div style={{ fontWeight: 700 }}>{user.company?.name}</div>
              <div style={{ color: "var(--muted)", marginTop: 4 }}>
                {user.company?.catchPhrase}
              </div>
            </div>

            <div className="card" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 8 }}>
                Address
              </div>
              <div>
                {user.address?.street}, {user.address?.suite}
              </div>
              <div style={{ color: "var(--muted)", marginTop: 4 }}>
                {user.address?.city} {user.address?.zipcode}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}