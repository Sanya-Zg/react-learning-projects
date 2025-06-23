import Accordion from './components/accordion/Accordion';
import List_checkbox from './components/list-checkboxes/List_checkbox';
import RandomColor from './components/random-color/RandomColor';
import StarRating from './components/star-rating/StarRating';
import ImageSlider from './components/image-slider/ImageSlider';

function App() {
  return (
    <>
      <Accordion />
      <List_checkbox />
      <RandomColor />
      <StarRating numStars={10}/>
      <ImageSlider url={'https://picsum.photos/v2/list'} limit={'10'} page={1} />
    </>
  );
}

export default App;
