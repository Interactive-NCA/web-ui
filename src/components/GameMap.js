import React, { useState } from 'react';

import styles from '../styles/GameMap.module.css';

function GameMap({ mapData, onMapChange }) {
    const [map, setMap] = useState(mapData);

    const handleClick = (rowIndex, tileIndex) => {
        const newMap = [...map];
        newMap[rowIndex][tileIndex] = newMap[rowIndex][tileIndex] === 0 ? 1 : 0;
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
                onClick={() => handleClick(rowIndex, tileIndex)}
                />
            ))}
            </div>
        ))}
        </div>
    );
}

export default GameMap;
