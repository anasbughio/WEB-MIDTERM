import React, { useState, useEffect } from 'react'

export default function SalesForm({ items, onSale }) {
  const [selected, setSelected] = useState('')
  const [qty, setQty] = useState(1)
  const [item, setItem] = useState(null)

  useEffect(() => {
    setItem(items.find(i => i._id === selected) || null)
  }, [selected, items])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selected || qty < 1) return
    onSale({ itemId: selected, quantity: Number(qty) })
    setSelected('')
    setQty(1)
  }

  const available = item ? item.quantity : 0

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
      <h3>🛒 Record Sale</h3>
      <div>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 13, color: 'var(--text-secondary)' }}>Select Item</label>
        <select value={selected} onChange={(e) => setSelected(e.target.value)} required>
          <option value="">📦 Choose a product...</option>
          {items.map(i => <option key={i._id} value={i._id}>{i.name} (Stock: {i.quantity})</option>)}
        </select>
      </div>
      {item && (
        <>
          <div style={{
            background: 'var(--primary-light)',
            padding: 12,
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500
          }}>
            💵 Unit Price: <span style={{ color: 'var(--primary)' }}>${Number(item.price).toFixed(2)}</span>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 13, color: 'var(--text-secondary)' }}>Quantity to Sell</label>
            <input 
              type="number" 
              value={qty} 
              onChange={(e) => setQty(parseInt(e.target.value) || 0)} 
              min="1" 
              max={available} 
              required 
            />
            <div style={{fontSize: 12, color: 'var(--text-secondary)', marginTop: 6}}>
              📦 Available: <strong>{available}</strong>
            </div>
          </div>
          {qty > 0 && (
            <div style={{
              background: 'var(--bg-secondary)',
              padding: 12,
              borderRadius: 8,
              fontWeight: 600,
              color: 'var(--primary)',
              textAlign: 'center'
            }}>
              💰 Total: ${(qty * item.price).toFixed(2)}
            </div>
          )}
        </>
      )}
      <button 
        type="submit" 
        disabled={!selected || qty > available}
        style={{ 
          opacity: (!selected || qty > available) ? 0.5 : 1,
          cursor: (!selected || qty > available) ? 'not-allowed' : 'pointer'
        }}
      >
        ✅ Complete Sale
      </button>
    </form>
  )
}
