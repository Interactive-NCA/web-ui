import React from "react";
import styles from '../styles/TileSelector.module.css';

const TileSelector = ({ selectedTileType, onTileTypeSelect }) => {

  const tilesTypes = [0, 1, 2, 3, 4, 5, 6]

  return (
      <div className="flex pb-5 justify-center">
            {tilesTypes.map((tile, tileIndex) => (
                <div
                className={`mx-1 ${styles.tile} ${
                    tile === 0 ? styles.wall : 
                    tile === 1 ? styles.floor :
                    tile === 2 ? styles.zelda :
                    tile === 3 ? styles.key :
                    tile === 4 ? styles.door :
                    tile === 5 ? styles.monster1:
                    tile === 6 ? styles.monster2 :
                    ''
                } ${selectedTileType === tile ? styles.selected : ""}`}
                key={`${tileIndex}`}
                onClick={() => onTileTypeSelect(tile)}
                />
            ))}
     </div>
  );
};

export default TileSelector;