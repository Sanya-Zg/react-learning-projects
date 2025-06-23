import styles from './Slider.module.css';
import { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

const ImageSlider = ({ url, limit = 5, page = 1 }) => {
  const [images, setImages] = useState([]);
  const [currSlide, setCurrSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page={page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  }

  function handlePrevious() {
    setCurrSlide(currSlide === 0 ? images.length - 1 : currSlide - 1);
  }
  function handleNext() {
    setCurrSlide(currSlide === images.length - 1 ? 0 : currSlide + 1);
  }

  useEffect(() => {
    if (url !== '') fetchImages(url);
  }, [url]);

  console.log(images);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (errorMsg !== null) {
    return <div>Error {errorMsg}</div>;
  }
  return (
    <div className={styles.block}>
      <div className={styles.cont}>
        <BsArrowLeftCircleFill
          onClick={handlePrevious}
          className={`${styles.arrow} ${styles.arrowLeft}`}
        />
        {images && images.length
          ? images.map((img, index) => (
              <img
                key={img.id}
                alt={img.download_url}
                src={img.download_url}
                className={
                  currSlide === index
                    ? styles.current_image
                    : `${styles.current_image} ${styles.hide_current_image}`
                }
              />
            ))
          : null}
        <BsArrowRightCircleFill
          onClick={handleNext}
          className={`${styles.arrow} ${styles.arrowRight}`}
        />
        <span className={styles.circle_indicators}>
          {images && images.length
            ? images.map((_, index) => (
                <button
                  key={index}
                  className={
                    currSlide === index
                      ? styles.current_indicator
                      : `${styles.current_indicator} ${styles.inactive_indicator}`
                  }
                  onClick={() => setCurrSlide(index)}
                ></button>
              ))
            : null}
        </span>
      </div>
    </div>
  );
};
export default ImageSlider;
