import React, { useState, useEffect } from "react";

function App() {
  const [foodRecipe, setFoodRecipe] = useState([]);
  const [searchQuery, setSearchQuery] = useState("chicken");
  const [searchRecipe, setSearchRecipe] = useState("");
  
  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `https://api.edamam.com/search?q=${searchQuery}&app_id=df8f1596&app_key=8e1cc6ca302b53142ca04687727fe355`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setFoodRecipe(data.hits);
    };
    fetchRecipe();
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchRecipe( e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchRecipe);
    setSearchRecipe("");
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <div className="h-16 w-[1100px] flex justify-center  rounded-sm mt-10 shadow-2xl">
              <input
                type="text"
                value={searchRecipe}
                onChange={handleInputChange}
                placeholder="Search for recipes..."
                className="p-3 h-9 w-[800px] rounded-full border mt-4 border-gray-600 "
              />
              <button
                type="submit"
                className="border-none h-9 w-40 text-white text-base mt-4 rounded-full bg-blue-500 hover:bg-blue-600 active:w-38"
              >
                Search Recipe
              </button>
            </div>
          </div>

          <div className="p-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-10 hover:shadow-xl ">
            {foodRecipe &&
              foodRecipe.map((recipe) => (
                <div
                  key={recipe.recipe.label}
                  className="w-[270px] h-[500px] rounded-xl shadow-2xl overflow-scroll  transition-transform hover:scale-105 no-scrollbar"
                >
                  <div className="relative">
                    <img
                      src={recipe.recipe.image}
                      alt={recipe.recipe.label}
                      className=" w-full   h-[250px]"
                    />
                    <div
                      className="absolute top-2 left-2 bg-indigo-500  text-white py-1 px-2 rounded"
                    >
                      {recipe.recipe.dishType}
                    </div>
                  </div>

                  <h2 className="font-bold text-base px-3 py-3">
                    {recipe.recipe.label}
                  </h2>
                  <div className="px-5">
                    <span className="font-semibold text-sm">Ingredients:</span>
                    {recipe.recipe.ingredientLines.map((ingredient, index) => (
                      <span key={index} className="block  pl-4 text-sm">
                        {ingredient}
                      </span>
                    ))}
                  </div>

                  <a
                    href={recipe.recipe.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 font-semibold px-4 py-3 hover:underline"
                  >
                    View Recipe
                  </a>
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
