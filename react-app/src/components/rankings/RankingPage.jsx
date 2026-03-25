import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "contexts/ApiContext";
import { useAuth } from 'contexts/AuthContext.jsx'
import { useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import TierRow from "components/shared/TierRow.jsx";
import axios from "axios";
import TIERS from "constants/tiers.jsx";
import "./RankingPage.css";

export default function RankingPage() {
    const { username } = useAuth();
    const { rankingId } = useParams();
    const { SERVER_URL } = useApi();
    const [ranking, setRanking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleGoBack = () => {
      navigate(-1);
  }

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
    <div>
        <Box maxWidth="75%" mx="auto" mt={4} px={2}>
            <Box px={2} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography sx={{ fontSize: "36px", fontWeight: 800, color: "#111827" }}>
                    {ranking.template_name}
                </Typography>
                <Typography sx={{ fontSize: "18px", color: "#6b7280" }}>
                    {username}'s Ranking
                </Typography>
            </Box>

            {TIERS.map((tier) => (
                <TierRow key={tier} label={tier} items={grouped[tier]} templateId={ranking.template_id} />
            ))}
          <div className="back-button"><button onClick={handleGoBack}> back </button> </div>
        </Box>

        
     </div>
    );
}
