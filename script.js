const gridContainer = document.getElementById('grid-container');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

const ROWS = 20;
const COLS = 30;
let grid = [];
let isMouseDown = false;

// Initialize Grid
function createGrid() {
    gridContainer.innerHTML = '';
    grid = [];
    for (let r = 0; r < ROWS; r++) {
        let row = [];
        for (let c = 0; c < COLS; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.onmousedown = () => { isMouseDown = true; toggleWall(r, c); };
            cell.onmouseenter = () => { if (isMouseDown) toggleWall(r, c); };
            cell.onmouseup = () => isMouseDown = false;
            
            gridContainer.appendChild(cell);
            row.push({ r, c, element: cell, isWall: false, distance: Infinity, parent: null });
        }
        grid.push(row);
    }
    // Set default Start and Target
    grid[5][5].isStart = true; grid[5][5].element.classList.add('start');
    grid[15][25].isTarget = true; grid[15][25].element.classList.add('target');
}

function toggleWall(r, c) {
    if (grid[r][c].isStart || grid[r][c].isTarget) return;
    grid[r][c].isWall = !grid[r][c].isWall;
    grid[r][c].element.classList.toggle('wall');
}

async function dijkstra() {
    const startNode = grid[5][5];
    const targetNode = grid[15][25];
    startNode.distance = 0;
    
    let unvisited = grid.flat();
    
    while (unvisited.length > 0) {
        unvisited.sort((a, b) => a.distance - b.distance);
        const closest = unvisited.shift();
        
        if (closest.isWall) continue;
        if (closest.distance === Infinity) break;
        
        closest.element.classList.add('visited');
        if (closest === targetNode) return drawPath(targetNode);
        
        await new Promise(r => setTimeout(r, 10));
        
        const neighbors = getNeighbors(closest);
        for (let neighbor of neighbors) {
            let newDist = closest.distance + 1;
            if (newDist < neighbor.distance) {
                neighbor.distance = newDist;
                neighbor.parent = closest;
            }
        }
    }
}

function getNeighbors(node) {
    const neighbors = [];
    const { r, c } = node;
    if (r > 0) neighbors.push(grid[r-1][c]);
    if (r < ROWS - 1) neighbors.push(grid[r+1][c]);
    if (c > 0) neighbors.push(grid[r][c-1]);
    if (c < COLS - 1) neighbors.push(grid[r][c+1]);
    return neighbors.filter(n => !n.isWall);
}

async function drawPath(node) {
    let curr = node;
    while (curr) {
        curr.element.classList.add('path');
        curr = curr.parent;
        await new Promise(r => setTimeout(r, 30));
    }
}

resetBtn.onclick = createGrid;
startBtn.onclick = dijkstra;
createGrid();
