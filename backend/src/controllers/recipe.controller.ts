import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipeService } from '../services/recipe.service';

@Controller('recipes')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) { }

    @Get()
    getRecipes(@Query('filter') filter?: string, @Query('type') type: string = 'name') {
        return this.recipeService.getRecipes(filter, type);
    }

    @Get(':id')
    getRecipeById(@Param('id') id: string) {
        return this.recipeService.getRecipeById(id);
    }
}