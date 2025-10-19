import React, { useContext } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { ThemeContext } from '../../Context/ThemeContext'; // assuming you have this from your navbar
import { useTranslation } from 'react-i18next';
export default function Footer() {
  const { mode } = useContext(ThemeContext);
  const {t} = useTranslation();
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: mode === 'light' ? '#1976d2' : '#000', // same blue as navbar in light, black in dark
        color: mode === 'light' ? '#fff' : '#fff',      // white text for both modes
        mt: 8,
        py: 5,
        px: { xs: 2, md: 10 },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', gap: 4 }}>
        {/* LEFT: Description */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
           {t("mystore")}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t("footer1")}
          </Typography>
          <Typography variant="body2">
            {t("footer2")}
          </Typography>
        </Box>

        {/* RIGHT: Blank for social links / GitHub */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: 'center' }}>
          {/* Add your GitHub / social icons here */}
        </Box>
      </Box>

      <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.3)' }} />

      <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: 'rgba(255,255,255,0.7)' }}>
        &copy; {new Date().getFullYear()} MyStore. All rights reserved.
      </Typography>
    </Box>
  );
}
