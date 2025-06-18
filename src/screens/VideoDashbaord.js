import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const VideoDashboard = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videos = [
    {
      id: 1,
      title: 'Introduction to CSS',
      description: 'Learn the basics of CSS styling',
      thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1',
      videoUrl: '/Videos/video1.mp4',
      duration: '10:30',
    },
    {
      id: 2,
      title: 'Advanced CSS Concepts',
      description: 'Deep dive into advanced CSS features',
      thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1',
      videoUrl: '/Videos/video1.mp4',
      duration: '11:30',
    },
  ];

  const handleWatchVideo = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseVideo = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <Box sx={{ padding: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
        Video Lessons
      </Typography>

      <Grid container spacing={4}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 2,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 5,
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={video.thumbnail}
                alt={video.title}
                sx={{ position: 'relative' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              >
                <PlayCircleOutlineIcon sx={{ fontSize: 60, color: '#fff' }} />
              </Box>
              <CardContent sx={{ padding: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {video.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  Duration: {video.duration}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    bgcolor: 'linear-gradient(to right, #6a11cb, #2575fc)',
                    borderRadius: 50,
                    padding: '10px 20px',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: 'linear-gradient(to right, #2575fc, #6a11cb)',
                    },
                  }}
                  onClick={() => handleWatchVideo(video)}
                  startIcon={<PlayCircleOutlineIcon />}
                >
                  Watch
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        fullScreen
        open={isModalOpen}
        onClose={handleCloseVideo}
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
          },
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <IconButton
            onClick={handleCloseVideo}
            sx={{
              position: 'absolute',
              right: 20,
              top: 20,
              color: 'white',
              zIndex: 1,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedVideo && (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <video
                controls
                autoPlay
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  borderRadius: 5,
                }}
              >
                <source src={selectedVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default VideoDashboard;
