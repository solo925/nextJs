import RecipeList from "@/components/recipe-list";

export default async function RecipePage() {

    async function fetchListOfRecipes() {

        try {
            const response = await fetch('https://dummyjson.com/recipes')
            const data = await response.json()
            return data.recipes;
            
        } catch (error) {
            throw new Error('error');
            
        }
       
    }
   
    const recipeList = await fetchListOfRecipes();

    return <div>
       <RecipeList recipeList={recipeList} />
    </div>
    
}