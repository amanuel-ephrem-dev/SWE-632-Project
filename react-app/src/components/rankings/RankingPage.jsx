import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "contexts/ApiContext";
import { Box, Typography, CircularProgress } from "@mui/material";
import TierRow from "./TierRow";
import axios from "axios";

const TIERS = ["S", "A", "B", "C", "D", "F"];

export default function RankingPage() {
    const { rankingId } = useParams();
    const { SERVER_URL } = useApi();
    const [ranking, setRanking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${SERVER_URL}/tier-list/${rankingId}`, {
                headers: { "ngrok-skip-browser-warning": "true" },
            })
            .then((response) => {
                setRanking(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [SERVER_URL, rankingId]);

    if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;
    if (error) return <Typography color="error" mt={4} textAlign="center">Error: {error}</Typography>;

    // Group item_rankings by tier
    const grouped = TIERS.reduce((acc, tier) => {
        acc[tier] = ranking.item_rankings.filter((r) => r.tier === tier);
        return acc;
    }, {});

    return (
        <Box maxWidth="75%" mx="auto" mt={4} px={2}>
            <Typography variant="h4" fontWeight={700} mb={3}>
                {ranking.template_name}
            </Typography>

            {TIERS.map((tier) => (
                <TierRow key={tier} label={tier} items={grouped[tier]} templateId={ranking.template_id} />
            ))}
        </Box>
    );
}
