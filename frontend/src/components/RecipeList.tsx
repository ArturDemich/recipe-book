'use client';

import styles from '../styles/RecipeList.module.css';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Recipe {
  idMeal: string;
  strMeal: string;
}

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || '';
  const type = searchParams.get('type') || 'name';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const query = filter ? `?type=${type}&filter=${filter}` : '';
        const res = await api.get(`/recipes${query}`);
        setRecipes(res.data.meals || []);
      } catch (err) {
        console.error('Error fetching recipes:', err);
      }
    };

    fetchRecipes();
  }, [filter, type]);

  return (
    <div>
      <h1>{filter ? `${filter} Recipes` : 'All Recipes'}</h1>

      <ul className={styles.list}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li key={recipe.idMeal}>
              <Link href={`/recipe/${recipe.idMeal}`}>{recipe.strMeal}</Link>
            </li>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </ul>
    </div>
  );
}
