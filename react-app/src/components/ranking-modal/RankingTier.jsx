import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material"
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"

import RankingItemCard from "./RankingItemCard";

const TIER_COLORS = {
    S: "#FF7F7F",
    A: "#FFBF7F",
    B: "#FFDF7F",
    C: "#FFFF7F",
    D: "#BFFF7F",
    F: "#7FBF7F",
};

function getContentBg(isDraggedOver, isDragging, isLabeled) {
    if (isLabeled) {
        if (isDraggedOver) return '#1a4a80';
        if (isDragging) return '#252b35';
        return '#1e1e1e';
    }
    if (isDraggedOver) return 'skyblue';
    if (isDragging) return '#e8f4fd';
    return 'white';
}

function RankingTier({ items, location, onMoveToUnranked, isDragging, label, templateId }) {
    const ref = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const isLabeled = !!label;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        return dropTargetForElements({
            element: el,
            onDragEnter: () => setIsDraggedOver(true),
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: () => setIsDraggedOver(false),
            getData: () => ({ location })
        })
    }, [location]);

    const isEmpty = !items || items.length === 0;

    const contentArea = (
        <Box
            ref={ref}
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 1,
                px: isLabeled ? 1.5 : 0,
                py: isLabeled ? 1 : 0,
                flex: isLabeled ? 1 : undefined,
                width: isLabeled ? undefined : "100%",
                minHeight: isLabeled ? 48 : 40,
                backgroundColor: getContentBg(isDraggedOver, isDragging, isLabeled),
                transition: 'background-color 0.15s ease',
            }}
        >
            {isEmpty ? (
                <Box sx={{ width: "100%", minHeight: isLabeled ? 40 : 40 }} />
            ) : (
                items.map((item, index) => (
                    <RankingItemCard
                        key={`${item.name ?? item.id}-${index}`}
                        item={item}
                        location={location}
                        onMoveToUnranked={onMoveToUnranked}
                        variant={isLabeled ? "card" : "chip"}
                        templateId={templateId}
                    />
                ))
            )}
        </Box>
    );

    if (!isLabeled) {
        return contentArea;
    }

    return (
        <Box display="flex" alignItems="stretch" mb={0.5} border="1px solid #333" width="100%" minHeight={isEmpty ? 48 : 80}>
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
                <Typography fontWeight={700} fontSize={36} color="#222">
                    {label}
                </Typography>
            </Box>
            {contentArea}
        </Box>
    );
}

export default RankingTier
