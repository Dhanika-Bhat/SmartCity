import { useState } from 'react'

const ENDPOINT_DOCS = [
    {
        method: 'POST',
        path: '/api/sensors/data',
        description: 'Ingest real-time IoT sensor telemetry from ESP32/ESP8266 units. Broadcasts to authenticated dashboard clients.',
        requestBody: `{
  "nodeId":      "NODE-001",
  "zone":        "Lab Node",
  "distance":    42.5,     // dustbin depth
  "drainDistance": 18.2,   // drainage clearance
  "gasLevel":    850,      // MQ6 ADC raw
  "waterStatus": "NORMAL", // "NORMAL" | "OVERFLOW"
  "battery":     87.2
}`,
        response: `{ "success": true, "data": { ... } }`,
    },
    {
        method: 'POST',
        path: '/api/auth/login',
        description: 'Exchange officer/citizen credentials for a JWT session token.',
        requestBody: `{ "email": "officer@urbanpulse.gov", "password": "..." }`,
        response: `{ "token": "...", "user": { ... } }`,
    }
]

export default function ApiDocs() {
    const [copied, setCopied] = useState(null)

    const copy = (text, id) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(null), 2000)
    }

    return (
        <div>
            <div className="breadcrumb">
                <span>Resources</span>
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-current">Developer Documentation</span>
            </div>

            <div className="page-header">
                <div>
                    <h2 className="page-title">Digital Interface Guidelines</h2>
                    <p className="page-subtitle">Standardized protocols for Smart City IoT integration</p>
                </div>
            </div>

            <div className="card" style={{ marginBottom: 22 }}>
                <div className="card-header">
                    <h3 className="card-title">📡 Network Architecture</h3>
                </div>
                <div className="card-body">
                    <div style={{ display: 'flex', gap: 17, marginBottom: 20 }}>
                        <div style={{ flex: 1, padding: 16, background: '#f7f9fc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: 'var(--gov-blue)' }}>Endpoint Authority</div>
                            <div style={{ fontFamily: 'monospace', fontSize: 16 }}>http://172.16.45.35:5000</div>
                        </div>
                        <div style={{ flex: 1, padding: 16, background: '#f7f9fc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: 'var(--gov-blue)' }}>Security Layer</div>
                            <div style={{ color: 'var(--gov-green)', fontWeight: 600 }}>JWT Bearer / Mutual TLS Ready</div>
                        </div>
                    </div>

                    {ENDPOINT_DOCS.map((ep, i) => (
                        <div key={i} className="api-endpoint">
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                                <span className={`api-method ${ep.method.toLowerCase()}`}>{ep.method}</span>
                                <span className="api-path">{ep.path}</span>
                            </div>
                            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{ep.description}</p>
                            {ep.requestBody && <pre className="api-code-block">{ep.requestBody}</pre>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
