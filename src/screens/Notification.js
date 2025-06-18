import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Divider,
} from '@mui/material';

const NotificationPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Sample notifications - in real app, this would come from props or API
  const notifications = [
    {
      id: 1,
      message: 'New feature added to Mock Test generation.',
      isNew: true,
    },
    {
      id: 2,
      message: 'Your recent test results are now available.',
      isNew: true,
    },
  ];

  return (
    <div className="relative">
      {/* Notification Button */}
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
        sx={{ position: 'relative' }}
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {notifications.some((n) => n.isNew) && (
          <span
            style={{
              position: 'absolute',
              top: 2,
              right: 2,
              width: 8,
              height: 8,
              backgroundColor: 'red',
              borderRadius: '50%',
            }}
          />
        )}
      </IconButton>

      {/* Popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          />

          {/* Notification Card */}
          <Card
            sx={{
              position: 'absolute',
              left: 0,
              marginTop: 2,
              width: 300,
              zIndex: 50,
              boxShadow: 3,
              animation: 'fadeIn 0.2s',
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" style={{ color: 'white' }}>
                  Notifications
                </Typography>
              }
              subheader={
                <Typography variant="body2" style={{ color: 'white' }}>
                  Stay updated with the latest alerts and updates.
                </Typography>
              }
              sx={{
                background:
                  'linear-gradient(90deg, rgba(106,17,203,1) 0%, rgba(37,117,252,1) 100%)',
                color: 'white',
                padding: 2,
                borderRadius: '4px 4px 0 0',
              }}
            />

            <CardContent>
              <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                {notifications.map((notification) => (
                  <React.Fragment key={notification.id}>
                    <Typography
                      variant="body2"
                      sx={{ padding: 1, cursor: 'pointer' }}
                    >
                      {notification.message}
                    </Typography>
                    <Divider />
                  </React.Fragment>
                ))}
              </div>
              <Button
                fullWidth
                onClick={() => setIsOpen(false)}
                sx={{
                  textTransform: 'none',
                  color: '#1976d2',
                  padding: 1,
                }}
              >
                close
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default NotificationPopup;
