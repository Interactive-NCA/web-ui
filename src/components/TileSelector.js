import React from "react";
import styles from '../styles/TileSelector.module.css';

const TileSelector = ({ selectedTileType, onTileTypeSelect }) => {

  const tilesTypes = [0, 1, 2, 3, 4, 5, 6, 7]

  const setCursor = (tile) => {
    document.documentElement.style.cursor =
      tile === 0 ? `url('/cursors/grass.png') 12 12, auto` :
      tile === 1 ? `url('/cursors/wall.png') 12 12, auto` :
      tile === 2 ? `url('/cursors/zelda.png') 12 12, auto` :
      tile === 3 ? `url('/cursors/key.png') 12 12, auto` :
      tile === 4 ? `url('/cursors/door.png') 12 12, auto` :
      tile === 5 ? `url('/cursors/monster1.png') 12 12, auto` :
      tile === 6 ? `url('/cursors/monster2.png') 12 12, auto` :
      tile === 7 ? `url('/cursors/monster3.png') 12 12, auto` :
      `auto`;
  };

  return (
      <div className="flex pb-5 justify-center">
            {tilesTypes.map((tile, tileIndex) => (
                <div
                className={`mx-1 ${styles.tile} ${
                    tile === 0 ? styles.floor : 
                    tile === 1 ? styles.wall :
                    tile === 2 ? styles.zelda :
                    tile === 3 ? styles.key :
                    tile === 4 ? styles.door :
                    tile === 5 ? styles.monster1:
                    tile === 6 ? styles.monster2 :
                    tile === 7 ? styles.monster3 :
                    ''
                } ${selectedTileType === tile ? styles.selected : ""}`}
                key={`${tileIndex}`}
                onClick={() => {
                    onTileTypeSelect(tile);
                    setCursor(tile);
                }}
                />
            ))}
     </div>
  );
};

export default TileSelector;