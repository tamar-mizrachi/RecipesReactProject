

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteRecipe = () => {
  const { id } = useParams(); // חשוב: באות קטנה
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/recipe/${id}`);
        if (res.ok) {
          const data = await res.json();
          setRecipe(data);
        } else {
          setError('המתכון לא נמצא');
        }
      } catch (err) {
        setError('שגיאה בעת שליפת המתכון');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    } else {
      setError('אין מזהה מתכון בכתובת');
      setLoading(false);
    }
  }, [id]);

  const handleDelete = async () => {
    if (!recipe) return;
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:8080/api/recipe/delete/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: recipe.id }),
      });

      if (res.ok) {
        alert('המתכון נמחק בהצלחה');
        navigate('/home-recipes/my-recipes');
        window.location.reload(); 
      } else {
        alert('שגיאה במחיקת המתכון');
      }
    } catch (err) {
      console.error(err);
      alert('שגיאה בלתי צפויה');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!recipe) {
    return <Alert severity="warning">לא ניתן לטעון את פרטי המתכון</Alert>;
  }
  const handleClose = () => {
    navigate('/home-recipes/my-recipes');
  };
  return (
 
  <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <DialogContent>
          <Alert severity="error">{error}</Alert>
        </DialogContent>
      ) : (
        <>
          <DialogTitle>האם אתה בטוח שברצונך למחוק את המתכון?</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{recipe.Name}</Typography>
            <Typography color="text.secondary">{recipe.Description}</Typography>
            {recipe.Img && (
              <Box mt={2} textAlign="center">
                <img
                  src={recipe.Img}
                  alt={recipe.Name}
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete} color="error" variant="contained" disabled={deleting}>
              מחק מתכון
            </Button>
            <Button onClick={handleClose} variant="outlined">
              ביטול
            </Button>
          </DialogActions>
          
        </>
      )}
    </Dialog>
  );
};


export default DeleteRecipe;
