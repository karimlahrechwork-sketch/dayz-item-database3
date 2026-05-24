'use client'
import { useState } from 'react'
import { ITEMS, Item, Category, Map as DayZMap } from '@/data/items'
import Link from 'next/link'

const EMPTY_ITEM: Omit<Item, 'id'> = {
  name: '', type: '', cat: 'weapons', icon: '⚔️',
  damage: 0, weight: 0, slots: 0, ammo: '', tier: 1,
  rarity: '', maps: [], spawns: [], desc: '', attachments: [],
}

const CATS: Category[] = ['weapons', 'gear', 'medical', 'food', 'tools']
const MAPS: DayZMap[] = ['Chernarus', 'Livonia', 'Sakhal']
const TIERS = [1, 2, 3, 4] as const
const ICONS = ['⚔️', '🔫', '🛡️', '⛑️', '🎒', '🧥', '🥽', '😷', '💉', '💊', '🩸', '🩹', '🧴', '🩺', '🥫', '🍶', '🪣', '🥤', '🥩', '🍚', '🔧', '🔪', '🧭', '🗺️', '🔭', '🧵', '🪓']

export default function AdminPanel() {
  const [items, setItems] = useState<Item[]>([...ITEMS])
  const [editing, setEditing] = useState<Item | null>(null)
  const [form, setForm] = useState<Omit<Item, 'id'>>(EMPTY_ITEM)
  const [spawnsInput, setSpawnsInput] = useState('')
  const [attachmentsInput, setAttachmentsInput] = useState('')
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'export'>('list')
  const [search, setSearch] = useState('')

  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))

  function startEdit(item: Item) {
    setEditing(item)
    setForm({ ...item })
    setSpawnsInput(item.spawns.join(', '))
    setAttachmentsInput((item.attachments || []).join(', '))
    setActiveTab('add')
  }

  function startNew() {
    setEditing(null)
    setForm(EMPTY_ITEM)
    setSpawnsInput('')
    setAttachmentsInput('')
    setActiveTab('add')
  }

  function handleSave() {
    const spawns = spawnsInput.split(',').map(s => s.trim()).filter(Boolean)
    const attachments = attachmentsInput.split(',').map(s => s.trim()).filter(Boolean)
    const newItem: Item = {
      ...form,
      id: editing ? editing.id : Math.max(...items.map(i => i.id)) + 1,
      spawns,
      attachments,
    }
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? newItem : i))
    } else {
      setItems(prev => [...prev, newItem])
    }
    setEditing(null)
    setForm(EMPTY_ITEM)
    setSpawnsInput('')
    setAttachmentsInput('')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setActiveTab('list')
  }

  function handleDelete(id: number) {
    if (confirm('Delete this item?')) {
      setItems(prev => prev.filter(i => i.id !== id))
    }
  }

  function toggleMap(m: DayZMap) {
    setForm(prev => ({
      ...prev,
      maps: prev.maps.includes(m) ? prev.maps.filter(x => x !== m) : [...prev.maps, m]
    }))
  }

  const exportCode = `export const ITEMS: Item[] = [\n${items.map(item => `  ${JSON.stringify(item)},`).join('\n')}\n];`

  const labelStyle = { fontSize: '10px', letterSpacing: '0.1em', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }
  const inputStyle = { width: '100%', background: 'var(--bg-primary)', border: '0.5px solid var(--border)', color: 'var(--text-primary)', padding: '8px 10px', fontSize: '12px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }
  const selectStyle = { ...inputStyle, cursor: 'pointer' }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header style={{ borderBottom: '0.5px solid var(--border)', background: 'var(--bg-secondary)', padding: '1rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em', textDecoration: 'none' }}>← DATABASE</Link>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.2em' }}>// RESTRICTED ACCESS //</div>
              <div style={{ fontSize: '22px', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#ef4444', letterSpacing: '0.08em' }}>ADMIN PANEL</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {saved && <span style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.08em' }}>✓ SAVED</span>}
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{items.length} items</span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem' }}>
          {(['list', 'add', 'export'] as const).map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); if (tab !== 'add') { setEditing(null); setForm(EMPTY_ITEM) } }}
              style={{
                background: activeTab === tab ? '#ef4444' : 'transparent',
                border: `0.5px solid ${activeTab === tab ? '#ef4444' : 'var(--border)'}`,
                color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
                padding: '6px 16px', fontSize: '11px', cursor: 'pointer',
                borderRadius: '4px', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)',
              }}>
              {tab === 'list' ? '// ITEM LIST' : tab === 'add' ? editing ? '// EDIT ITEM' : '// ADD ITEM' : '// EXPORT CODE'}
            </button>
          ))}
          {activeTab === 'list' && (
            <button onClick={startNew} style={{ marginLeft: 'auto', background: 'var(--accent)', border: 'none', color: '#0a0c0a', padding: '6px 16px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              + NEW ITEM
            </button>
          )}
        </div>

        {/* LIST TAB */}
        {activeTab === 'list' && (
          <div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search items..."
              style={{ ...inputStyle, marginBottom: '1rem' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {filtered.map(item => (
                <div key={item.id} style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '6px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{item.name}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{item.type} · {item.cat.toUpperCase()} · T{item.tier} · {item.rarity}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {item.maps.map(m => (
                      <span key={m} style={{ fontSize: '9px', padding: '2px 6px', border: '0.5px solid var(--border)', borderRadius: '3px', color: 'var(--text-muted)' }}>{m}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => startEdit(item)} style={{ background: 'transparent', border: '0.5px solid var(--border)', color: 'var(--accent-dim)', fontSize: '10px', padding: '4px 10px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>EDIT</button>
                    <button onClick={() => handleDelete(item.id)} style={{ background: 'transparent', border: '0.5px solid var(--border)', color: '#ef4444', fontSize: '10px', padding: '4px 10px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>DEL</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD/EDIT TAB */}
        {activeTab === 'add' && (
          <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>ITEM NAME *</label>
                <input style={inputStyle} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. AK-74" />
              </div>
              <div>
                <label style={labelStyle}>TYPE *</label>
                <input style={inputStyle} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} placeholder="e.g. Assault Rifle" />
              </div>
              <div>
                <label style={labelStyle}>CATEGORY *</label>
                <select style={selectStyle} value={form.cat} onChange={e => setForm(p => ({ ...p, cat: e.target.value as Category }))}>
                  {CATS.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>ICON</label>
                <select style={selectStyle} value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))}>
                  {ICONS.map(i => <option key={i} value={i}>{i} {i}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>TIER (1=Common, 4=Rare)</label>
                <select style={selectStyle} value={form.tier} onChange={e => setForm(p => ({ ...p, tier: Number(e.target.value) as 1|2|3|4 }))}>
                  {TIERS.map(t => <option key={t} value={t}>T{t}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>RARITY LABEL</label>
                <input style={inputStyle} value={form.rarity} onChange={e => setForm(p => ({ ...p, rarity: e.target.value }))} placeholder="e.g. Military, Common, Rare" />
              </div>
              <div>
                <label style={labelStyle}>WEIGHT (kg)</label>
                <input style={inputStyle} type="number" step="0.1" value={form.weight} onChange={e => setForm(p => ({ ...p, weight: parseFloat(e.target.value) || 0 }))} />
              </div>
              <div>
                <label style={labelStyle}>INVENTORY SLOTS</label>
                <input style={inputStyle} type="number" value={form.slots} onChange={e => setForm(p => ({ ...p, slots: parseInt(e.target.value) || 0 }))} />
              </div>
              {form.cat === 'weapons' && (
                <>
                  <div>
                    <label style={labelStyle}>DAMAGE (0-100)</label>
                    <input style={inputStyle} type="number" min="0" max="100" value={form.damage || 0} onChange={e => setForm(p => ({ ...p, damage: parseInt(e.target.value) || 0 }))} />
                  </div>
                  <div>
                    <label style={labelStyle}>AMMO TYPE</label>
                    <input style={inputStyle} value={form.ammo || ''} onChange={e => setForm(p => ({ ...p, ammo: e.target.value }))} placeholder="e.g. 7.62x39mm" />
                  </div>
                </>
              )}
              {form.cat === 'gear' && (
                <div>
                  <label style={labelStyle}>PROTECTION %</label>
                  <input style={inputStyle} type="number" min="0" max="100" value={form.protection || 0} onChange={e => setForm(p => ({ ...p, protection: parseInt(e.target.value) || 0 }))} />
                </div>
              )}
              {form.cat === 'medical' && (
                <div>
                  <label style={labelStyle}>EFFECT</label>
                  <input style={inputStyle} value={form.effect || ''} onChange={e => setForm(p => ({ ...p, effect: e.target.value }))} placeholder="e.g. Heals Fractures" />
                </div>
              )}
              {form.cat === 'food' && (
                <>
                  <div>
                    <label style={labelStyle}>CALORIES</label>
                    <input style={inputStyle} type="number" value={form.calories || 0} onChange={e => setForm(p => ({ ...p, calories: parseInt(e.target.value) || 0 }))} />
                  </div>
                  <div>
                    <label style={labelStyle}>WATER (ml)</label>
                    <input style={inputStyle} type="number" value={form.water || 0} onChange={e => setForm(p => ({ ...p, water: parseInt(e.target.value) || 0 }))} />
                  </div>
                </>
              )}
            </div>

            {/* Maps */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>AVAILABLE MAPS *</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {MAPS.map(m => (
                  <button key={m} onClick={() => toggleMap(m)}
                    style={{ padding: '6px 14px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', border: form.maps.includes(m) ? '1px solid var(--accent)' : '0.5px solid var(--border)', background: form.maps.includes(m) ? 'rgba(74,222,128,0.1)' : 'transparent', color: form.maps.includes(m) ? 'var(--accent)' : 'var(--text-muted)' }}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Spawns */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>SPAWN LOCATIONS (comma separated) *</label>
              <input style={inputStyle} value={spawnsInput} onChange={e => setSpawnsInput(e.target.value)} placeholder="e.g. Military, NWAF, Tisy Military" />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>DESCRIPTION *</label>
              <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} placeholder="Brief item description for players..." />
            </div>

            {/* Attachments */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>ATTACHMENTS (comma separated)</label>
              <input style={inputStyle} value={attachmentsInput} onChange={e => setAttachmentsInput(e.target.value)} placeholder="e.g. AK Suppressor, PU Scope, AKM 30Rnd Mag" />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleSave}
                style={{ background: 'var(--accent)', border: 'none', color: '#0a0c0a', padding: '10px 24px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {editing ? '✓ SAVE CHANGES' : '+ ADD ITEM'}
              </button>
              <button onClick={() => { setActiveTab('list'); setEditing(null); setForm(EMPTY_ITEM) }}
                style={{ background: 'transparent', border: '0.5px solid var(--border)', color: 'var(--text-muted)', padding: '10px 24px', fontSize: '12px', cursor: 'pointer', borderRadius: '4px', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
                CANCEL
              </button>
            </div>
          </div>
        )}

        {/* EXPORT TAB */}
        {activeTab === 'export' && (
          <div>
            <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
                After adding or editing items here, copy the generated code below and paste it into <code style={{ color: 'var(--accent)', fontSize: '11px' }}>src/data/items.ts</code> in your GitHub repo, replacing the existing <code style={{ color: 'var(--accent)', fontSize: '11px' }}>ITEMS</code> array. Vercel will auto-redeploy.
              </div>
              <button onClick={() => navigator.clipboard.writeText(exportCode)}
                style={{ background: 'var(--accent)', border: 'none', color: '#0a0c0a', padding: '8px 20px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                COPY TO CLIPBOARD
              </button>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '0.5px solid var(--border)', borderRadius: '8px', padding: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
              <pre style={{ fontSize: '10px', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>
                {exportCode}
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
