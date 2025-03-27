import { useContext, useState, useEffect } from "react";
import EmojiCard from "./EmojiCard";
import { GameStatusContext } from "../App";
import FirstLoading from "./FirstLoading";
const MemoryCard = ({ selectedCards, matchedCards }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { emojiDataDuplicated,score, numberCards} = useContext(GameStatusContext);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); 
    return () => clearTimeout();
  }, []);
  // Constantes
  const status = (numberCards === 10 || Number(numberCards) === 20) ? true : false;

  const emojiMarkup = emojiDataDuplicated.map((emoji, index) => {
    const selectedCardEntry = selectedCards.find((emoji) => emoji.index === index);
    const matchedCardEntry = matchedCards.find((emoji) => emoji.index === index);
    
    return (
      <EmojiCard 
        key={index} 
        name={emoji.name} 
        index={index} 
        emoji={emoji} 
        selectedCardEntry={selectedCardEntry}
        matchedCardEntry={matchedCardEntry}
      />
    );
  });

  return (
    <>
      {isLoading ? (
        <FirstLoading />
      ) : emojiDataDuplicated.length > 0 ? (
       <><div className={`grid ${status ? 'grid-cols-5' : 'grid-cols-10'} gap-3`}>
          {emojiMarkup}
        </div>
        <h1 className="font-extrabold p-2 text-3xl rounded-2xl shadow-2xs shadow-fuchsia-500  bg-fuchsia-900 text-white">Your Chances : <span>{score}</span></h1>
       </> 
      ) : (
        <div>Error loading cards</div> // style this!
      )}
    </>
  );
};

export default MemoryCard;