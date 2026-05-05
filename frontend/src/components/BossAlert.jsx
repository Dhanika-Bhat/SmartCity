export default function BossAlert({ alert, onClose }) {
    const isGas = alert.alertType === 'GAS_CRITICAL'
    const isWater = alert.alertType === 'WATER_OVERFLOW'

    return (
        <>
            <div className="boss-alert-overlay" onClick={onClose} />
            <div className="boss-alert">
                <div style={{ fontSize: 44, marginBottom: 16 }}>
                    {isGas ? '☣️' : isWater ? '🌊' : '🚨'}
                </div>
                <div className="boss-alert-title">
                    {isGas ? 'HAZARDOUS ATMOSPHERE' : isWater ? 'DRAINAGE OVERFLOW' : 'INFRASTRUCTURE ALERT'}
                </div>
                <div className="boss-alert-body">
                    Emergency telemetry received from <strong>{alert.zone}</strong> ({alert.nodeId}).
                    Infrastructure status requires immediate municipal attention.
                    <br /><br />
                    <span style={{ color: 'var(--gov-red)', fontWeight: 700 }}>{alert.message}</span>
                </div>
                <div style={{ display: 'flex', gap: 13, justifyContent: 'center' }}>
                    <button className="btn btn-primary" onClick={onClose}>
                        ✓ ACKNOWLEDGE
                    </button>
                    <button className="btn btn-danger" onClick={onClose}>
                        DISPATCH CREW
                    </button>
                </div>
            </div>
        </>
    )
}
