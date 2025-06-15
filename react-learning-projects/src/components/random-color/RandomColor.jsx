import { useEffect, useState } from "react";
import styles from "./RandomColor.module.css";

const RandomColor = () => {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#6BB69F");

  function randomColorUtility(len) {
    return Math.floor(Math.random() * len);
  }

  function createRandomHexColor() {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }
    setColor(hexColor);
  }
  function createRandomRgbColor() {
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);
    setColor(`rgb(${r}, ${g}, ${b})`);
  }

  useEffect(() => {
    if (typeOfColor === 'rgb') {
        createRandomRgbColor();
    } else {
        createRandomHexColor();
    }
  }, [typeOfColor])

  return (
    <div className={styles.cont} style={{ backgroundColor: color }}>
      <div className={styles.buttons_block}>
        <button
          onClick={() => setTypeOfColor("hex")}
          className={styles.hex}
          style={{ color: typeOfColor === "hex" ? color : "" }}
        >
          Create HEX Color
        </button>
        <button
          onClick={
            typeOfColor === "hex" ? createRandomHexColor : createRandomRgbColor
          }
        >
          Generate random Color
        </button>
        <button
          onClick={() => setTypeOfColor("rgb")}
          className={styles.rgb}
          style={{ color: typeOfColor === "hex" ? '' : color }}
        >
          Create RGB Color
        </button>
      </div>
      <div className={styles.color_name_block}>
        <h2>{typeOfColor === 'hex' ? 'HEX Color' : 'RGB Color' }</h2>
        <p>{color}</p>
      </div>
    </div>
  );
};

export default RandomColor;
