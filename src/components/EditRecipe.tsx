

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Typography, Box, Paper, Alert, CircularProgress, Modal } from '@mui/material';

const EditRecipe = () => {
  const { id } = useParams(); // קבלת ה-ID מה-URL
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null); // אחסון המתכון שנשלף
  const [form, setForm] = useState<any>({}); // אחסון נתוני הטופס
  const [error, setError] = useState<string | null>(null); // שגיאה אם לא מצליחים לטעון את המתכון
  const [loading, setLoading] = useState<boolean>(true); // סטטוס טעינה
  const [submitting, setSubmitting] = useState<boolean>(false); // סטטוס שליחה של טופס
  const [open, setOpen] = useState<boolean>(true); // המודל ייפתח אוטומטית ברגע שהעמוד נטען

  // שליפת המתכון מהשרת בעזרת GET
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/recipe/${id}`);
        if (res.ok) {
          const data = await res.json();
          setRecipe(data);
          setForm(data); // מילוי הטופס בנתונים שהתקבלו
        } else {
          setError('המתכון לא נמצא');
        }
      } catch {
        setError('שגיאה בעת טעינת המתכון');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // עדכון שדות הטופס
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // שליחה של הטופס לעדכון המתכון
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('http://localhost:8080/api/recipe/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          id: recipe.id,       // לא ניתן לשנות את ה-ID
          user: recipe.user,   // לא ניתן לשנות את ה-user
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        alert('המתכון עודכן בהצלחה!');
        setOpen(false); // סגירת המודל
        navigate("/home-recipes/my-recipes"); 
        window.location.reload(); // ניווט למתכון אחרי עדכון
      } else {
        alert('שגיאה בעדכון המתכון');
      }
    } catch (err) {
      console.error(err);
      alert('שגיאה בלתי צפויה');
    } finally {
      setSubmitting(false);
    }
  };

  // סגירת המודל (ביטול)
  const handleClose = () => {
    setOpen(false);
    navigate(-1); // חזרה לדף הקודם
  };

  // טעינה או שגיאה אם לא הצלחנו לשלוף את המתכון
  if (loading) {
    return <Box mt={10} textAlign="center"><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: '8px',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          עריכת מתכון
        </Typography>

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="שם המתכון"
            name="Name"
            value={form.Name || ''}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="תיאור"
            name="Description"
            value={form.Description || ''}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="קישור לתמונה"
            name="Img"
            value={form.Img || ''}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="הוראות הכנה"
            name="Instructions"
            value={form.Instructions || ''}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="רמת קושי"
            name="Difficulty"
            value={form.Difficulty || ''}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="משך זמן"
            name="Duration"
            value={form.Duration || ''}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="מספר קטגוריה"
            name="CategoryId"
            value={form.CategoryId || ''}
            onChange={handleChange}
            fullWidth
            // required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={submitting}
          >
            שמור שינויים
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleClose} // כפתור ביטול
          >
            ביטול
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditRecipe;
