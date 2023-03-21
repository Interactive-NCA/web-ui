import React from "react";
import Point from "./Point";
import styles from "../styles/Archive.module.css";

function Archive( {paths, symmetries, objectives, handlePointClick, currSymmetry, currPath } ) {
  const path = paths.slice(200, 230);
  const symmetry = symmetries.slice(200, 230);
  const objective_value = objectives.slice(200,230);

  const pathSorted = Array.from(new Set(path)).sort();
  const symmetrySorted = Array.from(new Set(symmetry)).sort();
  const minObj = Math.min(...objective_value);
  const maxObj = Math.max(...objective_value);
  var grid = [];
  var points = [];

  for (let i = 0; i < path.length; i++) {
    points.push([path[i], symmetry[i], objective_value[i]])
  }

  for (let i = 0; i < pathSorted.length; i++) {
    const row = [];
    for (let j = 0; j < symmetrySorted.length; j++) {
        row.push([null,null, null]);
      }
    grid.push(row);
    }

  points.forEach(point => {
    var x = pathSorted.indexOf(point[0])
    var y = symmetrySorted.indexOf(point[1])
    grid[x][y] = point;
  });

  return (
    <div>
      <div className={styles.grid}>
        {grid.map((row, rowIndex) => (
          <div key={row} className={styles.row}>
            {row.map((point, colIndex) => { 
              if (point[0] == currPath && point[1] == currSymmetry) {
                return <Point key={colIndex} symmetry={point[1]} path={point[0]} objective={point[2]} minObj={minObj} maxObj={maxObj} handlePointClick={handlePointClick} selected={true}/>
              } else if (point[2] != null) {
                return <Point key={colIndex} symmetry={point[1]} path={point[0]} objective={point[2]} minObj={minObj} maxObj={maxObj} handlePointClick={handlePointClick} selected={false}/>
              }
              else {
                return <div key={colIndex} className={styles.empty}/>
              }
            })}
          </div>
        )).reverse()}
      </div>
    </div>
  );
}

export default Archive;
