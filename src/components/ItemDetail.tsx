'use client'
import { Item, TIER_LABELS, MAP_COLORS } from '@/data/items'

interface Props {
  item: Item
  onClose: () => void
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '0.5px solid var(--border)' }}>
      <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{label}</span>
      <span style={{ fontSize: '11px', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-dim)', marginBottom: '6px', borderBottom: '0.5px solid var(--border)', paddingBottom: '4px' }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function StatBar({ label, value, max, color, suffix = '' }: { label: string; value: number; max: number; color: string; suffix?: string }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
      <span style={{ fontSize: '10px', color: 'var(--text-muted)', width: '110px', flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '2px' }} />
      </div>
      <span style={{ fontSize: '10px', color: 'var(--text-secondary)', width: '60px', textAlign: 'right', flexShrink: 0 }}>
        {typeof value === 'number' ? Math.round(value) : value}{suffix}
      </span>
    </div>
  )
}

function InventoryGrid({ rows, cols }: { rows: number; cols: number }) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '2px' }}>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} style={{ display: 'flex', gap: '2px' }}>
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} style={{ width: '14px', height: '14px', background: 'var(--accent-glow)', border: '0.5px solid var(--accent)44', borderRadius: '2px' }} />
          ))}
        </div>
      ))}
      <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>
        {rows}×{cols} = {rows * cols} slots
      </div>
    </div>
  )
}

