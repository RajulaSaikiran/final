import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {CardActionArea, Button,} from '@mui/material';


function AvatarCard() {
  return (
    <div>

    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
            <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Avatar Card"
        subheader="September 14, 2024"
        />
      <CardMedia
        component="img"
        height="194"
        image="https://source.unsplash.com/random"
        alt="random"
        />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This card has an avatar, image, and action buttons. It's great for social media profiles or articles.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://source.unsplash.com/random"
          alt="random"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Stylish Card
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is an example of a stylish card using Material-UI. You can customize it further to suit your needs.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
        </div>
  );
}

export default AvatarCard;
