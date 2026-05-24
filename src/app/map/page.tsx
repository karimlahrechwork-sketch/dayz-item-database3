'use client'
import { useState } from 'react'
import { MAPS, ZONE_TYPE_COLORS, MapName, SpawnZone } from '@/data/maps'
import { ITEMS, Item } from '@/data/items'
import Link from 'next/link'

export default function MapPage() {
  const [activeMap, setActiveMap] = useState<MapName>('Chernarus')
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [hoveredZone, setHoveredZone] = useState<SpawnZone | null>(null)
  const [selectedZone, setSelectedZone] = useState<SpawnZone | null>(null)
  const [itemSearch, setItemSearch] = useState('')

  const mapData = MAPS[activeMap]

  const filteredItems = ITEMS.filter(i =>
    i.maps.includes(activeMap) &&
    (itemSearch === '' || i.name.toLowerCase().includes(itemSearch.toLowerCase()))
  )

  const highlightedZones = selectedItem
    ? mapData.zones.filter(z =>
        selectedItem.spawns.some(s =>
          z.spawnTags.some(t => t.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(t.toLowerCase()))
        )
      )
    : []

  const highlightedZoneIds = new Set(highlightedZones.map(z => z.id))

  const zoneItems = (zone: SpawnZone) =>
    ITEMS.filter(i =>
      i.maps.includes(activeMap) &&
      i.spawns.some(s =>
        zone.spawnTags.some(t => t.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(t.toLowerCase()))
      )
    )

  const displayZone = selectedZone || hoveredZone

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header style={{ borderBottom: '0.5px solid var(--border)', background: 'var(--bg-secondary)', padding: '1rem 1.5rem', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', textDecoration: 'none' }}>← DATABASE</Link>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.2em' }}>// DAYZ CONSOLE //</div>
              <div style={{ fontSize: '22px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em' }}>SPAWN MAPS</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['Chernarus', 'Livonia', 'Sakhal'] as MapName[]).map(m => (
              <button key={m} onClick={() => { setActiveMap(m); setSelectedItem(null); setSelectedZone(null) }}
                style={{
                  background: activeMap === m ? MAPS[m].accentColor : 'transparent',
                  border: `0.5px solid ${activeMap === m ? MAPS[m].accentColor : 'var(--border)'}`,
                  color: activeMap === m ? '#0a0c0a' : 'var(--text-secondary)',
                  padding: '6px 16px', fontSize: '11px', cursor: 'pointer',
                  borderRadius: '4px', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)',
                  fontWeight: activeMap === m ? 600 : 400, transition: 'all 0.15s',
                }}>
                {m.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1rem' }}>
        {/* Left Panel - Item Selector */}
        <div>
          <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '12px', borderBottom: '0.5px solid var(--border)', background: 'var(--bg-secondary)' }}>
              <div style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'var(--accent-dim)', marginBottom: '8px' }}>// SELECT ITEM TO HIGHLIGHT SPAWNS</div>
              <input
                value={itemSearch}
                onChange={e => setItemSearch(e.target.value)}
                placeholder="Search items..."
                style={{ width: '100%', background: 'var(--bg-primary)', border: '0.5px solid var(--border)', color: 'var(--text-primary)', padding: '7px 10px', fontSize: '11px', borderRadius: '4px' }}
              />
            </div>
            <div style={{ maxHeight: 'calc(100vh - 280px)', overflowY: 'auto' }}>
              {selectedItem && (
                <button onClick={() => setSelectedItem(null)}
                  style={{ width: '100%', padding: '8px 12px', background: 'rgba(239,68,68,0.1)', border: 'none', borderBottom: '0.5px solid var(--border)', color: '#ef4444', fontSize: '10px', cursor: 'pointer', letterSpacing: '0.08em', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>
                  ✕ CLEAR SELECTION
                </button>
              )}
              {filteredItems.map(item => (
                <button key={item.id} onClick={() => setSelectedItem(prev => prev?.id === item.id ? null : item)}
                  style={{
                    width: '100%', padding: '10px 12px', background: selectedItem?.id === item.id ? 'rgba(74,222,128,0.08)' : 'transparent',
                    border: 'none', borderBottom: '0.5px solid var(--border)',
                    borderLeft: selectedItem?.id === item.id ? '2px solid var(--accent)' : '2px solid transparent',
                    color: selectedItem?.id === item.id ? 'var(--accent)' : 'var(--text-secondary)',
                    fontSize: '11px', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-mono)',
                    display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.1s',
                  }}>
                  <span style={{ fontSize: '14px' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: selectedItem?.id === item.id ? 600 : 400, color: selectedItem?.id === item.id ? 'var(--accent)' : 'var(--text-primary)', fontSize: '11px' }}>{item.name}</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{item.type}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Map + Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Map description */}
          <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <div style={{ fontSize: '14px', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.06em' }}>{mapData.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{mapData.description}</div>
            </div>
            {selectedItem && (
              <div style={{ fontSize: '11px', padding: '4px 12px', background: 'rgba(74,222,128,0.1)', border: '0.5px solid var(--accent)', borderRadius: '4px', color: 'var(--accent)' }}>
                Showing spawns for: <strong>{selectedItem.name}</strong> ({highlightedZones.length} zones)
              </div>
            )}
          </div>

          {/* SVG Map */}
          <div style={{ background: mapData.bgColor, border: '0.5px solid var(--border)', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
            <svg viewBox="0 0 800 600" style={{ width: '100%', display: 'block' }}>
              {/* Grid lines */}
              {[...Array(8)].map((_, i) => (
                <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={600} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}
              {[...Array(6)].map((_, i) => (
                <line key={`h${i}`} x1={0} y1={i * 100} x2={800} y2={i * 100} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}

              {/* Map label */}
              <text x="16" y="28" fill={mapData.accentColor} fontSize="11" fontFamily="'Share Tech Mono', monospace" opacity="0.6" letterSpacing="2">
                // {mapData.name.toUpperCase()} //
              </text>

              {/* Zones */}
              {mapData.zones.map(zone => {
                const cx = (zone.x / 100) * 800
                const cy = (zone.y / 100) * 600
                const colors = ZONE_TYPE_COLORS[zone.type]
                const isHighlighted = highlightedZoneIds.has(zone.id)
                const isSelected = selectedZone?.id === zone.id
                const dimmed = selectedItem && !isHighlighted

                return (
                  <g key={zone.id} style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedZone(prev => prev?.id === zone.id ? null : zone)}
                    onMouseEnter={() => setHoveredZone(zone)}
                    onMouseLeave={() => setHoveredZone(null)}>
                    {/* Pulse ring for highlighted */}
                    {isHighlighted && (
                      <circle cx={cx} cy={cy} r={zone.radius + 8} fill="none" stroke={colors.stroke} strokeWidth="1" opacity="0.4" strokeDasharray="4 4" />
                    )}
                    {/* Main circle */}
                    <circle
                      cx={cx} cy={cy} r={zone.radius}
                      fill={isHighlighted ? colors.fill.replace('0.18', '0.35') : dimmed ? 'rgba(255,255,255,0.02)' : colors.fill}
                      stroke={isHighlighted ? colors.stroke : dimmed ? 'rgba(255,255,255,0.08)' : colors.stroke}
                      strokeWidth={isHighlighted || isSelected ? 2 : 1}
                      opacity={dimmed ? 0.3 : 1}
                    />
                    {/* Zone name */}
                    <text
                      x={cx} y={cy + 4}
                      textAnchor="middle" fill={dimmed ? 'rgba(255,255,255,0.2)' : colors.label}
                      fontSize={zone.radius > 25 ? "9" : "8"}
                      fontFamily="'Share Tech Mono', monospace"
                      fontWeight={isHighlighted ? "bold" : "normal"}
                      style={{ pointerEvents: 'none' }}>
                      {zone.name.split(' ').slice(0, 2).join(' ')}
                    </text>
                  </g>
                )
              })}

              {/* Legend */}
              {Object.entries(ZONE_TYPE_COLORS).map(([type, colors], i) => (
                <g key={type} transform={`translate(${620}, ${520 + i * 0})`}>
                </g>
              ))}
            </svg>

            {/* Legend overlay */}
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(10,12,10,0.85)', border: '0.5px solid var(--border)', borderRadius: '6px', padding: '8px 12px' }}>
              {Object.entries(ZONE_TYPE_COLORS).map(([type, colors]) => (
                <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.stroke, opacity: 0.8 }} />
                  <span style={{ fontSize: '9px', color: colors.label, letterSpacing: '0.06em' }}>{type.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Zone detail panel */}
          {displayZone && (
            <div style={{ background: 'var(--bg-card)', border: `1px solid ${ZONE_TYPE_COLORS[displayZone.type].stroke}`, borderRadius: '8px', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '15px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>{displayZone.name}</div>
                  <div style={{ fontSize: '10px', color: ZONE_TYPE_COLORS[displayZone.type].label, letterSpacing: '0.1em', marginTop: '2px' }}>{displayZone.type.toUpperCase()}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px' }}>{displayZone.description}</div>
                </div>
                {selectedZone && (
                  <button onClick={() => setSelectedZone(null)} style={{ background: 'transparent', border: '0.5px solid var(--border)', color: 'var(--text-muted)', fontSize: '10px', padding: '3px 8px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>✕</button>
                )}
              </div>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '8px' }}>// ITEMS THAT SPAWN HERE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {zoneItems(displayZone).slice(0, 20).map(item => (
                  <span key={item.id} style={{ fontSize: '10px', padding: '3px 8px', border: `0.5px solid ${ZONE_TYPE_COLORS[displayZone.type].stroke}44`, borderRadius: '4px', color: 'var(--text-secondary)', background: `${ZONE_TYPE_COLORS[displayZone.type].stroke}11` }}>
                    {item.icon} {item.name}
                  </span>
                ))}
                {zoneItems(displayZone).length === 0 && (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>No matching items in database for this zone yet.</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
