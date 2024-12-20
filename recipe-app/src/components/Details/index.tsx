interface recipedetailsType{
    name?: string,
    image?: string,
    mealType?: string,
    id?: number,
    cuisine?: string,
    ingredients:string[],
}
const RecipeDetailsItem = ({ recipedetail}: { recipedetail: recipedetailsType }) => {
    
    return(
    <div>
        <div>
            <div>
                    <img
                        src={recipedetail?.image}
                        alt={recipedetail?.name} />
                </div>
                <div>
                    <h2>{recipedetail?.name}</h2>
                </div>
                <div>
                   <p>{recipedetail?.mealType}</p> 
                </div>
                <div>
                    <p>{recipedetail.cuisine}</p>
                </div>
                <div>
                    <h3>Ingredients</h3>
                    <ul>
                        {recipedetail?.ingredients.map((Item:string,index:number) =>
                            <li key={index}>{Item}</li>
                        )}
                    </ul>
                </div>
        </div>
    
        </div>
    )
}

export default RecipeDetailsItem;