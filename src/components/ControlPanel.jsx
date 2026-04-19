import { useState } from 'react';

const SQUARES = [4, 9, 16, 25, 36, 49, 64];

export default function ControlPanel({ onRun, onReset, running }) {
  const [p, setP] = useState(9);
  const [q, setQ] = useState(4);
  const [error, setError] = useState('');

  function validate() {
    if (!SQUARES.includes(Number(p))) {
      setError('p must be a perfect square: 4, 9, 16, 25, 36, 49, or 64.');
      return false;
    }
    if (Number(q) < 1 || Number(q) >= Number(p)) {
      setError(`q must be between 1 and ${p - 1}.`);
      return false;
    }
    setError('');
    return true;
  }

  function handleRun() {
    if (validate()) onRun(Number(p), Number(q));
  }

  function handleReset() {
    setP(9);
    setQ(4);
    setError('');
    onReset();
  }

  return (
    <div className="panel">
      <div className="panel-title">
        <span className="panel-icon">⚙️</span>
        Parameters
      </div>

      <div className="field">
        <label>Total Nodes (p)</label>
        <select value={p} onChange={e => setP(Number(e.target.value))}>
          {SQUARES.map(v => (
            <option key={v} value={v}>
              {v} → {Math.sqrt(v)} × {Math.sqrt(v)} mesh
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Shift Value (q)</label>
        <input
          type="number"
          min={1}
          max={p - 1}
          value={q}
          onChange={e => setQ(Number(e.target.value))}
        />
        <span className="hint">1 to {p - 1}</span>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <button className="btn-primary" onClick={handleRun} disabled={running}>
        {running ? '⏳ Running…' : '▶ Visualize'}
      </button>
      <button className="btn-secondary" onClick={handleReset} disabled={running}>
        ↺ Reset
      </button>
    </div>
  );
}
