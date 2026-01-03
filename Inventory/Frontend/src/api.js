const BASE = 'http://localhost:5000/api/items'
const TXN_BASE = 'http://localhost:5000/api/transactions'

export async function fetchItems() {
  try {
    const res = await fetch(BASE)
    return await res.json()
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function createItem(payload) {
  const res = await fetch(BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  return await res.json()
}

export async function updateItem(id, payload) {
  const res = await fetch(`${BASE}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  return await res.json()
}

export async function deleteItem(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  return await res.json()
}

export async function fetchTransactions() {
  try {
    const res = await fetch(TXN_BASE)
    return await res.json()
  } catch (e) {
    console.error(e)
    return []
  }
}

export async function createTransaction(payload) {
  const res = await fetch(TXN_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  return await res.json()
}
