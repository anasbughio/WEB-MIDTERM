import React from 'react'

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search">
      <input 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        placeholder={placeholder || '🔍 Search items...'}
        style={{
          paddingLeft: 14,
          fontSize: 15
        }}
      />
    </div>
  )
}
