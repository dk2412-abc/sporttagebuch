import React, { useMemo, useState } from 'react'
import { Activity, CalendarDays, Clock3, Download, Dumbbell, Plus, Share, Trash2, X } from 'lucide-react'

const STORAGE_KEY = 'sporttagebuch'

export default function App() {
  const [sport, setSport] = useState('Laufen')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [duration, setDuration] = useState(45)
  const [note, setNote] = useState('')
  const [showInstall, setShowInstall] = useState(() => {
    const standalone = window.matchMedia?.('(display-mode: standalone)')?.matches || window.navigator.standalone === true
    const isiOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent)
    return isiOS && !standalone && localStorage.getItem('installHinweisGeschlossen') !== '1'
  })
  const [entries, setEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
  })

  const saveEntries = (next) => {
    setEntries(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const addEntry = (event) => {
    event.preventDefault()
    if (!sport || !date) return
    saveEntries([{ id: crypto.randomUUID(), sport, date, duration: Number(duration) || 0, note: note.trim() }, ...entries])
    setNote('')
  }

  const removeEntry = (id) => saveEntries(entries.filter((entry) => entry.id !== id))
  const closeInstall = () => {
    localStorage.setItem('installHinweisGeschlossen', '1')
    setShowInstall(false)
  }
  const totalMinutes = useMemo(() => entries.reduce((sum, entry) => sum + (Number(entry.duration) || 0), 0), [entries])

  return <main className="app-shell">
    <div className="container">
      <header>
        <div className="logo"><Dumbbell size={25}/></div>
        <h1>Sporttagebuch</h1>
        <p>Schnell eintragen. Lokal gespeichert. Kein Konto nötig.</p>
      </header>

      {showInstall && <section className="install-card">
        <button className="close" onClick={closeInstall} aria-label="Hinweis schließen"><X size={18}/></button>
        <Download className="accent" size={23}/>
        <div><strong>Auf dem iPhone installieren</strong><p>In Safari auf <span><Share size={15}/> Teilen</span> tippen, dann <b>„Zum Home-Bildschirm“</b> und <b>„Hinzufügen“</b> wählen.</p></div>
      </section>}

      <section className="stats">
        <article><Activity className="accent" size={21}/><b>{entries.length}</b><small>Aktivitäten</small></article>
        <article><Clock3 className="blue" size={21}/><b>{totalMinutes}</b><small>Minuten gesamt</small></article>
      </section>

      <form onSubmit={addEntry} className="card">
        <h2>Neue Aktivität</h2>
        <label>Sportart<select value={sport} onChange={e => setSport(e.target.value)}><option>Laufen</option><option>Radfahren</option><option>Krafttraining</option><option>Schwimmen</option><option>Wandern</option><option>Fußball</option><option>Sonstiges</option></select></label>
        <div className="grid">
          <label>Datum<input type="date" value={date} onChange={e => setDate(e.target.value)}/></label>
          <label>Dauer (min)<input type="number" min="0" inputMode="numeric" value={duration} onChange={e => setDuration(e.target.value)}/></label>
        </div>
        <label>Notiz (optional)<textarea rows="2" value={note} onChange={e => setNote(e.target.value)} placeholder="z. B. lockerer Lauf"/></label>
        <button className="save"><Plus size={20}/> Speichern</button>
      </form>

      <section className="history">
        <div className="history-head"><h2>Verlauf</h2><small>lokal gespeichert</small></div>
        {entries.length === 0 ? <div className="empty">Noch keine Aktivität eingetragen.</div> : entries.map(entry => <article className="entry" key={entry.id}>
          <div><strong>{entry.sport}</strong><div className="meta"><span><CalendarDays size={13}/>{new Date(entry.date + 'T12:00:00').toLocaleDateString('de-DE')}</span><span>{entry.duration} min</span></div>{entry.note && <p>{entry.note}</p>}</div>
          <button onClick={() => removeEntry(entry.id)} aria-label="Eintrag löschen"><Trash2 size={18}/></button>
        </article>)}
      </section>
    </div>
  </main>
}
