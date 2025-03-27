import { useContext } from "react"
import { GameStatusContext } from "../App";

const RegularButton = ({children}) => {
    const {setGameStatus,fetchData} = useContext(GameStatusContext);
  return (
    <button onClick={()=>{
      setGameStatus(prev => !prev); 
      fetchData();
     }} 
    className="button-confirm"
   >
      {children}
    </button>
  )
}

export default RegularButton