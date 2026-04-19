function getStageInfo(stage) {
  if (stage === 'before')    return { label: 'Initial State', sub: 'No shift applied yet' };
  if (stage === 'after-row') return { label: 'After Row Shift →', sub: 'Each row shifted right' };
  if (stage === 'final')     return { label: 'After Column Shift ↓', sub: 'Final state — shift complete' };
  return { label: '', sub: '' };
}

function getCellClass(stage) {
  if (stage === 'after-row') return 'cell cell-row';
  if (stage === 'final')     return 'cell cell-final';
  return 'cell cell-default';
}

export default function MeshGrid({ grid, n, stage }) {
  const { label, sub } = getStageInfo(stage);

  return (
    <div className="grid-section">
      <div className="grid-header">
        <span className="grid-label">{label}</span>
        <span className="grid-sub">{sub}</span>
      </div>
      <div
        className="mesh-grid"
        style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
      >
        {grid.map((value, index) => (
          <div key={index} className={getCellClass(stage)}>
            <span className="cell-val">{value}</span>
            <span className="cell-idx">idx {index}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
