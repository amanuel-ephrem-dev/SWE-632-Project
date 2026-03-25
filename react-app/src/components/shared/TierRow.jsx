import { Box, Typography } from "@mui/material";
import { useApi } from "contexts/ApiContext";
import ItemCard from "./ItemCard";

const TIER_COLORS = {
    S: "#FF7F7F",
    A: "#FFBF7F",
    B: "#FFDF7F",
    C: "#FFFF7F",
    D: "#BFFF7F",
    F: "#7FBF7F",
};

export default function TierRow({ label, items, templateId }) {
    const { SERVER_URL } = useApi();

    return (
        <Box display="flex" alignItems="stretch" mb={0.5} border="1px solid #333" minHeight={110}>
            <Box
                sx={{
                    width: 100,
                    minWidth: 100,
                    backgroundColor: TIER_COLORS[label] ?? "#ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRight: "1px solid #333",
                }}
            >
                <Typography
                    fontWeight={700}
                    fontSize={48}
                    color="#222">
                    {label}
                </Typography>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                gap={1}
                px={1.5}
                py={1}
                sx={{ backgroundColor: "#1e1e1e", flex: 1 }}
            >
                {items.map((item) => {
                    const imageUrl = `${SERVER_URL}/static/${templateId}/${item.item_name.toLowerCase().replace(/\s+|\/+/g, "")}.jpg`;
                    return <ItemCard key={item.item_id} item={item} imageUrl={imageUrl} />;
                })}
            </Box>
        </Box>

    );
}
