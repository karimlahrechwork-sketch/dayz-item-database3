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
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '2px', transition: 'width 0.3s' }} />
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
    <span style={{ fontSize: '9px', padding: '2px 6px', border: `0.5px solid ${color}44`, borderRadius: '3px', color, letterSpacing: '0.05em', background: `${color}11` }}>
      {spawn.split(' ')[0]}
    </span>
  )
}

export default function ItemCard({ item, selected, onClick }: Props) {
  const tierColor = TIER_COLORS[item.tier]
  return (
    <div
      onClick={onClick}
      style={{
        background: selected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: selected ? '1px solid var(--accent)' : '0.5px solid var(--border)',
        borderRadius: '6px', padding: '12px', cursor: 'pointer',
        transition: 'all 0.15s', position: 'relative',
      }}
      onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-bright)' }}
      onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
    >
      {selected && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--accent)', borderRadius: '6px 6px 0 0' }} />}

      <div style={{ fontSize: '22px', marginBottom: '6px' }}>{item.icon}</div>
      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px', lineHeight: 1.3, fontFamily: 'var(--font-display)' }}>{item.name}</div>
      <div style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '8px', textTransform: 'uppercase' }}>{item.type}</div>

      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
        <span className={tierColor} style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '3px', letterSpacing: '0.06em' }}>{TIER_LABELS[item.tier]}</span>
        {item.spawns.slice(0, 2).map(s => <SpawnTag key={s} spawn={s} />)}
      </div>

      {item.cat === 'weapons' && item.healthDamage !== undefined && (
        <>
          <StatBar label="Health Dmg" value={item.healthDamage} max={200} color={item.healthDamage > 120 ? 'var(--red)' : item.healthDamage > 80 ? 'var(--amber)' : 'var(--accent-dim)'} />
          {item.rpm && <StatBar label="RPM" value={item.rpm} max={900} color="var(--blue)" />}
          <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {item.ammo} · {item.weight}kg · {item.slots} slots
          </div>
        </>
      )}
      {item.cat === 'gear' && item.protection !== undefined && (
        <>
          <StatBar label="Protection" value={item.protection} max={100} color="var(--accent-dim)" />
          <StatBar label="Slots" value={item.slots} max={63} color="var(--blue)" />
        </>
      )}
      {item.cat === 'food' && item.calories !== undefined && item.calories > 0 && (
        <StatBar label="Calories" value={item.calories} max={500} color="var(--amber)" />
      )}
      {item.cat === 'food' && item.water !== undefined && item.water > 0 && (
        <StatBar label="Water (ml)" value={item.water} max={1000} color="var(--blue)" />
      )}
      {(item.cat === 'medical' || item.cat === 'tools') && (
        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
          {item.effect || item.use}
        </div>
      )}
    </div>
  )
}
