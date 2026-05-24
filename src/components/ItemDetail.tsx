'use client'
import { Item, TIER_LABELS, MAP_COLORS } from '@/data/items'

interface Props {
  item: Item
  onClose: () => void
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '6px 0', borderBottom: '0.5px solid var(--border)',
    }}>
      <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{label}</span>
      <span style={{ fontSize: '11px', color: 'var(--text-primary)', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{
        fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'var(--accent-dim)', marginBottom: '8px',
        borderBottom: '0.5px solid var(--border)', paddingBottom: '4px',
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

export default function ItemDetail({ item, onClose }: Props) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--accent)',
      borderRadius: '8px',
      padding: '1.25rem',
      marginBottom: '1rem',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, var(--accent), transparent)',
        borderRadius: '8px 8px 0 0',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '28px' }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>
                {item.name}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {item.type} · Tier {TIER_LABELS[item.tier]} · {item.rarity}
              </div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.6, maxWidth: '500px' }}>
            {item.desc}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent', border: '0.5px solid var(--border)',
            color: 'var(--text-muted)', fontSize: '11px', padding: '4px 10px',
            cursor: 'pointer', borderRadius: '4px', letterSpacing: '0.05em',
            transition: 'all 0.15s', whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        >
          ✕ CLOSE
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <Section title="// Stats">
          <Row label="Weight" value={`${item.weight} kg`} />
          <Row label="Inventory Slots" value={item.slots} />
          {item.damage !== undefined && <Row label="Damage" value={`${item.damage} / 100`} />}
          {item.ammo && <Row label="Ammunition" value={item.ammo} />}
          {item.protection !== undefined && <Row label="Protection" value={`${item.protection}%`} />}
          {item.calories && <Row label="Calories" value={`${item.calories} kcal`} />}
          {item.water && <Row label="Water" value={`${item.water} ml`} />}
          {item.effect && <Row label="Effect" value={item.effect} />}
          {item.use && <Row label="Use" value={item.use} />}
        </Section>

        <div>
          <Section title="// Spawn Locations">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {item.spawns.map(s => (
                <span key={s} style={{
                  fontSize: '10px', padding: '4px 8px',
                  border: '0.5px solid var(--border-bright)', borderRadius: '4px',
                  color: 'var(--text-secondary)',
                }}>
                  {s}
                </span>
              ))}
            </div>
          </Section>

          <Section title="// Available Maps">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {item.maps.map(m => (
                <div key={m} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '11px', padding: '4px 10px',
                  border: `0.5px solid ${MAP_COLORS[m]}44`,
                  borderRadius: '4px', color: MAP_COLORS[m],
                  background: `${MAP_COLORS[m]}11`,
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: MAP_COLORS[m] }} />
                  {m}
                </div>
              ))}
            </div>
          </Section>

          {item.attachments && item.attachments.length > 0 && (
            <Section title="// Attachments">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {item.attachments.map(a => (
                  <span key={a} style={{
                    fontSize: '10px', padding: '4px 8px',
                    border: '0.5px solid var(--accent)44', borderRadius: '4px',
                    color: 'var(--accent-dim)', background: 'var(--accent-glow)',
                  }}>
                    {a}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}
