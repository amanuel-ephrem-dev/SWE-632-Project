import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useApi } from "contexts/ApiContext";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import TIERS from "constants/tiers.jsx";
import TierRow from "components/shared/TierRow.jsx";

export default function GlobalRankingPage() {
    const [ranking, setRanking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { SERVER_URL } = useApi();
    const { templateId } = useParams();

    useEffect(() => {
        axios.get(`${SERVER_URL}/global/${templateId}`)
            .then((response) => {
                console.log(response.data);
                setRanking(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching global ranking:", error);
                setError(error);
                setLoading(false);
            });
    }, [SERVER_URL, templateId])

    if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;
    if (error) return <Typography color="error" mt={4} textAlign="center">Error: {error}</Typography>;

    // Group item_rankings by tier
    const grouped = TIERS.reduce((acc, tier) => {
        acc[tier] = ranking.item_rankings.filter((r) => r.average_tier === tier);
        return acc;
    }, {});

    console.log(grouped);

    return (
        <Box maxWidth="75%" mx="auto" mt={4} px={2}>
            <Box px={2} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography sx={{ fontSize: "36px", fontWeight: 800, color: "#111827" }}>
                    {ranking.template_name}
                </Typography>
                <Typography sx={{ fontSize: "18px", color: "#6b7280" }}>
                    Global Average
                </Typography>
            </Box>

            {TIERS.map((tier) => (
                <TierRow key={tier} label={tier} items={grouped[tier]} templateId={ranking.template_id} />
            ))}
        </Box>
    )
}