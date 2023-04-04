import styles from '../styles/AuxMap.module.css';
import chroma from "chroma-js";

function AuxMap({ auxData }) {

    //const colorScale = chroma.scale(['red', '#2A4858', '#008ae5'])
    //const colorScale = chroma.cubehelix();//chroma.scale();
    //const colorScale = chroma.scale(['#fafa6e','#2A4858'])

    const colorScale = chroma.scale(['yellow', 'lightgreen', '#008ae5'])


    let min = auxData[0][0];
    let max = auxData[0][0];

    for (let i = 0; i < auxData.length; i++) {
      for (let j = 0; j < auxData[i].length; j++) {
        if (auxData[i][j] < min) {
          min = auxData[i][j];
        }
        if (auxData[i][j] > max) {
          max = auxData[i][j];
        }
      }
    }

    const calculateColor = (tileType) => {
        return {"--point-bg-color": colorScale((tileType - min) / (max - min)).hex()}
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