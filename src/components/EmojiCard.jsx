import { decodeEntity } from "html-entities";
import { useContext } from "react";
import { GameStatusContext } from "../App";

const EmojiCard = ({ emoji, name, index, selectedCardEntry, matchedCardEntry }) => {
  const { emojiClicked } = useContext(GameStatusContext);
  const isFlipped = selectedCardEntry || matchedCardEntry;
  //Enhancing the memory card accessibility :
  const btnAria = matchedCardEntry? `${decodeEntity(emoji.name)} matched`:
  selectedCardEntry?`${decodeEntity(emoji.name)} Not matched yet`:'Card upside down';

  return (
    <button
      aria-label={`Card Position ${index+1}: ${btnAria}`}
      aria-live='polite'
      className={`
        border-[1.5px]
        border-white
        w-[120px] h-[120px]
        rounded-xl 
        cursor-pointer
        text-2xl
        flex items-center justify-center
        perspective-1000
        transition-transform duration-500 ease-in-out
        ${isFlipped ? "rotate-y-180" : ""}
      `}
      onClick={() => emojiClicked(index, name)}
      disabled={matchedCardEntry}
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden"
      }}
    >
      <div
        className={`
          absolute w-full h-full flex items-center justify-center
          rounded-xl
          bg-gradient-to-r from-fuchsia-800 to-fuchsia-500
          hover:from-fuchsia-500 hover:to-fuchsia-400
          
          text-white
          text-2xl
          font-bold
          bg-cover
          bg-center 
          bg-no-repeat
          transition-opacity duration-300
          ${isFlipped ? "opacity-0" : "opacity-60"}
        `}
      >
        <div>
          <div>▲</div>
          <div>▼</div>
        </div>
      </div>

      <div
        className={`
          absolute w-full h-full flex items-center justify-center
          ${matchedCardEntry ? "bg-gray-800 opacity-[60%] border-2 border-white shadow-md shadow-fuchsia-400" : "bg-white"}
          rounded-xl
          text-4xl
          transition-opacity duration-300
          transform rotate-y-180
          ${isFlipped ? "opacity-100" : "opacity-0"}
        `}
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)"
        }}
      >
        {decodeEntity(emoji.htmlCode[0])}
      </div>
    </button>
  );
};

export default EmojiCard;