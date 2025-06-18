import React from 'react';
import { Check, ArrowLeft, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { Card, CardContent, CardHeader, CardActions, Typography, Button, Box, LinearProgress } from '@mui/material'; // Import Material-UI components
import NavbarComponent from './Navbar';
import './FeedbackComponent.css'; // Import CSS file

const FeedbackComponent = ({ score = 85, improvements = ['Comprehension'] }) => {
  const navigate = useNavigate(); // Initialize the navigate hook

  // Calculate color based on score
  const getScoreColor = (score) => {
    if (score >= 90) return 'green';
    if (score >= 70) return 'blue';
    return 'yellow';
  };

  // Get feedback message based on score
  const getFeedbackMessage = (score) => {
    if (score >= 90) return 'Excellent work! You\'re mastering the material.';
    if (score >= 70) return 'Good job! You\'re showing solid understanding.';
    return 'Keep practicing! You\'re making progress.';
  };

  return (
    <>
      <NavbarComponent />
      <Card className="feedback-card">
        <CardHeader
          title="Your Feedback"
          titleTypographyProps={{ variant: 'h6' }}
          className="feedback-card-header"
        />

        <CardContent>
          {/* Success Icon */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Box className="feedback-icon-box">
              <Check className="feedback-icon" />
            </Box>
          </Box>

          {/* Score Section */}
          <Box textAlign="center" mb={2}>
            <Typography variant="body2" className="feedback-score-text">
              Score
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              className="feedback-score"
              style={{ color: getScoreColor(score) }}
            >
              {score}%
            </Typography>
          </Box>

          {/* Progress Bar */}
          <Box mb={2}>
            <LinearProgress
              variant="determinate"
              value={score}
              className="feedback-progress-bar"
            />
          </Box>

          {/* Feedback Message */}
          <Typography className="feedback-message">
            {getFeedbackMessage(score)}
          </Typography>

          {/* Improvements Section */}
          {improvements.length > 0 && (
            <Box>
              <Typography
                variant="body2"
                className="feedback-improvements-title"
              >
                <TrendingUp style={{ fontSize: 16 }} />
                Areas for Improvement:
              </Typography>
              <Box component="ul" className="feedback-improvements-list">
                {improvements.map((item, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    component="li"
                    className="feedback-improvements-item"
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </CardContent>

        <CardActions>
          <Button
            className="feedback-back-button"
            variant="contained"
            color="success"
            onClick={() => navigate('/Dashboard')}
            startIcon={<ArrowLeft />}
          >
            Back to Dashboard
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default FeedbackComponent;
