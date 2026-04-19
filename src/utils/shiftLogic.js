export function generateInitialGrid(p) {
  return Array.from({ length: p }, (_, i) => i);
}

export function performRowShift(grid, n, rowShift) {
  const result = [...grid];
  for (let r = 0; r < n; r++) {
    const row = grid.slice(r * n, r * n + n);
    for (let c = 0; c < n; c++) {
      result[r * n + ((c + rowShift) % n)] = row[c];
    }
  }
  return result;
}

export function performColumnShift(grid, n, colShift) {
  const result = [...grid];
  for (let c = 0; c < n; c++) {
    const col = Array.from({ length: n }, (_, r) => grid[r * n + c]);
    for (let r = 0; r < n; r++) {
      result[((r + colShift) % n) * n + c] = col[r];
    }
  }
  return result;
}
