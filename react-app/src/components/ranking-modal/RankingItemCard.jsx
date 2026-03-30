import { Box, Chip, Typography, IconButton } from '@mui/material';
import { Clear, DragIndicator } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useApi } from "contexts/ApiContext";

const toTitleCase = (str) => str.replace(/\b\w/g, (c) => c.toUpperCase());

function RankingItemCard({ item, location, onMoveToUnranked, variant = "chip", templateId }) {
    const ref = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [hovered, setHovered] = useState(false);
    const { SERVER_URL } = useApi();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        return draggable({
            element: el,
            getInitialData: () => ({ location, item }),
            onDragStart: () => setDragging(true),
            onDrop: () => setDragging(false)
        })
    }, [location, item]);

    const handleDelete = () => {
        if (onMoveToUnranked) {
            onMoveToUnranked(item, location);
        }
    };

    if (variant === "card") {
        const itemName = item.name ?? '';
        const imageUrl = `${SERVER_URL}/static/${templateId}/${itemName.toLowerCase().replace(/\s+|\/+/g, "")}.jpg`;

        return (
            <Box
                ref={ref}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                sx={{
                    position: 'relative',
                    width: 72,
                    height: 72,
                    backgroundColor: "#2e2e2e",
                    border: "1px solid #444",
                    borderRadius: 1,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: dragging ? 'grabbing' : 'grab',
                    opacity: dragging ? 0.5 : 1,
                    transition: 'opacity 0.1s ease',
                }}
            >
                <Box
                    component="img"
                    src={imageUrl}
                    alt={toTitleCase(itemName)}
                    draggable={false}
                    sx={{ width: "100%", height: 50, objectFit: "cover", userSelect: 'none', pointerEvents: 'none' }}
                    onError={(e) => { e.target.style.display = "none"; }}
                />
                <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <Typography fontSize={10} color="#aaa" textAlign="center" px={0.5} noWrap>
                        {toTitleCase(itemName)}
                    </Typography>
                </Box>
                {hovered && (
                    <IconButton
                        size="small"
                        onClick={handleDelete}
                        sx={{
                            position: 'absolute',
                            top: 2,
                            right: 2,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            color: 'white',
                            padding: '2px',
                            '&:hover': { backgroundColor: 'rgba(180,0,0,0.85)' },
                        }}
                    >
                        <Clear sx={{ fontSize: 14 }} />
                    </IconButton>
                )}
            </Box>
        );
    }

    // chip variant — used in the unranked pool
    return (
        <Box sx={{ margin: "2px" }}>
            <Chip
                ref={ref}
                label={item.name}
                icon={<DragIndicator sx={{ color: 'white !important', fontSize: 16 }} />}
                deleteIcon={<Clear />}
                onDelete={handleDelete}
                sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    cursor: dragging ? 'grabbing' : 'grab',
                    '& .MuiChip-deleteIcon': {
                        color: 'white',
                    },
                }}
            />
        </Box>
    );
}

export default RankingItemCard;
