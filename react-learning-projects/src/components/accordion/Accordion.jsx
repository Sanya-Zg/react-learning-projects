import { useState } from "react";
import data from "./data";
import styles from './Accordion.module.css';

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [multiSelection, setMultiSelection] = useState(false);
  const [multiples, setMultiples] = useState([]);

  // Function to handle single selection of an element in an accordion.
  // If you click on an already selected element, it closes (selected = null).
  // If you click on another, a new one opens and the previous one closes.
  function handleSingleSelection(currId) {
    setSelected(currId === selected ? null : currId);
  }

  // Handling multiple selection of accordion items.
  // If the item is already selected, remove it from the array.
  // If not selected, add it to the selected array.
  function handleMultiSelection(currId) {
    setMultiples((prevMultiples) => {
    if (prevMultiples.includes(currId)) {
      // if it already exists, we delete it
      return prevMultiples.filter(id => id !== currId);
    } else {
      // if not, add it
      return [...prevMultiples, currId];
    }
  });
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={() => setMultiSelection(!multiSelection)}>
        Multi Selector
      </button>
      <div className={styles.accordion}>
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className={styles.item} key={dataItem.id}>
              <div
                className={styles.title}
                onClick={
                  multiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {/* {multiSelection
                ? multiples.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )} */}
              {selected === dataItem.id || multiples.indexOf(dataItem.id) !== -1 ? (
                <div className={styles.content}>{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}
