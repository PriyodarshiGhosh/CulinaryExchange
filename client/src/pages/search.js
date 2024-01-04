import axios from "axios";
import { useState } from "react";
import { MY_IP } from "../constants";
export const Search=()=>{
    const [recipes, setRecipes] = useState([]);
    const searchRecipes = async (keywords) => {
        try {
            
                if (!keywords) {
                    setRecipes([]); // Clear recipes if no keywords entered
                    return;
                }
            const response = await axios.get(MY_IP+"/recipes/search", {
                params: {
                    keywords: keywords,
                },
            });
            setRecipes(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    return (<div>
        <input
    type="text"
    placeholder="Search recipes"
    onChange={(e) => searchRecipes(e.target.value)}
     />
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
    </div>) 
}