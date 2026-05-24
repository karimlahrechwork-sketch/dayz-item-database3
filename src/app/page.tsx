'use client'
import { useState, useMemo } from 'react'
import { ITEMS, CATEGORIES, Item, Category, Map } from '@/data/items'
import ItemCard from '@/components/ItemCard'
import ItemDetail from '@/components/ItemDetail'

type SortKey = 'name' | 'damage' | 'weight' | 'slots'

export default function Home() {
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState<Category | 'all'>('all')
  const [mapFilter, setMapFilter] = useState<Map | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortKey>('name')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return ITEMS
      .filter(item => {
        const matchCat = activeCat === 'all' || item.cat === activeCat
        const matchMap = mapFilter === 'all' || item.maps.includes(mapFilter as Map)
        const matchQ = !q || item.name.toLowerCase().includes(q)
          || item.type.toLowerCase().includes(q)
          || (item.ammo || '').toLowerCase().includes(q)
          || item.spawns.some(s => s.toLowerCase().includes(q))
          || item.rarity.toLowerCase().includes(q)
        return matchCat && matchMap && matchQ
      })
      .sort((a, b) => {
        if (sortBy === 'damage') return (b.damage || 0) - (a.damage || 0)
        if (sortBy === 'weight') return a.weight - b.weight
        if (sortBy === 'slots') return (b.slots || 0) - (a.slots || 0)
        return a.name.localeCompare(b.name)
      })
  }, [search, activeCat, mapFilter, sortBy])

  const selectedItem = ITEMS.find(i => i.id === selectedId) || null

  const handleSelect = (id: number) => {
    setSelectedId(prev => prev === id ? null : id)
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header style={{
        borderBottom: '0.5px solid var(--border)',
        background: 'var(--bg-secondary)',
        padding: '1rem 1.5rem',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: '2px' }}>
              // DAYZ CONSOLE //
            </div>
            <div style={{ fontSize: '22px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em' }}>
              ITEM DATABASE
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              {filtered.length} / {ITEMS.length} ITEMS
            </span>
            <span style={{
              fontSize: '10px', padding: '3px 10px',
              border: '0.5px solid var(--accent)66', borderRadius: '3px',
              color: 'var(--accent-dim)', letterSpacing: '0.08em',
              background: 'var(--accent-glow)',
            }}>
              v1.29 · OFFICIAL
            </span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem' }}>
        {/* Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', marginBottom: '1rem' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="// SEARCH — name, type, ammo, spawn location..."
            style={{
              background: 'var(--bg-card)', border: '0.5px solid var(--border)',
              color: 'var(--text-primary)', padding: '10px 14px',
              fontSize: '12px', letterSpacing: '0.03em', borderRadius: '4px',
              width: '100%',
            }}
          />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortKey)}
            style={{
              background: 'var(--bg-card)', border: '0.5px solid var(--border)',
              color: 'var(--text-secondary)', padding: '10px 12px',
              fontSize: '11px', borderRadius: '4px', cursor: 'pointer',
            }}
          >
            <option value="name">SORT: NAME</option>
            <option value="damage">SORT: DAMAGE</option>
            <option value="weight">SORT: WEIGHT</option>
            <option value="slots">SORT: SLOTS</option>
          </select>
          <select
            value={mapFilter}
            onChange={e => setMapFilter(e.target.value as Map | 'all')}
            style={{
              background: 'var(--bg-card)', border: '0.5px solid var(--border)',
              color: 'var(--text-secondary)', padding: '10px 12px',
              fontSize: '11px', borderRadius: '4px', cursor: 'pointer',
            }}
          >
            <option value="all">ALL MAPS</option>
            <option value="Chernarus">CHERNARUS</option>
            <option value="Livonia">LIVONIA</option>
            <option value="Sakhal">SAKHAL</option>
          </select>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCat(cat.id); setSelectedId(null) }}
              style={{
                background: activeCat === cat.id ? 'var(--accent)' : 'transparent',
                border: `0.5px solid ${activeCat === cat.id ? 'var(--accent)' : 'var(--border)'}`,
                color: activeCat === cat.id ? '#0a0c0a' : 'var(--text-secondary)',
                padding: '6px 14px', fontSize: '11px', cursor: 'pointer',
                borderRadius: '4px', letterSpacing: '0.06em',
                transition: 'all 0.15s', fontFamily: 'var(--font-mono)',
                fontWeight: activeCat === cat.id ? 600 : 400,
              }}
            >
              {cat.label.toUpperCase()}
              <span style={{ marginLeft: '6px', opacity: 0.6, fontSize: '10px' }}>
                [{cat.count}]
              </span>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        {selectedItem && (
          <ItemDetail item={selectedItem} onClose={() => setSelectedId(null)} />
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            [ NO ITEMS FOUND — ADJUST SEARCH OR FILTERS ]
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))',
            gap: '8px',
          }}>
            {filtered.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                selected={selectedId === item.id}
                onClick={() => handleSelect(item.id)}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer style={{
          marginTop: '3rem', paddingTop: '1rem',
          borderTop: '0.5px solid var(--border)',
          fontSize: '10px', color: 'var(--text-muted)',
          letterSpacing: '0.08em', textAlign: 'center',
        }}>
          // DAYZ ITEM DATABASE · v1.29 · CONSOLE OFFICIAL SERVERS · NOT AFFILIATED WITH BOHEMIA INTERACTIVE //
        </footer>
      </div>
    </main>
  )
}
