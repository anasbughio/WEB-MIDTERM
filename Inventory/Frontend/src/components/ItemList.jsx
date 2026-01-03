import React from 'react'

export default function ItemList({ items, onEdit, onDelete }) {
  if (!items.length) return (
    <div style={{
      textAlign: 'center',
      padding: '40px 20px',
      color: 'var(--text-muted)',
      background: 'var(--card)',
      borderRadius: 12,
      border: '1px dashed var(--border)'
    }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
      <p style={{ margin: 0, fontSize: 16, fontWeight: 500 }}>No items yet</p>
      <p style={{ margin: '4px 0 0 0', fontSize: 13 }}>Create your first item to get started</p>
    </div>
  )
  
  return (
    <div className="grid">
      {items.map((it) => (
        <div key={it._id} className="card">
          <div className="card-header">
            <strong>{it.name}</strong>
            <div className="small">#{it._id.slice(-6)}</div>
          </div>
          <div className="card-body">
            <div>
              <strong>📦 Qty:</strong>
              <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{it.quantity}</span>
            </div>
            <div>
              <strong>💵 Price:</strong>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>${Number(it.price).toFixed(2)}</span>
            </div>
            <div>
              <strong>💰 Total:</strong>
              <span style={{ color: 'var(--primary)', fontWeight: 600 }}>${(Number(it.price) * Number(it.quantity)).toFixed(2)}</span>
            </div>
            {it.description && <div className="desc">📝 {it.description}</div>}
          </div>
          <div className="card-actions">
            <button onClick={() => onEdit(it)} style={{ flex: 1, justifyContent: 'center' }}>✏️ Edit</button>
            <button onClick={() => onDelete(it._id)} className="danger" style={{ flex: 1, justifyContent: 'center' }}>🗑️ Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
