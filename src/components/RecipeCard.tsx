
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe }: { recipe: any }) => {
  const [openDialog, setOpenDialog] = useState(false);


  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  return (
    <>
      <Card sx={{ maxWidth: 345, m: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={recipe.Img || 'https://via.placeholder.com/150'}
          alt={recipe.Name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {recipe.Name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {recipe.Description?.slice(0, 80)}...
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">⏱ {recipe.Duration} דק</Typography>
            <Typography variant="caption">🎯 {recipe.Difficulty} רמה</Typography>
          </Box>

          {/* כפתורי אקשן */}
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title="הצג פרטים">
              <IconButton onClick={handleDialogOpen} color="info">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>

      {/* דיאלוג להצגת הוראות ורכיבים */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>📋 {recipe.Name} - פרטי מתכון</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>הוראות הכנה:</Typography>
          <List dense>
            {recipe.Instructions?.map((step: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={`שלב ${index + 1}: ${step}`} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>רכיבים:</Typography>
          <List dense>
            {recipe.Ingridents?.map((ing: any, index: number) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${ing.Name} - ${ing.Count} ${ing.Type}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecipeCard;

