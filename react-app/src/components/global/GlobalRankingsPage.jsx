import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useApi } from "contexts/ApiContext";
import TemplateCard from "./TemplateCard";

export default function GlobalRankingsPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { SERVER_URL } = useApi();

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/templates`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setTemplates(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to load templates");
      });
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;
  if (error) return <Typography color="error" mt={4} textAlign="center">Error: {error}</Typography>;

  return (
    <Box sx={{ minHeight: "calc(100vh - 72px)", padding: "32px 16px" }}>
      <Box sx={{ maxWidth: 900, margin: "0 auto" }}>
        <Typography sx={{ fontSize: "28px", fontWeight: 800, color: "#111827" }}>
          Global Rankings
        </Typography>
        <Typography sx={{ fontSize: "14px", fontWeight: 800, color: "#6b7280" }}>
          Choose a category to view global consensus rankings.
        </Typography>
        <Box sx={{
          mt: 3,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 2,
        }}>
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              templateId={template.id}
              name={template.name}
              description={template.description}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}