import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function App() {
  const [alert, setAlert] = useState("");
  const [result, setResult] = useState(null);
  const [feed, setFeed] = useState([]);
  const [stream, setStream] = useState([{ t: 1, v: 40 }]);

  const confidence = Math.floor(Math.random() * 30) + 70;

  const systemHealth = {
    cpu: Math.floor(Math.random() * 40) + 50,
    memory: Math.floor(Math.random() * 50) + 40,
    network: Math.floor(Math.random() * 30) + 60,
  };

  const geo = [
    { region: "US-East", val: 40 },
    { region: "Russia", val: 25 },
    { region: "China", val: 20 },
    { region: "EU-West", val: 15 },
  ];

  const quickActions = ["Block IP", "Isolate Host", "Escalate Incident"];

  useEffect(() => {
    const i = setInterval(() => {
      setStream((p) => [
        ...p.slice(-30),
        { t: p.length + 1, v: Math.random() * 100 },
      ]);

      const attacks = [
        "DDoS spike detected (EU-West)",
        "Botnet C2 beaconing active",
        "Credential stuffing attempt blocked",
        "Suspicious DNS tunneling detected",
        "Malware outbound traffic flagged",
      ];

      setFeed((f) => [
        {
          id: Date.now(),
          msg: attacks[Math.floor(Math.random() * attacks.length)],
        },
        ...f.slice(0, 8),
      ]);
    }, 1200);

    return () => clearInterval(i);
  }, []);

  const runInvestigation = () => {
    setResult({
      severity: "CRITICAL",
      summary:
        "Multi-stage intrusion detected involving phishing, credential abuse, lateral movement and C2 communication across internal network.",
      mitre: [
        { name: "Initial Access", value: 50 },
        { name: "Execution", value: 35 },
        { name: "Credential Access", value: 60 },
        { name: "Lateral Movement", value: 40 },
        { name: "Exfiltration", value: 30 },
      ],
      iocs: ["185.220.101.15", "dark-node.io", "payload.exe"],
      steps: [
        "Authentication anomaly detected",
        "Threat intel correlation completed",
        "Malicious execution confirmed",
        "Lateral movement mapped",
      ],
      remediation: [
        "Block IP ranges immediately",
        "Reset all credentials",
        "Enable MFA enforcement",
        "Isolate affected subnet",
      ],
      escalation: "YES → SOC Tier 2 + IR Team",
    });
  };

  const COLORS = ["#ff4d6d", "#4dabf7", "#51cf66", "#a855f7", "#facc15"];

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.logo}>AegisAI</div>
        <div style={styles.sub}>
          Transforming Security Alerts into Actionable Intelligence
        </div>
      </div>

      <div style={styles.grid}>
        {/* LEFT PANEL */}
        <div style={styles.panel}>
          <textarea
            style={styles.textarea}
            placeholder="Paste logs / incidents..."
            value={alert}
            onChange={(e) => setAlert(e.target.value)}
          />

          <button style={styles.button} onClick={runInvestigation}>
            RUN INVESTIGATION
          </button>

          {/* CONFIDENCE */}
          <div style={styles.card}>
            <h4>AI Confidence Meter</h4>
            <div style={styles.barBg}>
              <div
                style={{ ...styles.barFill, width: confidence + "%" }}
              />
            </div>
            <p>{confidence}% confidence</p>
          </div>

          {/* GEO */}
          <div style={styles.card}>
            <h4>Geo Attack Origin</h4>
            {geo.map((g, i) => (
              <div key={i}>
                {g.region} — {g.val}%
              </div>
            ))}
          </div>

          {/* SYSTEM HEALTH */}
          <div style={styles.card}>
            <h4>System Health</h4>

            <p>CPU</p>
            <div style={styles.barBg}>
              <div style={{ ...styles.barRed, width: systemHealth.cpu + "%" }} />
            </div>

            <p>Memory</p>
            <div style={styles.barBg}>
              <div
                style={{ ...styles.barBlue, width: systemHealth.memory + "%" }}
              />
            </div>

            <p>Network</p>
            <div style={styles.barBg}>
              <div
                style={{
                  ...styles.barGreen,
                  width: systemHealth.network + "%",
                }}
              />
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div style={styles.card}>
            <h4>Quick Actions</h4>
            {quickActions.map((a, i) => (
              <button key={i} style={styles.actionBtn}>
                {a}
              </button>
            ))}
          </div>

          {/* STREAM */}
          <div style={styles.card}>
            <h4>Live Threat Stream</h4>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={stream}>
                <XAxis dataKey="t" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="#4dabf7"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CENTER PANEL */}
        <div style={styles.panel}>
          {result ? (
            <>
              <div style={styles.severity}>⚠ CRITICAL ACTIVE INCIDENT</div>

              <div style={styles.card}>
                <h4>MITRE ATT&CK Mapping</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={result.mitre}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#a855f7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={styles.card}>
                <h4>Attack Distribution</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={result.mitre} dataKey="value" outerRadius={70}>
                      {result.mitre.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <p style={{ color: "#888" }}>Run investigation to view analysis</p>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div style={styles.panel}>
          <h4>Live Intelligence Feed</h4>

          <div style={styles.feedBox}>
            {feed.map((f) => (
              <div key={f.id}>🔴 {f.msg}</div>
            ))}
          </div>

          {result && (
            <div style={styles.card}>
              <h4>AI Investigation Report</h4>

              <p style={styles.italic}>{result.summary}</p>

              <b>IOCs</b>
              <p>{result.iocs.join(" | ")}</p>

              <b>Steps</b>
              <ul>
                {result.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <b>Remediation</b>
              <ul>
                {result.remediation.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <b>Escalation</b>
              <p>{result.escalation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050816",
    color: "#e5e7eb",
    padding: 18,
    fontFamily: "Inter",
  },

  header: {
    marginBottom: 15,
  },

  logo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#4dabf7",
    textShadow:
      "0 0 10px #1d4ed8, 0 0 20px #4dabf7, 0 0 30px #a855f7",
  },

  sub: {
    fontSize: 12,
    color: "#94a3b8",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 12,
  },

  panel: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: 12,
  },

  textarea: {
    width: "100%",
    height: 90,
    background: "#020617",
    border: "1px solid #4dabf7",
    color: "white",
    padding: 10,
  },

  button: {
    marginTop: 10,
    width: "100%",
    padding: 10,
    background: "linear-gradient(90deg,#4dabf7,#a855f7,#ff4d6d)",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },

  card: {
    marginTop: 10,
    padding: 10,
    background: "rgba(0,0,0,0.4)",
    borderRadius: 10,
  },

  severity: {
    padding: 10,
    background: "#ff4d6d",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 10,
  },

  feedBox: {
    maxHeight: 160,
    overflowY: "auto",
    border: "1px dashed #4dabf7",
    padding: 5,
  },

  italic: {
    fontStyle: "italic",
    color: "#cbd5e1",
  },

  barBg: {
    width: "100%",
    height: 8,
    background: "#1f2937",
    borderRadius: 5,
  },

  barFill: { height: "100%", background: "#a855f7", borderRadius: 5 },
  barRed: { height: "100%", background: "#ff4d6d", borderRadius: 5 },
  barBlue: { height: "100%", background: "#4dabf7", borderRadius: 5 },
  barGreen: { height: "100%", background: "#51cf66", borderRadius: 5 },

  actionBtn: {
    width: "100%",
    marginTop: 5,
    padding: 8,
    background: "#111827",
    border: "1px solid #4dabf7",
    color: "white",
    cursor: "pointer",
  },
};
