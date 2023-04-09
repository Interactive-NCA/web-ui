import styles from '../styles/GameMap.module.css';

function StaticMap({ mapData }) {

    return (
        <div className={styles.map}>
        {mapData.map((row, rowIndex) => (
            <div className={styles.row} key={rowIndex}>
            {row.map((tile, tileIndex) => (
                <div
                className={`${styles.tile} ${
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
                />
            ))}
            </div>
        ))}
        </div>
    );
}

export default StaticMap;