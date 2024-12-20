import Link from "next/link"
import { Card, CardContent } from "../ui/card"

  


type recipeType = {
    id: number,
    title: string,
    description: string,
    image: string,
    name: string,
    rating: number,
    cuisine: string

}

export default function RecipeList({ recipeList}: {recipeList: recipeType[]}) {
    
    return <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4l sm:max-w-full ">
        <h1 className="text-4xl font-bold text-grey-800 mb-12">Recipes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                recipeList && recipeList.length > 0 ?
                    recipeList.map(recipe =>
                        <Link href={`details/${recipe.id}`}>
                     
                        <Card>
                            <CardContent className="bg-white rounded-md cursor-pointer overflow-hidden shadow-md hover:scale-[1,1] transition-all">
                                <div className="w-full aspect-w-16 aspect-h-8 lg:h-80"> 
                                    <img
                                        src={recipe.image}
                                        alt={recipe.name}
                                        className="h-full w-full object-cover object-top"
                                    />

                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900">{recipe.name}</h3>
                                    </div>
                                    <div className="mt-4 flex items-center flex-wrap gap-2">
                                        <p className="text-lg text-grey-600">Rating: {recipe.rating}</p>
                                    </div>
                                    <div className="ml-auto">
                                        <p className="font-bold text-gray-600">{ recipe.cuisine}</p>
                                    </div>
                                    


                            </CardContent>
                      
                        </Card>
                    </Link>)
                    : null
}
        </div>
        
    </div>
}