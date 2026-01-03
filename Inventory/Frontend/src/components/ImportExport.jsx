import React from 'react'
import { createItem } from '../api'

export default function ImportExport({ items, onImported, showToast }) {
  const exportCsv = () => {
    const header = ['name','quantity','price','description']
    const rows = items.map(i => [i.name, i.quantity, i.price, (i.description||'').replace(/\n/g,' ')] )
    const csv = [header.join(','), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'inventory.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFile = async (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const text = await file.text()
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
    if (lines.length < 1) return
    const header = lines[0].split(',').map(h => h.replace(/\"/g,'').toLowerCase())
    const nameIdx = header.indexOf('name')
    const qtyIdx = header.indexOf('quantity')
    const priceIdx = header.indexOf('price')
    const descIdx = header.indexOf('description')
    let created = 0
    for (let i=1;i<lines.length;i++){
      const cols = parseCsvLine(lines[i])
      const payload = {
        name: cols[nameIdx] || `item-${Date.now()}-${i}`,
        quantity: Number(cols[qtyIdx] || 0),
        price: Number(cols[priceIdx] || 0),
        description: cols[descIdx] || ''
      }
      try { await createItem(payload); created++ } catch (e) { console.error(e) }
    }
    showToast(`Imported ${created} items`)
    onImported()
  }

  // very small CSV parser for simple files
  function parseCsvLine(line){
    const res = []
    let cur = ''
    let inQuotes = false
    for (let i=0;i<line.length;i++){
      const ch = line[i]
      if (ch === '"') { inQuotes = !inQuotes; continue }
      if (ch === ',' && !inQuotes) { res.push(cur); cur = ''; continue }
      cur += ch
    }
    if (cur !== '') res.push(cur)
    return res.map(s => s.replace(/^"|"$/g,'').trim())
  }

  return (
    <div className="import-area">
      <button onClick={exportCsv} className="primary">📥 Export CSV</button>
      <label style={{display:'inline-block'}}>
        <input type="file" accept=".csv,text/csv" style={{display:'none'}} onChange={handleFile} />
        <button style={{}} className="secondary">📤 Import CSV</button>
      </label>
    </div>
  )
}
