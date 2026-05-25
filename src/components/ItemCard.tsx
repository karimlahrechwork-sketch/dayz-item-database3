'use client'
import { Item, TIER_LABELS, TIER_COLORS } from '@/data/items'

interface Props {
  item: Item
  selected: boolean
  onClick: () => void
}

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
      <span style={{ fontSize: '9px', color: 'var(--text-muted)', width: '64px', letterSpacing: '0.06em' }}>{label}</span>
      <div style={{ flex: 1, height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '2px' }} />
      </div>
      <span style={{ fontSize: '9px', color: 'var(--text-secondary)', width: '32px', textAlign: 'right' }}>{Math.round(value)}</span>
    </div>
  )
}

function SpawnTag({ spawn }: { spawn: string }) {
  const s = spawn.toLowerCase()
  let color = '#4a6a4a'
  if (s.includes('milit') || s.includes('tisy') || s.includes('nwaf') || s.includes('crash')) color = '#22c55e'
  else if (s.includes('med') || s.includes('hosp')) color = '#3b82f6'
  else if (s.includes('police')) color = '#a855f7'
  else if (s.includes('farm') || s.includes('hunt')) color = '#f59e0b'
  else if (s.includes('ind')) color = '#ef4444'
  return (
    <span style={{ fontSize: '9px', padding: '2px 6px', border: `0.5px solid ${color}44`, borderRadius: '3px', color, background: `${color}11` }}>
      {spawn.split(' ')[0]}
    </span>
  )
}

export default function ItemCard({ item, selected, onClick }: Props) {
  const c = item.characteristics
  const p = item.performance

  return (
    <div onClick={onClick}
      style={{
        background: selected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: selected ? '1px solid var(--accent)' : '0.5px solid var(--border)',
        borderRadius: '6px', padding: '12px', cursor: 'pointer',
        transition: 'all 0.15s', position: 'relative',
      }}
      onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-bright)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = selected ? 'var(--accent)' : 'var(--border)' }}
    >
      {selected && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--accent)', borderRadius: '6px 6px 0 0' }} />}

      {/* Icon + name row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '6px', flexShrink: 0,
          background: 'var(--bg-secondary)', border: '0.5px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
        }}>
          {item.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, fontFamily: 'var(--font-display)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {item.name}
          </div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '1px' }}>
            {item.type}
          </div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>
            {c.sizeRows}×{c.sizeCols} · {(c.weightGrams / 1000).toFixed(2)}kg
          </div>
        </div>
      </div>

      {/* Tier + spawn tags */}
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
        <span className={TIER_COLORS[item.tier]} style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '3px', letterSpacing: '0.06em' }}>
          {TIER_LABELS[item.tier]}
        </span>
        {item.spawns.slice(0, 2).map(s => <SpawnTag key={s} spawn={s} />)}
      </div>

      {/* Stat bars */}
      {item.cat === 'weapons' && p?.healthDamage !== undefined && (
        <>
          <StatBar label="Health Dmg" value={p.healthDamage} max={200} color={p.healthDamage > 120 ? 'var(--red)' : p.healthDamage > 80 ? 'var(--amber)' : 'var(--accent-dim)'} />
          {p.rpm && <StatBar label="RPM" value={p.rpm} max={900} color="var(--blue)" />}
        </>
      )}
      {item.cat === 'gear' && p?.healthReduction !== undefined && (
        <StatBar label="Protection" value={p.healthReduction} max={100} color="var(--accent-dim)" />
      )}
      {item.cat === 'gear' && c.cargoSlots !== undefined && (
        <StatBar label="Cargo Slots" value={c.cargoSlots} max={63} color="var(--blue)" />
      )}
      {item.cat === 'food' && c.nutritionalValue !== undefined && c.nutritionalValue > 0 && (
        <StatBar label="Calories" value={c.nutritionalValue} max={500} color="var(--amber)" />
      )}
      {item.cat === 'food' && c.waterContent !== undefined && c.waterContent > 0 && (
        <StatBar label="Water ml" value={c.waterContent} max={1000} color="var(--blue)" />
      )}
      {item.cat === 'medical' && c.uses !== undefined && (
        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          {c.uses} use{c.uses !== 1 ? 's' : ''} per item
        </div>
      )}
    </div>
  )
}
