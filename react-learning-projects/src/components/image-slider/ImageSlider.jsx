import styles from './Slider.module.css';
import { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

const ImageSlider = ({ url, limit = 5, page = 1 }) => {
  const [images, setImages] = useState([]);
  const [currSlider, setCurrSlider] = useState(0);
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
    <div className="cont">
      <BsArrowLeftCircleFill
        className={`${styles.arrow} ${styles.arrowLeft}`}
      />
      {images && images.length
        ? images.map((img) => (
            <img
              key={img.id}
              alt={img.download_url}
              src={img.download_url}
              className={styles.current_image}
            />
          ))
        : null}
      <BsArrowRightCircleFill
        className={`${styles.arrow} ${styles.arrowRight}`}
      />
      <span className='circle-indicators'>
        {
            images && images.length ?
            images.map((_, index) => <button key={index} className={styles.current_indicator}></button>)
            : null
        }
      </span>
    </div>
  );
};
export default ImageSlider;
