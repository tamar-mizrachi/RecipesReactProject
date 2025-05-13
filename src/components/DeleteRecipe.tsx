/*
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const DeleteRecipe = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/recipe/${recipeId}`);//http://localhost:8080/api/recipe/delete/:id
        if (res.ok) {
          const data = await res.json();
          setRecipe(data);
        } else {
          setError('לא מצאנו את המתכון');
        }
      } catch (err) {
        setError('שגיאה בהבאת נתוני המתכון');
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleDelete = async () => {
    const userId = localStorage.getItem('userId');
    
    if (userId !== recipe.user) {
      alert('אין לך גישה למחוק את המתכון הזה');
      navigate('/home-recipes');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/recipe/delete/${recipeId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('המתכון נמחק בהצלחה');
        navigate('/home-recipes');
      } else {
        alert('שגיאה במחיקת המתכון');
      }
    } catch (err) {
      alert('שגיאה במחיקת המתכון');
    }
  };

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!recipe) {
    return <Typography>טוען מתכון...</Typography>;
  }

  return (
    <div style={{ marginTop: '160px', padding: '20px' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
        האם אתה בטוח שברצונך למחוק את המתכון?
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 4 }}>
        {recipe.Name}
      </Typography>
      <Button
        onClick={handleDelete}
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ mb: 2 }}
      >
        מחיקת מתכון
      </Button>
      <Button
        onClick={() => navigate('/home-recipes')}
        variant="contained"
        color="primary"
        fullWidth
      >
        חזור
      </Button>
    </div>
  );
};

export default DeleteRecipe;*/


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

const DeleteRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/recipe/${id}`);
        setRecipe(res.data);
      } catch (error) {
        console.error('שגיאה בטעינת מתכון:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/recipe/${id}`);
      navigate('/recipes');
    } catch (error) {
      console.error('שגיאה במחיקה:', error);
    }
  };

  if (!recipe) return <Typography>טוען מתכון...</Typography>;

  return (
    <div>
      <Typography variant="h5">האם אתה בטוח שברצונך למחוק את המתכון?</Typography>
      <Typography variant="h6">{recipe.Name}</Typography>
      <Button onClick={handleDelete} variant="contained" color="error">מחק</Button>
      <Button onClick={() => navigate('/recipes')} variant="outlined">ביטול</Button>
    </div>
  );
};

export default DeleteRecipe;

