import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { IconButton, TextField, Grid2, Card, CardMedia, CardContent, Button, Typography } from '@mui/material';
import Header from '../components/Header';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import theme from '../components/theme';
import styles from '../components/style';

function Home({ stories, favorites, toggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.root}>
      <Header />

      <div style={styles.searchBar}>
        <TextField
          fullWidth
          label="Search stories..."
          variant="outlined"
          value={searchQuery}
          sx={{ bgcolor: theme.palette.text.primary }}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Grid2 container sx={{ ml: 7 }} spacing={4}>
        {filteredStories.slice(0, 9).map(story => (
          <Grid2 item xs={12} sm={6} md={4} key={story.id}>
            <Card sx={{ ...styles.card, bgcolor: theme.palette.text.main }}>
              <CardMedia
                sx={{ ...styles.media }}
                image={story.coverImage}
                title={story.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {story.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {story.description}
                </Typography>
                <br />
                <Box display="flex" alignItems="center">
                  <Button
                    component={Link}
                    to={`/Story/${story.id}`}
                    variant="contained"
                    sx={{ bgcolor: theme.palette.primary.main }}
                  >
                    Read More
                  </Button>
                  <IconButton onClick={() => toggleFavorite(story.id)} sx={{ marginLeft: 20 }}>
                    {favorites.includes(story.id) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}

export default Home;
