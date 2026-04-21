import { Box, Typography, Divider } from '@mui/material';

const CATEGORY_COLORS = {
    Music: "#534AB7",
    Animals: "#378ADD",
    Food: "#E24B4A",
    Events: "#EF9F27",
};

export default function TemplateCard({ template, onClick }) {
    const accentColor = CATEGORY_COLORS[template.category] ?? "#888888";

    return (
        <Box
            onClick={onClick}
            sx={{
                mt: 4,
                border: '1px solid #ccc',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                color: 'inherit',
                backgroundColor: '#fff',
                display: 'block',
                overflow: 'hidden',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    borderColor: accentColor,
                }
            }}
        >
            <Box sx={{ height: '7px', backgroundColor: accentColor }} />
            <Box sx={{ p: 2 }}>
                <Typography style={{ fontSize: '18px' }} fontWeight="bold">
                    {template.name}
                </Typography>
                {template.category && (
                    <Typography style={{ fontSize: '16px', fontWeight: 300, color: accentColor }}>
                        {template.category}
                    </Typography>
                )}
                <Divider sx={{ my: 1 }} />
                <Typography style={{ fontSize: '18px', fontWeight: 400 }} color="text.secondary">
                    {template.description}
                </Typography>
            </Box>
        </Box>
    );
}