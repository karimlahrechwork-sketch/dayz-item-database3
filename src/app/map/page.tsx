'use client'
import { useState } from 'react'
import { MAPS, ZONE_TYPE_COLORS, MapName, SpawnZone } from '@/data/maps'
import { ITEMS, Item } from '@/data/items'
import Link from 'next/link'

const MAP_LINKS: Record<MapName, { name: string; url: string; desc: string; color: string }[]> = {
  Chernarus: [
    { name: "iZurvive", url: "https://www.izurvive.com/chernarusplus/", desc: "High-res topo & satellite map. Best for navigation.", color: "#22c55e" },
    { name: "WOBO Map Tool", url: "https://wobo.tools/dayz-map-tool?map=chernarus", desc: "Loot spawns, tier zones, heli crashes, pins.", color: "#3b82f6" },
    { name: "OpticsDayZ", url: "https://opticsdayz.com/", desc: "Aerial imagery, GPS search, live events.", color: "#f59e0b" },
  ],
  Livonia: [
    { name: "iZurvive", url: "https://www.izurvive.com/livonia/", desc: "High-res topo & satellite map. Best for navigation.", color: "#22c55e" },
    { name: "WOBO Map Tool", url: "https://wobo.tools/dayz-map-tool?map=livonia", desc: "Loot spawns, tier zones, heli crashes, pins.", color: "#3b82f6" },
    { name: "OpticsDayZ", url: "https://opticsdayz.com/", desc: "Aerial imagery, GPS search, live events.", color: "#f59e0b" },
  ],
  Sakhal: [
    { name: "iZurvive", url: "https://www.izurvive.com/sakhal/", desc: "High-res topo & satellite map. Best for navigation.", color: "#22c55e" },
    { name: "WOBO Map Tool", url: "https://wobo.tools/dayz-map-tool?map=sakhal", desc: "Loot spawns, tier zones, heli crashes, pins.", color: "#3b82f6" },
    { name: "OpticsDayZ", url: "https://opticsdayz.com/", desc: "Aerial imagery, GPS search, live events.", color: "#f59e0b" },
  ],
}

