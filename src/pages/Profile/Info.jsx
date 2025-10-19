import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AxiosUsersInstance from '../../API/AxiosUsersInstance';
import { Box, CircularProgress, Card, CardContent, Typography, Divider, IconButton, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

export default function Info() {
    const theme = useTheme(); // Get the theme to access the primary color

    // Fetch user profile data
    const fetchProfile = async () => {
        const response = await AxiosUsersInstance.get('https://kashop1.runasp.net/api/Users/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    };

    const { data: user, isLoading, error, isError } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile,
        staleTime: 1000 * 60 * 5,
    });
    console.log(user);
    // Handle loading and error states
    if (isError) return <div>Error: {error.message}</div>;
    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;

    return (
        <Box sx={{ py: 4, px: 2, bgcolor: 'background.default', color: 'text.primary' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 700, color: theme.palette.primary.main }}>
                User Information
            </Typography>

            {/* Main Card for user information */}
            <Card sx={{ maxWidth: 600, margin: 'auto', boxShadow: 3, borderColor: theme.palette.primary.main, borderWidth: 2 }}>
                <CardContent>
                    {/* User Full Name */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PersonIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                            Full Name
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {user?.data?.fullName}
                        </Typography>
                    </Box>

                    {/* User Email */}
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <EmailIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                            Email
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {user?.data?.email}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color={user?.data?.emailConfirmed ? 'green' : 'red'} sx={{ mt: 1 }}>
                        {user?.data?.emailConfirmed ? 'Email Confirmed' : 'Email Not Confirmed'}
                    </Typography>

                    {/* User Phone Number */}
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PhoneIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                            Phone Number
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {user?.data?.phoneNumber}
                        </Typography>
                    </Box>

                    {/* User Role */}
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                            Role
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {user?.data?.roleName}
                        </Typography>
                    </Box>

                    {/* Account Status */}
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <LockIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                            Account Status
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {user?.data?.lockoutEnabled ? 'Account is locked' : 'Account is active'}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
