import RegularButton from "./RegularButton"
let options = []
for(let i = 1; i<5 ; i++){
  options.push(<option value={10*i}>{10*i}</option>)
}
const Form = ({handleChange}) => {
  return (
  <form className="form">
     <div className="title">Select A Category and Number of the cards!</div>

      <select onChange={handleChange} className="select" name="category" id="category">
        <option value="animals-and-nature">Animals and Nature 🐧🌳</option>
        <option value="food-and-drink">Food And Drink 🥐🍺</option>
        <option value="travel-and-places">Travel And Places ✈️🏕️</option>
        <option value="objects">Objects 🎲🧩</option>
        <option value="symbols">Symbols ❓©️</option>
      </select>

      <select onChange={handleChange} className="select" name="number" >
        {options}
      </select>
      <RegularButton>Start Game -{">"}</RegularButton>
  </form>  
    
  )
}

export default Form
