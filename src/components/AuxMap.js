import styles from '../styles/AuxMap.module.css';
import chroma from "chroma-js";

function AuxMap({ auxData, minValue, maxValue }) {

    // const colorScale = chroma.scale(['yellow', 'lightgreen', '#008ae5'])
    const colorScale = chroma.scale(['#00a8cc', '#7b2cbf'])

    const calculateColor = (tileType) => {
        return {"--point-bg-color": colorScale((tileType - minValue) / (maxValue - minValue)).hex()}
    }

    return (
        <div className={styles.map}>
        {auxData.map((row, rowIndex) => (
            <div className={styles.row} key={rowIndex}>
            {row.map((tile, tileIndex) => (
                <div
                className={`${styles.tile}`}
                style={calculateColor(tile)}
                key={`${rowIndex}-${tileIndex}`}
                />
            ))}
            </div>
        ))}
        </div>
    );
}

export default AuxMap;