import React, { useEffect, useState } from 'react'
import { fetchItems, createItem, updateItem, deleteItem, fetchTransactions, createTransaction } from './api'
import ItemList from './components/ItemList'
import ItemForm from './components/ItemForm'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Toast from './components/Toast'
import SalesForm from './components/SalesForm'
import TransactionHistory from './components/TransactionHistory'

export default function App() {
  const [items, setItems] = useState([])
  const [transactions, setTransactions] = useState([])
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState(null)
  const [activeTab, setActiveTab] = useState('inventory')

  const loadItems = async () => {
    const data = await fetchItems()
    setItems(data || [])
  }

  const loadTransactions = async () => {
    const data = await fetchTransactions()
    setTransactions(data || [])
  }

  useEffect(() => { 
    loadItems()
    loadTransactions()
  }, [])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const onCreate = async (payload) => {
    await createItem(payload)
    showToast('Item created')
    await loadItems()
  }

  const onUpdate = async (id, payload) => {
    await updateItem(id, payload)
    setEditing(null)
    showToast('Item updated')
    await loadItems()
  }

  const onDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    await deleteItem(id)
    showToast('Item deleted')
    await loadItems()
  }

  const onSale = async (payload) => {
    try {
      await createTransaction(payload)
      showToast('Sale recorded')
      await loadItems()
      await loadTransactions()
    } catch (e) {
      showToast('Error: ' + (e.message || 'Sale failed'))
    }
  }

  const filtered = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()) || (i.description || '').toLowerCase().includes(query.toLowerCase()) )
  const totalValue = items.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 0)), 0)

  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <div className="top-row">
          <div className="left">
            <SearchBar value={query} onChange={setQuery} placeholder="Search items or description..." />
          </div>
        </div>

        <div className="tabs" style={{display:'flex',gap:12,marginBottom:24,borderBottom:'2px solid var(--border)'}}>
          <button 
            onClick={() => setActiveTab('inventory')} 
            style={{
              padding:'12px 16px',
              border:'none',
              background:'transparent',
              cursor:'pointer',
              borderBottom: activeTab === 'inventory' ? '3px solid var(--primary)' : 'none',
              color: activeTab === 'inventory' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'inventory' ? 600 : 500,
              fontSize: 14,
              marginBottom: -2,
              transition: 'var(--transition)'
            }}
          >
            📦 Inventory
          </button>
          <button 
            onClick={() => setActiveTab('sales')} 
            style={{
              padding:'12px 16px',
              border:'none',
              background:'transparent',
              cursor:'pointer',
              borderBottom: activeTab === 'sales' ? '3px solid var(--primary)' : 'none',
              color: activeTab === 'sales' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'sales' ? 600 : 500,
              fontSize: 14,
              marginBottom: -2,
              transition: 'var(--transition)'
            }}
          >
            💰 Sales
          </button>
        </div>

        {activeTab === 'inventory' && (
          <div className="content">
            <section className="form-col">
              <ItemForm onCreate={onCreate} editing={editing} onUpdate={onUpdate} onCancel={() => setEditing(null)} />
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>Total Inventory Value</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)' }}>💰 ${totalValue.toFixed(2)}</div>
              </div>
            </section>

            <section className="list-col">
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>📦 Items ({filtered.length})</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: 0 }}>Manage your inventory</p>
              </div>
              <ItemList items={filtered} onEdit={(it) => setEditing(it)} onDelete={onDelete} />
            </section>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="content">
            <section className="form-col">
              <SalesForm items={items} onSale={onSale} />
            </section>

            <section className="list-col">
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>📊 Sales History</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, margin: 0 }}>Track all transactions</p>
              </div>
              <TransactionHistory transactions={transactions} />
            </section>
          </div>
        )}
      </main>
      {toast && <Toast message={toast} />}
    </div>
  )
}
