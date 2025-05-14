// api/recipesApi.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/recipe';


export const getAllRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // מחזיר את המתכונים שהתקבלו
  } catch (error) {
    console.error('שגיאה בהבאת המתכונים:', error);
    return [];
  }
};
