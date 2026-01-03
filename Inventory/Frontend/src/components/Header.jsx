import React from 'react'

export default function Header() {
  return (
    <header className="app-header">
      <div className="container header-inner">
        <div>
          <h1 className="header-title">📦 Inventory Manager</h1>
          <div className="header-sub">Modern inventory management system with real-time tracking</div>
        </div>
        <div style={{fontSize: 48}}>📊</div>
      </div>
    </header>
  )
}
