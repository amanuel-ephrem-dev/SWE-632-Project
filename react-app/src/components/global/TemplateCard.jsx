import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "";

export default function TemplateCard({ name, description, templateId }) {
    return (
        <Card
            component={Link}
            to={`${SERVER_URL}/global/${templateId}`}
            sx={{
                textDecoration: "none",
                borderRadius: "14px",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                boxShadow: "none",
                transition: "transform 140ms ease, border-color 140ms ease, background 140ms ease",
                "&:hover": {
                    transform: "translateY(-2px)",
                    background: "#ffffff",
                    borderColor: "#d1d5db",
                },
            }}
        >
            <CardContent sx={{ padding: "18px 20px" }}>
                <Typography
                    sx={{ fontSize: "18px", fontWeight: 800, color: "#111827" }}
                >
                    {name}
                </Typography>
                {description && (
                    <Typography
                        sx={{ mt: "6px", fontSize: "13px", color: "#6b7280" }}
                    >
                        {description}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}