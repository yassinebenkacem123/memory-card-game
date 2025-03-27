import { GameStatusContext } from "../App";
import { useContext } from "react";
const GameOver = ({handleClick,}) => {
    const {score} = useContext(GameStatusContext);
    return (
    <>{<div className="fixed inset-0 z-10 bg-black/150 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="relative bg-gray-900/95 backdrop-blur-lg rounded-2xl p-8 shadow-2xl space-y-6 max-w-md w-full border border-white/10">
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full blur-xl animate-pulse" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-blue-400 rounded-full blur-xl animate-pulse delay-1000" />
          
          <h1 className={`text-4xl font-bold  bg-clip-text ${score===0?'text-red-500':'text-green-600'} text-center animate-bounce`}>
            {score===0?'You Lose 💀':'You Wine🎉'} 
          </h1>
          
        
  
          <div className="grid gap-4 sm:flex sm:justify-center">
            <button
              onClick={handleClick}
              className="px-6 py-3 bg-gradient-to-r cursor-pointer from-pink-500 to-pink-400 text-white font-semibold rounded-xl transition-all 
              duration-200 hover:scale-105 hover:shadow-lg  flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
                <path d="M20 4v5h-5" />
              </svg>
              Play Again
            </button>
            
           
          </div>
        </div>
      </div>}</>
    );
  };
  
  export default GameOver