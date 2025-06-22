import { useState } from 'react';
import styles from './Rating.module.css';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ numStars = 5 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(currIndex) {
    setRating(currIndex);
  }
  function handleMouseEnter(currIndex) {
    setHover(currIndex);
  }
  function handleMouseLeave() {
    setHover(rating);
  }
  const test = 'testing text';

  return (
    <div className={styles.cont}>
      {[...Array(numStars)].map((_, index) => {
        index += 1;

        return (
          <FaStar
            key={index}
            className={
              index <= (hover || rating) ? styles.active : styles.unactive
            }
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
            size={40}
          />
        );
      })}
    </div>
  );
};

export default StarRating;


