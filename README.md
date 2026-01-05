# Pathfinding Visualizer

A grid-based implementation of Dijkstra's Algorithm. This project visualizes how BFS-based search patterns expand to find the shortest path between two points while avoiding user-defined obstacles.



## Why I Built This
To move beyond linear arrays and experiment with graph theory fundamentals. This project required managing a 2D coordinate system and implementing a priority-queue-like logic for node exploration.

## Technical Highlights
- **Weighted Search Logic**: Implemented Dijkstra's algorithm to calculate node distances dynamically.
- **Interactive UI**: Users can draw "Walls" in real-time, forcing the algorithm to recalculate its path around barriers.
- **Asynchronous Animations**: Managed CSS keyframe triggers via JavaScript to visualize the search frontier without blocking the main thread.

## Usage
1. Open `index.html`.
2. Use your mouse to draw walls on the grid.
3. Click **Start Dijkstra** to watch the algorithm explore nodes and backtrack the shortest route.
