import { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import MeshGrid from './components/MeshGrid';
import ComplexityPanel from './components/ComplexityPanel';
import { generateInitialGrid, performRowShift, performColumnShift } from './utils/shiftLogic';
import './App.css';

export default function App() {
  const [grids, setGrids] = useState(null);
  const [stage, setStage] = useState('before');
  const [running, setRunning] = useState(false);
  const [params, setParams] = useState(null);

  function handleRun(p, q) {
    const n = Math.sqrt(p);
    const initial = generateInitialGrid(p);
    const afterRow = performRowShift(initial, n, q % n);
    const final = performColumnShift(afterRow, n, Math.floor(q / n));

    setGrids({ initial, afterRow, final });
    setParams({ p, q, n });
    setStage('before');
    setRunning(true);

    setTimeout(() => setStage('after-row'), 1000);
    setTimeout(() => {
      setStage('final');
      setRunning(false);
    }, 2200);
  }

  function handleReset() {
    setGrids(null);
    setStage('before');
    setParams(null);
    setRunning(false);
  }

  function currentGrid() {
    if (!grids) return null;
    if (stage === 'before')    return grids.initial;
    if (stage === 'after-row') return grids.afterRow;
    return grids.final;
  }

  return (
    <div className="app">
      <div className="sidebar">
        <div className="logo">
          <span className="logo-icon">⬡</span>
          <div>
            <div className="logo-title">MeshShift</div>
            <div className="logo-sub">Circular Q-Shift v2</div>
          </div>
        </div>
        <ControlPanel onRun={handleRun} onReset={handleReset} running={running} />
        <ComplexityPanel p={params?.p} q={params?.q} />
      </div>

      <div className="main">
        <div className="topbar">
          <h1>Mesh Circular Shift Visualizer</h1>
          {params && (
            <div className="topbar-badges">
              <span className="badge">p = {params.p}</span>
              <span className="badge">q = {params.q}</span>
              <span className="badge">n = {params.n}</span>
            </div>
          )}
        </div>

        <div className="content">
          {!grids && (
            <div className="empty-state">
              <div className="empty-icon">⬡</div>
              <p>Configure parameters on the left and click <strong>Visualize</strong> to start.</p>
            </div>
          )}

          {grids && (
            <>
              <div className="stepper">
                <div className={`step ${stage === 'before' ? 'step-active-default' : ''}`}>
                  <span className="step-num">1</span> Before
                </div>
                <div className="step-line" />
                <div className={`step ${stage === 'after-row' ? 'step-active-row' : ''}`}>
                  <span className="step-num">2</span> Row Shift →
                </div>
                <div className="step-line" />
                <div className={`step ${stage === 'final' ? 'step-active-final' : ''}`}>
                  <span className="step-num">3</span> Col Shift ↓
                </div>
              </div>

              <MeshGrid grid={currentGrid()} n={params.n} stage={stage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