export default function ItemDetail({ item, onClose }: Props) {
  const c = item.characteristics
  const p = item.performance

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--accent)', borderRadius: '8px', padding: '1.25rem', marginBottom: '1rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent), transparent)', borderRadius: '8px 8px 0 0' }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flex: 1 }}>
          {/* Large emoji icon */}
          <div style={{
            width: '72px', height: '72px', flexShrink: 0,
            background: 'var(--bg-secondary)', border: '0.5px solid var(--border)',
            borderRadius: '10px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '40px',
          }}>
            {item.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>
              {item.name}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>
              {item.type} · Tier {TIER_LABELS[item.tier]} · {item.rarity}
            </div>
            {/* In-game description */}
            <div style={{ fontSize: '11px', color: 'var(--accent-dim)', marginTop: '8px', fontStyle: 'italic', lineHeight: 1.5, borderLeft: '2px solid var(--accent)44', paddingLeft: '8px' }}>
              "{item.inGameDesc}"
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.6, maxWidth: '500px' }}>
              {item.desc}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end', flexShrink: 0 }}>
          <button onClick={onClose} style={{ background: 'transparent', border: '0.5px solid var(--border)', color: 'var(--text-muted)', fontSize: '11px', padding: '4px 10px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
            ✕ CLOSE
          </button>
          <a href={item.wikiUrl} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '10px', color: 'var(--accent-dim)', textDecoration: 'none', letterSpacing: '0.06em', border: '0.5px solid var(--accent)44', padding: '4px 10px', borderRadius: '4px' }}>
            📖 WIKI ↗
          </a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>

        {/* LEFT — Characteristics + Grid */}
        <div>
          <Section title="// Characteristics">
            <Row label="Weight" value={`${(c.weightGrams / 1000).toFixed(3)} kg (${c.weightGrams}g)`} />
            <Row label="Inventory Size" value={`${c.sizeRows} × ${c.sizeCols} (${c.sizeRows * c.sizeCols} slots)`} />
            {c.lengthCm !== undefined && <Row label="Length" value={`${c.lengthCm} cm`} />}
            {c.absorbency !== undefined && <Row label="Absorbency" value={`${c.absorbency}%`} />}
            {c.fireModes && <Row label="Fire Modes" value={c.fireModes.join(' / ')} />}
            {c.magazineSize !== undefined && <Row label="Magazine Size" value={`${c.magazineSize} rounds`} />}
            {c.reloadTimeSec !== undefined && <Row label="Reload Time" value={`${c.reloadTimeSec}s`} />}
            {c.distanceM !== undefined && <Row label="Effective Range" value={`~${c.distanceM}m`} />}
            {c.muzzleVelocity !== undefined && <Row label="Muzzle Velocity" value={`${c.muzzleVelocity} m/s`} />}
            {c.cargoSlots !== undefined && <Row label="Cargo Capacity" value={`${c.cargoSlots} slots`} />}
            {c.nutritionalValue !== undefined && c.nutritionalValue > 0 && <Row label="Nutritional Value" value={`${c.nutritionalValue} kcal`} />}
            {c.waterContent !== undefined && c.waterContent > 0 && <Row label="Water Content" value={`${c.waterContent} ml`} />}
            {c.uses !== undefined && <Row label="Uses per Item" value={`${c.uses}`} />}
          </Section>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '8px' }}>// INVENTORY FOOTPRINT</div>
            <InventoryGrid rows={c.sizeRows} cols={c.sizeCols} />
          </div>
        </div>

        {/* RIGHT — Performance + Spawns + Maps + Attachments */}
        <div>
          {p && (
            <Section title="// Performance">
              {p.healthDamage !== undefined && (
                <>
                  <StatBar label="Health Damage" value={p.healthDamage} max={200} color="#ef4444" suffix=" HP" />
                  {p.shockDamage !== undefined && <StatBar label="Shock Damage" value={p.shockDamage} max={200} color="#f59e0b" />}
                  {p.rpm !== undefined && <StatBar label="Rate of Fire" value={p.rpm} max={900} color="#3b82f6" suffix=" RPM" />}
                  {p.recoil !== undefined && <StatBar label="Recoil" value={p.recoil} max={700} color="#a855f7" />}
                  {p.sway !== undefined && <StatBar label="Sway" value={p.sway * 100} max={562.5} color="#f59e0b" />}
                  {p.penetrationPower !== undefined && <StatBar label="Penetration" value={p.penetrationPower} max={977} color="#22c55e" />}
                </>
              )}
              {p.healthReduction !== undefined && (
                <>
                  <StatBar label="Health Reduction" value={p.healthReduction} max={100} color="#22c55e" suffix="%" />
                  {p.bloodReduction !== undefined && <StatBar label="Blood Reduction" value={p.bloodReduction} max={100} color="#ef4444" suffix="%" />}
                  {p.shockReduction !== undefined && <StatBar label="Shock Reduction" value={p.shockReduction} max={100} color="#f59e0b" suffix="%" />}
                </>
              )}
              {(p as any).energyBoost !== undefined && (p as any).energyBoost > 0 && (
                <StatBar label="Energy" value={(p as any).energyBoost} max={500} color="#f59e0b" suffix=" kcal" />
              )}
              {(p as any).waterBoost !== undefined && (p as any).waterBoost > 0 && (
                <StatBar label="Hydration" value={(p as any).waterBoost} max={1000} color="#3b82f6" suffix=" ml" />
              )}
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '8px' }}>
                Stats: dayz.fandom.com & wobo.tools
              </div>
            </Section>
          )}

          <Section title="// Spawn Locations">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {item.spawns.map(s => (
                <span key={s} style={{ fontSize: '10px', padding: '3px 8px', border: '0.5px solid var(--border-bright)', borderRadius: '4px', color: 'var(--text-secondary)' }}>{s}</span>
              ))}
            </div>
          </Section>

          <Section title="// Available Maps">
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {item.maps.map(m => (
                <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', padding: '3px 10px', border: `0.5px solid ${MAP_COLORS[m]}44`, borderRadius: '4px', color: MAP_COLORS[m], background: `${MAP_COLORS[m]}11` }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: MAP_COLORS[m] }} />
                  {m}
                </div>
              ))}
            </div>
          </Section>

          {item.attachments && item.attachments.length > 0 && (
            <Section title="// Attachments">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {item.attachments.map(a => (
                  <span key={a} style={{ fontSize: '10px', padding: '3px 8px', border: '0.5px solid var(--accent)44', borderRadius: '4px', color: 'var(--accent-dim)', background: 'var(--accent-glow)' }}>{a}</span>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}
