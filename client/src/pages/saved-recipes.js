import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export const SavedRecipes=()=>{
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        const fetchRecipes = async () => {
          try {
            const response = await axios.get("http://localhost:3001/globalrecipes");
            console.log(response.data)
            setRecipes(response.data);
          } catch (err) {
            console.log(err);
          }
        }
        fetchRecipes();
    
},[]);
return  (
    <div>
        <h1>Published Recipes</h1>
        <ul>
            {recipes.map((recipe) => (
                <li key={recipe._id}>
                    <div>
                        <h2>{recipe.name}</h2>
                    </div>
                    <div className="instructions">
                        <p>{recipe.instructions}</p>
                    </div>
                    <img src={recipe.imageUrl} alt={recipe.name} />
                    <p>Cooking Time: {recipe.cookingTime} minutes</p>
                </li>
            ))}
        </ul>
    </div>
);
         

}