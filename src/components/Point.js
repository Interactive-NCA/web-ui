import React from "react";
import styles from "../styles/Point.module.css";
import chroma from "chroma-js";

function Point({ path, symmetry, objective, minObj, maxObj, handlePointClick, selected }) {
  const pathValue = path;
  const symmetryValue = symmetry;
  const objectiveValue = objective;

  const colorScale = chroma.scale(['red', '#2A4858', '#008ae5'])

  const color = colorScale((objectiveValue - minObj) / (maxObj - minObj)).hex();

  const pointStyles = {
    "--point-bg-color": color,
  };

  const handleClick = () => {
    console.log(`Path Length: ${pathValue}, Symmetry: ${symmetryValue}, Objective Value: ${objectiveValue}`);
    console.log()
    handlePointClick(symmetryValue, pathValue);
  };

  return (
    <div className={`${styles.point} ${selected ? styles.selected : ""}`} style={pointStyles} onClick={handleClick}/>
  );
}

export default Point;