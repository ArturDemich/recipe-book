'use client';

import styles from '../styles/RecipeDetail.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from 'lib/api';
import { useParams } from 'next/navigation';

interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strArea: string; // Country
  strInstructions: string;
  strMealThumb: string; // Image
  strCategory: string;
  ingredients: string[];
}

export default function RecipeDetail() {
  const params = useParams();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);

  if (!params.id) return <p>Invalid ID</p>;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${params.id}`);
        const meal = res.data.meals[0];
        const ingredients = Object.keys(meal)
          .filter((key) => key.startsWith('strIngredient') && meal[key])
          .map((key) => meal[key]);

        setRecipe({
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strArea: meal.strArea,
          strInstructions: meal.strInstructions,
          strMealThumb: meal.strMealThumb,
          strCategory: meal.strCategory,
          ingredients,
        });
        const relatedRes = await api.get(
          `/recipes?type=category&filter=${meal.strCategory}`
        );
        setRelatedRecipes(relatedRes.data.meals || []);
      } catch (err) {
        console.error('Error fetching recipe:', err);
      }
    };

    fetchRecipe();
  }, [params.id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className={styles.recipeDetailWrapper}>
      <div className={styles.contentBlock}>
        <div className={styles.contentImg}>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className={styles.img}
          />
          <div className={styles.contentTitle}>
            <h2>{recipe.strMeal}</h2>
            <div className={styles.titleFlex}>
              <span>country: </span>
              <h3>
                <Link href={`/?type=country&filter=${recipe.strArea}`}>
                  {recipe.strArea}
                </Link>
              </h3>
            </div>
          </div>
        </div>

        <p>{recipe.strInstructions}</p>

        <h3 className={styles.ingredients}>Ingredients</h3>
        <ul className={styles.ingredientsList}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              <Link href={`/?type=ingredient&filter=${ingredient}`}>
                {ingredient}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.sidebar}>
        <div className={styles.titleFlex}>
          <span>more: </span>
          <Link href={`/?type=category&filter=${recipe.strCategory}`}>
            <h3> {recipe.strCategory} Recipes</h3>
          </Link>
        </div>

        <ul className={styles.sidebarList}>
          {relatedRecipes.map((rec: RecipeDetail) => (
            <li key={rec.idMeal}>
              <Link href={`/recipe/${rec.idMeal}`}>{rec.strMeal}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
