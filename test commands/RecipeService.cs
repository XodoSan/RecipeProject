﻿using Recipe_Api.Data.Entities;
using Recipe_Api.Data.Interfaces;

namespace Recipe_Api.test_commands
{
    public class RecipeService : IRecipeService
    {
        private readonly IRecipeRepository _recipeRepository;

        public RecipeService(IRecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
        }
        public void DeleteRecipe()
        {
        }
        public Recipe AddRecipe(AddRecipeCommand addCommand)
        {
            var recipe = addCommand.Convert();
            _recipeRepository.Add(recipe);
            return recipe;
        }
    }
}