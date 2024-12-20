import RecipeDetailsItem from "@/components/Details";

const fetchRecipeDetails = async (recipeId: string) => {
    try {
        const apiResponse = await fetch(`https://dummyjson.com/recipes/${recipeId}`);
        
        if (!apiResponse.ok) {
            throw new Error("Failed to fetch recipe details");
        }
        const data = await apiResponse.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        throw new Error("Error fetching recipe details");
    }
};




export default async function RecipeDetails({ params }: {params:{ id:string }}) {
    const recipedetails = await fetchRecipeDetails(params?.id);
    console.log("something is happening")
    console.log(recipedetails)
    return (<RecipeDetailsItem recipedetail={ recipedetails} />)
}