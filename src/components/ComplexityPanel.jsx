export default function ComplexityPanel({ p, q }) {
  if (!p || !q) return null;

  const n = Math.sqrt(p);
  const rowShift = q % n;
  const colShift = Math.floor(q / n);
  const ring = Math.min(q, p - q);
  const mesh = rowShift + colShift;
  const max = Math.max(ring, mesh, 1);

  const ringPct = Math.round((ring / max) * 100);
  const meshPct = Math.round((mesh / max) * 100);

  return (
    <div className="panel">
      <div className="panel-title">
        <span className="panel-icon">📊</span>
        Complexity
      </div>

      <div className="stat-grid">
        <div className="stat-box">
          <span className="stat-label">Row Shift</span>
          <span className="stat-val amber">{rowShift}</span>
          <span className="stat-formula">q mod √p</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Col Shift</span>
          <span className="stat-val violet">{colShift}</span>
          <span className="stat-formula">⌊q / √p⌋</span>
        </div>
      </div>

      <div className="compare-section">
        <div className="compare-row">
          <span className="compare-label">Ring</span>
          <div className="bar-track">
            <div className="bar-fill bar-ring" style={{ width: `${ringPct}%` }} />
          </div>
          <span className="compare-num">{ring}</span>
        </div>
        <div className="compare-formula">min(q, p − q)</div>

        <div className="compare-row" style={{ marginTop: '10px' }}>
          <span className="compare-label">Mesh</span>
          <div className="bar-track">
            <div className="bar-fill bar-mesh" style={{ width: `${meshPct}%` }} />
          </div>
          <span className="compare-num">{mesh}</span>
        </div>
        <div className="compare-formula">(q mod √p) + ⌊q / √p⌋</div>
      </div>

      <div className="verdict">
        ✅ Mesh steps: <strong>{mesh}</strong> &nbsp;|&nbsp; Ring steps: <strong>{ring}</strong>
        <br />
        <span>Mesh is more efficient than ring</span>
      </div>
    </div>
  );
}
