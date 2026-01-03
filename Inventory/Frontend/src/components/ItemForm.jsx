import React, { useEffect, useState } from 'react'

export default function ItemForm({ onCreate, editing, onUpdate, onCancel }) {
  const [form, setForm] = useState({ name: '', quantity: 0, price: 0, description: '' })

  useEffect(() => {
    if (editing) setForm({ name: editing.name, quantity: editing.quantity, price: editing.price, description: editing.description || '' })
    else setForm({ name: '', quantity: 0, price: 0, description: '' })
  }, [editing])

  const submit = (e) => {
    e.preventDefault()
    if (editing) onUpdate(editing._id, form)
    else onCreate(form)
  }

  return (
    <form onSubmit={submit}>
      <h3>{editing ? '✏️ Edit Item' : '➕ Add New Item'}</h3>
      <div style={{ display: 'grid', gap: 12 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 13, color: 'var(--text-secondary)' }}>Product Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g., Laptop" required />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 13, color: 'var(--text-secondary)' }}>Quantity</label>
            <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} min="0" placeholder="0" required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 13, color: 'var(--text-secondary)' }}>Price ($)</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} min="0" step="0.01" placeholder="0.00" required />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 13, color: 'var(--text-secondary)' }}>Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional details..." style={{ minHeight: 80, resize: 'vertical' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
          <button type="submit" style={{ flex: 1 }}>{editing ? '💾 Update' : '➕ Create'}</button>
          {editing && <button type="button" onClick={onCancel} className="secondary">Cancel</button>}
        </div>
      </div>
    </form>
  )
}
