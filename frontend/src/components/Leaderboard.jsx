import { useState, useEffect } from 'react'

const FALLBACK_LEADERBOARD = [
    { _id: '1', name: 'Rajat Sharma', area: 'Sector 4A', ecoCredits: 1840, reportsCount: 23, avatar: '🧑' },
    { _id: '2', name: 'Priya Nair', area: 'Sector 7B', ecoCredits: 1620, reportsCount: 18, avatar: '👩' },
    { _id: '3', name: 'Rahul Verma', area: 'Sector 2C', ecoCredits: 1420, reportsCount: 15, avatar: '👨' },
    { _id: '4', name: 'Sneha Patel', area: 'Sector 9D', ecoCredits: 1195, reportsCount: 12, avatar: '👩‍💼' },
    { _id: '5', name: 'Kiran Reddy', area: 'Sector 3F', ecoCredits: 980, reportsCount: 9, avatar: '🧑‍💻' },
]

export default function Leaderboard() {
    const [users, setUsers] = useState(FALLBACK_LEADERBOARD)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/users/leaderboard')
            .then(r => r.json())
            .then(data => { if (data?.length) setUsers(data) })
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    const topCredit = users[0]?.ecoCredits || 1

    return (
        <div>
            <div className="breadcrumb">
                <span>Public Participation</span>
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-current">Eco Leaderboard</span>
            </div>

            <div className="page-header">
                <div>
                    <h2 className="page-title">Citizen Honor Roll</h2>
                    <p className="page-subtitle">Eco-Credits ranking — Recognizing contribution to a cleaner, smarter city</p>
                </div>
            </div>

            <div className="stats-grid">
                {users.slice(0, 3).map((u, i) => (
                    <div key={u._id} className="card stat-card" style={{ '--accent-color': i === 0 ? '#b45309' : i === 1 ? '#475569' : '#9a3412', textAlign: 'center' }}>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
                        <div style={{ fontSize: 24, marginBottom: 4 }}>{u.avatar}</div>
                        <div style={{ fontWeight: 700, color: 'var(--gov-blue)', fontSize: 14 }}>{u.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>{u.area}</div>
                        <div className="eco-credits" style={{ justifyContent: 'center' }}>🌿 {u.ecoCredits.toLocaleString()}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>ECO-CREDITS</div>
                    </div>
                ))}
            </div>

            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">🏅 Citizen Rankings</h3>
                </div>
                <div className="card-body">
                    {users.map((u, i) => (
                        <div key={u._id} className={`leaderboard-item ${i < 3 ? `rank-${i + 1}` : ''}`}>
                            <div className={`rank-badge ${i < 3 ? (i === 0 ? 'gold' : i === 1 ? 'silver' : 'bronze') : ''}`}>
                                {i + 1}
                            </div>
                            <div style={{ fontSize: 20 }}>{u.avatar}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--gov-blue)' }}>{u.name}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{u.area} · {u.reportsCount} actions verified</div>
                                <div style={{ marginTop: 8, height: 4, background: '#f0f4f8', borderRadius: 2 }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${(u.ecoCredits / topCredit) * 100}%`,
                                        background: i === 0 ? '#f59e0b' : i === 1 ? '#94a3b8' : i === 2 ? '#d97706' : 'var(--gov-blue)',
                                        borderRadius: 2
                                    }} />
                                </div>
                            </div>
                            <div className="eco-credits">
                                {u.ecoCredits.toLocaleString()} pts
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
