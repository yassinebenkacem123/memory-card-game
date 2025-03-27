import { useState, createContext,useRef, useEffect} from "react"
import Form from "./components/Form";
import MemoryCard from "./components/MemoryCard";
import GameOver from "./components/GameOver";
const GameStatusContext = createContext();
  //Variables :
const App = () => {
  const initailFormData = {
    category:'animals-and-nature',
    number:10
  }
  //States (HOOKS):
  const [gameStatus,setGameStatus] = useState(false);
  const [emojiDataDuplicated,setEmojiDataDuplicated] = useState([]);
  const [selectedCards,setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [formData,setFormData] = useState(initailFormData);
  let ref = useRef(true);
  //Functions :
  const [score, setScore] = useState(Math.floor(formData.number/2));

  //HOOKS:
  useEffect(()=>{
    setScore(Math.floor(formData.number/2))
  },[formData.number])
  useEffect(()=>{
    if(selectedCards.length === 2 && (selectedCards[0].name != selectedCards[1].name))
    {
      setScore(prevScore=>prevScore-1)
    }
  },[selectedCards]);
  useEffect(()=>{
    if(score === 0)
    {
      setIsGameOver(true)
    }
  },[score])
  useEffect(()=>{
    // to stop the code which is inside the else statement to run in the first  render of the page.
    if(ref.current){
      ref.current = false;
    }else{
      if((selectedCards.length === 2) && (selectedCards[0].name === selectedCards[1].name)){
        setMatchedCards(prevMatchedCards => [...prevMatchedCards, selectedCards[0],selectedCards[1]])
      }
    }
  },[selectedCards]);

  useEffect(()=>{
    if(ref.current)
    {
      ref.current = false;
    }else{
      if(emojiDataDuplicated.length && (matchedCards.length === emojiDataDuplicated.length))
      {
        setIsGameOver(true);
      }
    }
  },[matchedCards]);
  // => Handle form change 
  function handleFormChange(event){
    const {name, value} = event.target;
    setFormData(prevFormData=>({
      ...prevFormData,
      [name]:value
    }))
  }
  //=> Function to shuffle the cards
  const shuffleData = (array)=>{
    let newArray = [...array];
    for(let i = array.length ; i > 0 ; i-- ){
      const randomNbr = Math.floor(Math.random()*(i+1));
      [newArray[i - 1], newArray[randomNbr]] = [newArray[randomNbr], newArray[i - 1]];

    }
    return newArray;
  }
  //**************************************** */
  function emojiClicked(index, name)
  {
    const selectedCardEntry = selectedCards.find((selectedCard=>selectedCard.index === index))
    if(!selectedCardEntry && selectedCards.length < 2)
    {
      setSelectedCards(prevSelectedCards=>[...prevSelectedCards,{index,name}])
    }else if(!selectedCardEntry && selectedCards.length === 2)
    {
      setSelectedCards([{index,name}]);
    }
  }
  //**************************************** */
  function resetGame()
  {
    setGameStatus(false);
    setIsGameOver(false);
    setMatchedCards([]);
    setSelectedCards([]);
    setScore(Math.floor(formData.number/2))
    setFormData(initailFormData)
  }
  //**************************************** */

  function randomIndices(){
    let min = 0
    let max = 0
    while(true)
    {
      min = Math.floor(Math.random()*100)
      max = Math.floor(Math.random()*100)
      if (min <= 100 && max <= 100 && min < max && max-min===(formData.number/2))
      {
        break
      }
    }
    return [min,max] 
  }
  //**************************************** */
  function fetchData()
  {
    const [min,max] = randomIndices();
    fetch(`https://emojihub.yurace.pro/api/all/category/${formData.category}`)
    .then(res => res.json())
    .then(data => setEmojiDataDuplicated(
      shuffleData(data.slice(min,max).
      concat(data.slice(min,max)))
    )).catch((err)=>console.log(err))
  }
  return (
  <GameStatusContext.Provider value={{
  gameStatus,
  setGameStatus,
  fetchData,
  emojiClicked,
  setIsGameOver,
  score,
  emojiDataDuplicated,
  numberCards:formData.number,
  }} >
    <main className="bg-main bg cover bg-no-repeat  flex flex-col w-full gap-3 justify-center items-center h-screen ">
    <h1 
  className="font-extrabold text-center text-5xl relative bottom-10
             bg-gradient-to-r from-white via-fuchsia-500 p-2 to-blue-400 
             bg-clip-text text-transparent 
             animate-gradient-shift">
            Memory Game 🎴 
    </h1>
      {isGameOver && <GameOver handleClick={resetGame}/>}
      {gameStatus?
      <MemoryCard 
       selectedCards={selectedCards} 
       matchedCards={matchedCards}/>:<Form handleChange={handleFormChange}/>}
    </main>

  </GameStatusContext.Provider>    
  )
}

export default App
export {GameStatusContext}