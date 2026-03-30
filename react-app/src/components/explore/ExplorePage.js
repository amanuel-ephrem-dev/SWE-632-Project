import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useApi } from 'contexts/ApiContext';
import {
    Container,
    Typography,
    Box,
    Chip,
    Divider,
    CircularProgress,
    Grid
} from '@mui/material';
import TemplateCard from './TemplateCard';
import RankingModal from 'components/ranking-modal/RankModal';

const ACCENT = '#FF7F7F';

export default function ExplorePage() {
    const { SERVER_URL } = useApi();

    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openRankingModal, setOpenRankingModal] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState(null);
    const [activeCategories, setActiveCategories] = useState(new Set());

    const handleModalClose = () => {
        setOpenRankingModal(false);
        setSelectedTemplateId(null);
    };

    const toggleCategory = (cat) => {
        setActiveCategories(prev => {
            const next = new Set(prev);
            if (next.has(cat)) next.delete(cat);
            else next.add(cat);
            return next;
        });
    };

    useEffect(() => {
        axios.get(`${SERVER_URL}/templates`, {
            headers: { 'ngrok-skip-browser-warning': 'true' }
        })
            .then(response => {
                setTemplates(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [SERVER_URL]);

    const categories = useMemo(() => {
        return [...new Set(templates.map(t => t.category).filter(Boolean))].sort();
    }, [templates]);

    const filteredTemplates = useMemo(() => {
        if (activeCategories.size === 0) return templates;
        return templates.filter(t => activeCategories.has(t.category));
    }, [templates, activeCategories]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress sx={{ color: ACCENT }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <Typography color="error">Error loading templates: {error}</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="x1">
            <RankingModal
                open={openRankingModal}
                handleClose={handleModalClose}
                templateId={selectedTemplateId}
            />

            <Box textAlign="center" mt={8} mb={2}>
                <Typography variant="h3" fontWeight="bold">
                    Explore Templates
                </Typography>
                <Typography variant="body1" color="text.secondary" mt={1}>
                    Browse and rank community-made templates
                </Typography>
            </Box>

            {/* Filter bubbles */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={1} py={3}>
                <Box display="flex" alignItems="center" justifyContent="center" gap={1} flexWrap="wrap">
                    <Typography variant="caption" color="text.secondary" fontWeight={500} letterSpacing="0.1em" textTransform="uppercase" mr={1}>
                        Filter
                    </Typography>
                    {categories.map(cat => {
                        const isActive = activeCategories.has(cat);
                        return (
                            <Chip
                                key={cat}
                                label={cat}
                                onClick={() => toggleCategory(cat)}
                                variant={isActive ? 'filled' : 'outlined'}
                                sx={{
                                    borderColor: isActive ? ACCENT : 'divider',
                                    backgroundColor: isActive ? ACCENT : 'transparent',
                                    color: isActive ? '#fff' : 'text.primary',
                                    fontWeight: 500,
                                    '&:hover': {
                                        backgroundColor: isActive ? ACCENT : 'transparent',
                                        borderColor: ACCENT,
                                        color: isActive ? '#fff' : ACCENT,
                                    },
                                }}
                            />
                        );
                    })}
                </Box>
                {activeCategories.size > 0 && (
                    <Typography
                        variant="caption"
                        sx={{ color: ACCENT, cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => setActiveCategories(new Set())}
                    >
                        Clear filters
                    </Typography>
                )}
            </Box>

            {/* Results bar */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="caption" color="text.secondary">
                    Showing {filteredTemplates.length} {filteredTemplates.length === 1 ? 'result' : 'results'}
                </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {filteredTemplates.length === 0 ? (
                <Box textAlign="center" py={10}>
                    <Typography variant="h4" mb={1}>🔍</Typography>
                    <Typography variant="body1" color="text.secondary">
                        No templates found for the selected categories.
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={2} pb={10} justifyContent="center">
                    {filteredTemplates.map((template, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={template.id ?? index}>
                            <TemplateCard
                                template={template}
                                onClick={() => {
                                    setSelectedTemplateId(template.id);
                                    setOpenRankingModal(true);
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}
