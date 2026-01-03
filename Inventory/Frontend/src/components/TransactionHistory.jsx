import React from 'react'

export default function TransactionHistory({ transactions }) {
  if (!transactions.length) return (
    <div style={{
      textAlign: 'center',
      padding: '40px 20px',
      color: 'var(--text-muted)',
      background: 'var(--card)',
      borderRadius: 12,
      border: '1px dashed var(--border)'
    }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
      <p style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>No sales yet</p>
      <p style={{ margin: '4px 0 0 0', fontSize: 13 }}>Your sales history will appear here</p>
    </div>
  )
  
  const totalRevenue = transactions.reduce((s, t) => s + t.total, 0)
  
  return (
    <div>
      <div style={{
        marginBottom: 16,
        padding: 16,
        background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
        borderRadius: 10,
        border: '1px solid #6ee7b7'
      }}>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4 }}>Total Revenue</div>
        <strong style={{ fontSize: 24, color: '#059669' }}>💵 ${totalRevenue.toFixed(2)}</strong>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6 }}>
          📦 {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="txn-list">
        {transactions.map((t, idx) => (
          <div key={t._id} className="txn-item">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 8
            }}>
              <strong style={{ fontSize: 15 }}>
                #{transactions.length - idx} - {t.itemName}
              </strong>
              <div style={{
                fontSize: 12,
                color: 'var(--text-muted)',
                background: 'var(--bg-secondary)',
                padding: '4px 8px',
                borderRadius: 4
              }}>
                {new Date(t.createdAt).toLocaleString()}
              </div>
            </div>
            <div style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              marginTop: 6,
              paddingTop: 8,
              borderTop: '1px solid var(--border)'
            }}>
              📦 {t.quantity} units × 💵 ${Number(t.pricePerUnit).toFixed(2)} = 
              <strong style={{ color: 'var(--success)', marginLeft: 6 }}>
                ${Number(t.total).toFixed(2)}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