export default function MapPage() {
  const [activeMap, setActiveMap] = useState<MapName>('Chernarus')
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [hoveredZone, setHoveredZone] = useState<SpawnZone | null>(null)
  const [selectedZone, setSelectedZone] = useState<SpawnZone | null>(null)
  const [itemSearch, setItemSearch] = useState('')

  const mapData = MAPS[activeMap]
  const links = MAP_LINKS[activeMap]

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

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem' }}>

        {/* External Map Links */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '10px' }}>
            // OPEN FULL INTERACTIVE MAP IN NEW TAB
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
            {links.map(link => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  background: 'var(--bg-card)', border: `0.5px solid ${link.color}44`,
                  borderRadius: '8px', padding: '14px 16px', textDecoration: 'none',
                  transition: 'all 0.15s', cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = link.color)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = `${link.color}44`)}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: `${link.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                  🗺️
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: link.color, fontFamily: 'var(--font-display)', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {link.name} <span style={{ fontSize: '10px', opacity: 0.7 }}>↗</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px', letterSpacing: '0.03em' }}>{link.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
          <span style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>// SPAWN ZONE REFERENCE MAP</span>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
        </div>

        {/* Map + Item Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1rem' }}>

          {/* Item Selector */}
          <div>
            <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '10px 12px', borderBottom: '0.5px solid var(--border)', background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'var(--accent-dim)', marginBottom: '6px' }}>// SELECT ITEM → HIGHLIGHT ZONES</div>
                <input value={itemSearch} onChange={e => setItemSearch(e.target.value)} placeholder="Search items..."
                  style={{ width: '100%', background: 'var(--bg-primary)', border: '0.5px solid var(--border)', color: 'var(--text-primary)', padding: '6px 10px', fontSize: '11px', borderRadius: '4px' }} />
              </div>
              <div style={{ maxHeight: 'calc(100vh - 360px)', overflowY: 'auto' }}>
                {selectedItem && (
                  <button onClick={() => setSelectedItem(null)}
                    style={{ width: '100%', padding: '7px 12px', background: 'rgba(239,68,68,0.08)', border: 'none', borderBottom: '0.5px solid var(--border)', color: '#ef4444', fontSize: '10px', cursor: 'pointer', letterSpacing: '0.06em', textAlign: 'left', fontFamily: 'var(--font-mono)' }}>
                    ✕ CLEAR
                  </button>
                )}
                {filteredItems.map(item => (
                  <button key={item.id} onClick={() => setSelectedItem(prev => prev?.id === item.id ? null : item)}
                    style={{
                      width: '100%', padding: '8px 12px',
                      background: selectedItem?.id === item.id ? 'rgba(74,222,128,0.08)' : 'transparent',
                      border: 'none', borderBottom: '0.5px solid var(--border)',
                      borderLeft: selectedItem?.id === item.id ? '2px solid var(--accent)' : '2px solid transparent',
                      color: selectedItem?.id === item.id ? 'var(--accent)' : 'var(--text-secondary)',
                      fontSize: '11px', cursor: 'pointer', textAlign: 'left',
                      fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.1s',
                    }}>
                    <span style={{ fontSize: '14px' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: '11px', color: selectedItem?.id === item.id ? 'var(--accent)' : 'var(--text-primary)', fontWeight: selectedItem?.id === item.id ? 600 : 400 }}>{item.name}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{item.type}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map + Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Map description bar */}
            <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '8px', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ fontSize: '13px', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.06em' }}>{mapData.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{mapData.description}</div>
              </div>
              {selectedItem && (
                <div style={{ fontSize: '11px', padding: '4px 12px', background: 'rgba(74,222,128,0.1)', border: '0.5px solid var(--accent)', borderRadius: '4px', color: 'var(--accent)' }}>
                  {selectedItem.icon} {selectedItem.name} — {highlightedZones.length} spawn zone{highlightedZones.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>

            {/* SVG Map */}
            <div style={{ background: mapData.bgColor, border: '0.5px solid var(--border)', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
              <svg viewBox="0 0 800 520" style={{ width: '100%', display: 'block' }}>
                {/* Grid */}
                {[...Array(8)].map((_, i) => <line key={`v${i}`} x1={i*100} y1={0} x2={i*100} y2={520} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />)}
                {[...Array(6)].map((_, i) => <line key={`h${i}`} x1={0} y1={i*87} x2={800} y2={i*87} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />)}
                <text x="16" y="24" fill={mapData.accentColor} fontSize="10" fontFamily="'Share Tech Mono', monospace" opacity="0.5" letterSpacing="2">// {mapData.name.toUpperCase()} SPAWN REFERENCE //</text>
                <text x="16" y="38" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="'Share Tech Mono', monospace" letterSpacing="1">CLICK ZONE FOR LOOT · SELECT ITEM TO HIGHLIGHT</text>

                {mapData.zones.map(zone => {
                  const cx = (zone.x / 100) * 800
                  const cy = (zone.y / 100) * 520
                  const colors = ZONE_TYPE_COLORS[zone.type]
                  const isHighlighted = highlightedZoneIds.has(zone.id)
                  const isSelected = selectedZone?.id === zone.id
                  const dimmed = selectedItem !== null && !isHighlighted

                  return (
                    <g key={zone.id} style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedZone(prev => prev?.id === zone.id ? null : zone)}
                      onMouseEnter={() => setHoveredZone(zone)}
                      onMouseLeave={() => setHoveredZone(null)}>
                      {isHighlighted && (
                        <circle cx={cx} cy={cy} r={zone.radius + 10} fill="none" stroke={colors.stroke} strokeWidth="1.5" opacity="0.5" strokeDasharray="5 3" />
                      )}
                      <circle cx={cx} cy={cy} r={zone.radius}
                        fill={isHighlighted ? colors.fill.replace('0.18','0.4') : dimmed ? 'rgba(255,255,255,0.02)' : colors.fill}
                        stroke={isHighlighted ? colors.stroke : dimmed ? 'rgba(255,255,255,0.06)' : colors.stroke}
                        strokeWidth={isHighlighted || isSelected ? 2 : 0.5}
                        opacity={dimmed ? 0.25 : 1}
                      />
                      <text x={cx} y={cy + 3} textAnchor="middle"
                        fill={dimmed ? 'rgba(255,255,255,0.15)' : colors.label}
                        fontSize={zone.radius > 28 ? "8" : "7"}
                        fontFamily="'Share Tech Mono', monospace"
                        fontWeight={isHighlighted ? "bold" : "normal"}
                        style={{ pointerEvents: 'none' }}>
                        {zone.name.split(' ').slice(0,2).join(' ')}
                      </text>
                    </g>
                  )
                })}
              </svg>

              {/* Legend */}
              <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(10,12,10,0.9)', border: '0.5px solid var(--border)', borderRadius: '6px', padding: '8px 12px' }}>
                {Object.entries(ZONE_TYPE_COLORS).map(([type, colors]) => (
                  <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: colors.stroke, opacity: 0.85 }} />
                    <span style={{ fontSize: '8px', color: colors.label, letterSpacing: '0.06em' }}>{type.toUpperCase()}</span>
                  </div>
                ))}
                <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '0.5px solid var(--border)', fontSize: '8px', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                  Approximate zones only.<br />Use links above for exact spawns.
                </div>
              </div>
            </div>

            {/* Zone detail */}
            {displayZone && (
              <div style={{ background: 'var(--bg-card)', border: `1px solid ${ZONE_TYPE_COLORS[displayZone.type].stroke}`, borderRadius: '8px', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>{displayZone.name}</div>
                    <div style={{ fontSize: '10px', color: ZONE_TYPE_COLORS[displayZone.type].label, letterSpacing: '0.1em', marginTop: '1px' }}>{displayZone.type.toUpperCase()}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '5px' }}>{displayZone.description}</div>
                  </div>
                  {selectedZone && (
                    <button onClick={() => setSelectedZone(null)} style={{ background: 'transparent', border: '0.5px solid var(--border)', color: 'var(--text-muted)', fontSize: '10px', padding: '3px 8px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>✕</button>
                  )}
                </div>
                <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '6px' }}>// ITEMS THAT SPAWN HERE</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {zoneItems(displayZone).slice(0, 24).map(item => (
                    <span key={item.id} style={{ fontSize: '10px', padding: '3px 7px', border: `0.5px solid ${ZONE_TYPE_COLORS[displayZone.type].stroke}33`, borderRadius: '4px', color: 'var(--text-secondary)', background: `${ZONE_TYPE_COLORS[displayZone.type].stroke}0d` }}>
                      {item.icon} {item.name}
                    </span>
                  ))}
                  {zoneItems(displayZone).length === 0 && (
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>No items in database match this zone yet.</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
