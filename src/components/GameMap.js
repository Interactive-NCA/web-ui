import React, { useState } from 'react';

import styles from '../styles/GameMap.module.css';

function GameMap({ mapData, onMapChange, selectedTileType }) {
    const [map, setMap] = useState(mapData);

    const handleTileChange = (rowIndex, tileIndex, tileType) => {
        const newMap = [...map];
        newMap[rowIndex][tileIndex] = tileType;
        setMap(newMap);
        onMapChange(newMap);
      };

      const handleTileMouseDown = (event, rowIndex, tileIndex) => {
        handleTileChange(rowIndex, tileIndex, selectedTileType);
        event.preventDefault();
      };
    
      const handleTileMouseOver = (event, rowIndex, tileIndex) => {
        if (event.buttons === 1) {
          handleTileChange(rowIndex, tileIndex, selectedTileType);
        }
      };

    const handleClick = (rowIndex, tileIndex) => {
        const newMap = [...map];
        newMap[rowIndex][tileIndex] = newMap[rowIndex][tileIndex] = selectedTileType//=== 0 ? 1 : 0;
        setMap(newMap);
        onMapChange(newMap);
    };
  
    return (
        <div className={styles.map}>
        {mapData.map((row, rowIndex) => (
            <div className={styles.row} key={rowIndex}>
            {row.map((tile, tileIndex) => (
                <div
                className={`${styles.tile} ${
                    tile === 0 ? styles.wall : 
                    tile === 1 ? styles.floor :
                    tile === 2 ? styles.zelda :
                    tile === 3 ? styles.key :
                    tile === 4 ? styles.door :
                    tile === 5 ? styles.monster1:
                    tile === 6 ? styles.monster2 :
                    ''
                }`}
                key={`${rowIndex}-${tileIndex}`}
                onMouseDown={(event) =>
                    handleTileMouseDown(event, rowIndex, tileIndex)
                  }
                  onMouseOver={(event) =>
                    handleTileMouseOver(event, rowIndex, tileIndex)
                  }
                />
            ))}
            </div>
        ))}
        </div>
    );
}

export default GameMap;
