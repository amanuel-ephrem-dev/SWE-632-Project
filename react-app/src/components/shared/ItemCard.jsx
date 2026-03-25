import { Box, Typography, Tooltip } from "@mui/material";

const toTitleCase = (str) => str.replace(/\b\w/g, (c) => c.toUpperCase());

export default function ItemCard({ item, imageUrl }) {
    return (
        <Tooltip title={toTitleCase(item.item_name)} enterDelay={500} placement="right" arrow>
            <Box
                sx={{
                    width: 110,
                    height: 110,
                    backgroundColor: "#2e2e2e",
                    border: "1px solid #444",
                    borderRadius: 1,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: 'pointer'
                }}
            >
                <Box
                    component="img"
                    src={imageUrl}
                    alt={toTitleCase(item.item_name)}
                    sx={{ width: "100%", height: 75, objectFit: "cover" }}
                    onError={(e) => { e.target.style.display = "none"; }}
                />
                <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Typography fontSize={12} color="#aaa" textAlign="center" px={0.5} noWrap>
                        {toTitleCase(item.item_name)}
                    </Typography>
                </Box>
            </Box>
        </Tooltip>
    );
}
