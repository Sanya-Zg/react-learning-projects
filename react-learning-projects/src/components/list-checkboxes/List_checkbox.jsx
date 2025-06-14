import { useState, useEffect } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import styles from './List.module.css';

const List_checkbox = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: "One half pound bag",
    },
    {
      id: 2,
      checked: false,
      item: "ITEM 2",
    },
    {
      id: 3,
      checked: false,
      item: "ITEM 3",
    },
  ]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('shoppingLists'));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);
  
  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked } : item);
    setItems(listItems);
    localStorage.setItem('shoppingLists', JSON.stringify(listItems))
  }
  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem('shoppingLists', JSON.stringify(listItems));
  }
  
  return (
    <div className={styles.cont}>
      {items.length ? (
      <ul>
        {items.map((item) => (
          <li className={[styles.item, (item.checked) ? styles.active : ''].join(' ')} key={item.id}>
            <input type="checkbox" checked={item.checked} onChange={() => handleCheck(item.id)}/>
            <label onDoubleClick={() => handleCheck(item.id)}>{item.item}</label>
            <FaTrashAlt onClick={() => handleDelete(item.id)} role="button" tabIndex='0'/>
          </li>
        ))}
      </ul>
      ):(
        <p className={styles.par}>Your list is empty!</p>
      )}
    </div>
  );
};

export default List_checkbox;
