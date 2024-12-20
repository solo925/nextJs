import RecipeDetailsItem from "@/components/Details";

const fetchRecipeDetails = async (recipeId:number) => {
    try {
        const apiRespone = await fetch(`https://dummyjson.com/recipe/${recipeId}`)
        const data = await apiRespone.json()
        return data;
        
    } catch (error) {
        console.error(error)
        throw new Error('errrors')
        
        
    }
}


export default async function RecipeDetails({ params }: {params:{ id: number }}) {
    const recipedetails = await fetchRecipeDetails(params?.id);
    return <RecipeDetailsItem recipedetail={ recipedetails} />
}