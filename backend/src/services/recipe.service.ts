import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class RecipeService {
    private readonly API_BASE_URL: string | undefined;

    constructor(private configService: ConfigService) {
        this.API_BASE_URL = this.configService.get<string>('API_BASE_URL');
    }

    async getRecipes(filter?: string, type: string = 'name') {
        let url = `${this.API_BASE_URL}/search.php?s=`;

        if (filter) {
            if (type === 'ingredient') url = `${this.API_BASE_URL}/filter.php?i=${filter}`;
            if (type === 'country') url = `${this.API_BASE_URL}/filter.php?a=${filter}`;
            if (type === 'category') url = `${this.API_BASE_URL}/filter.php?c=${filter}`;
        }

        const response = await axios.get(url);
        return response.data;
    }

    async getRecipeById(id: string) {
        const url = `${this.API_BASE_URL}/lookup.php?i=${id}`;
        const response = await axios.get(url);
        return response.data;
    }
}