
import Accordion from './components/accordion/Accordion'
import List_checkbox from './components/list-checkboxes/List_checkbox'
import RandomColor from './components/random-color/RandomColor'
import StarRating from './components/star-rating/StarRating'

function App() {

  return (
    <>
      {/* <Accordion />
      <List_checkbox />
      <RandomColor /> */}
      <StarRating numStars={10}/>
    </>
  )
}

export default App
