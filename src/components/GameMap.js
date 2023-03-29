import styles from '../styles/GameMap.module.css';

function GameMap({ mapData, binaryData, onMapChange, onBinaryChange, selectedTileType }) {

    const handleTileChange = (rowIndex, tileIndex, tileType) => {
        const newMap = [...mapData];
        const newBinary = [...binaryData]
        newMap[rowIndex][tileIndex] = tileType;
        onMapChange(newMap);
        if (tileType === 0) {
          // ----> Floor tile = no fixed tile 
          newBinary[rowIndex][tileIndex] = 0;
        } else {
          newBinary[rowIndex][tileIndex] = 1;
        }
        onBinaryChange(newBinary)
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

    return (
        <div className={styles.map}>
        {mapData.map((row, rowIndex) => (
            <div className={styles.row} key={rowIndex}>
            {row.map((tile, tileIndex) => (
                <div
                className={`${binaryData[rowIndex][tileIndex] == 1 ? styles.binaryTile : styles.tile} ${
                    tile === 0 ? styles.floor : 
                    tile === 1 ? styles.wall :
                    tile === 2 ? styles.zelda :
                    tile === 3 ? styles.key :
                    tile === 4 ? styles.door :
                    tile === 5 ? styles.monster1:
                    tile === 6 ? styles.monster2 :
                    tile === 7 ? styles.monster3 :
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
