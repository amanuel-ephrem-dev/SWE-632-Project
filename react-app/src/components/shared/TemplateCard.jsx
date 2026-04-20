import { Box, Typography, Divider } from '@mui/material';

export default function TemplateCard({ template, onClick }) {
    return (
        <Box
            onClick={onClick}
            sx={{
                mt: 4,
                p: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                color: 'inherit',
                backgroundColor: '#fff',
                display: 'block',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    borderColor: '#1976d2',
                }
            }}
        >
            <Typography style={{ fontSize: '18px' }} fontWeight="bold">
                {template.name}
            </Typography>
            {template.category && (
                <Typography style={{ fontSize: '16px', fontWeight: 300 }} color="text.secondary">
                    {template.category}
                </Typography>
            )}
            <Divider sx={{ my: 1 }} />
            <Typography style={{ fontSize: '18px', fontWeight: 400 }} color="text.secondary">
                {template.description}
            </Typography>
        </Box>
    );
}