import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Grid, Typography, Box } from '@mui/material';

const EditRecipe = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/recipe/${recipeId}`);
        if (res.ok) {
          const data = await res.json();
          setRecipe(data);
          setForm(data); // Initialize the form with the existing recipe data
        } else {
          setError('לא מצאנו את המתכון');
        }
      } catch (err) {
        setError('שגיאה בהבאת נתוני המתכון');
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (userId !== recipe?.user) {
      alert('אין לך גישה לערוך את המתכון הזה');
      navigate('/home-recipes');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/recipe/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          user: recipe?.user, // Don't allow changes to the user field
          id: recipe?.id, // Don't allow changes to the ID field
        }),
      });

      if (res.ok) {
        const updatedRecipe = await res.json();
        alert('המתכון עודכן בהצלחה');
        navigate(`/recipe/${updatedRecipe.id}`);
      } else {
        alert('שגיאה בעדכון המתכון');
      }
    } catch (err) {
      console.error('שגיאה בעדכון המתכון:', err);
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
        ערוך את המתכון
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box component="form" noValidate autoComplete="off">
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="שם המתכון"
              value={form.Name || ''}
              onChange={handleChange}
              fullWidth
              name="Name"
              required
            />
            <TextField
              label="תיאור"
              value={form.Description || ''}
              onChange={handleChange}
              fullWidth
              name="Description"
              required
            />
            <TextField
              label="קישור לתמונה"
              value={form.Img || ''}
              onChange={handleChange}
              fullWidth
              name="Img"
              required
            />
            <TextField
              label="הוראות"
              value={form.Instructions || ''}
              onChange={handleChange}
              fullWidth
              name="Instructions"
              required
            />
            <TextField
              label="קושי"
              value={form.Difficulty || ''}
              onChange={handleChange}
              fullWidth
              name="Difficulty"
              required
            />
            <TextField
              label="משך זמן"
              value={form.Duration || ''}
              onChange={handleChange}
              fullWidth
              name="Duration"
              required
            />
            <TextField
              label="קטגוריה"
              value={form.CategoryId || ''}
              onChange={handleChange}
              fullWidth
              name="CategoryId"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              עדכן מתכון
            </Button>
          </Box>
        </Box>

      </form>
    </div>
  );
};

export default EditRecipe;
