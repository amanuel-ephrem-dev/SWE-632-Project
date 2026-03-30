import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material"
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"

import RankingItemCard from "./RankingItemCard";

function getColor(isDraggedOver, isDragging) {
    if (isDraggedOver) return 'skyblue';
    if (isDragging) return '#e8f4fd';
    return 'white';
}

function RankingTier({ items, location, onMoveToUnranked, isDragging }) {
    const ref = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);

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

    return (
        <Box
            ref={ref}
            sx={{
                display: 'flex',
                // gap: 1,
                width: "100%",
                flexWrap: 'wrap',
                minHeight: 26, 
                backgroundColor: getColor(isDraggedOver, isDragging),
                // backgroundColor: 'blue',
                alignItems: 'center'
            }}
        >
            {!items || items.length === 0 ? (
                <Box
                    sx={{
                        width: "100%",
                        minHeight: 40, 
                    }}
                >
                    {/* Empty area to allow drop */}
                </Box>
            ) : (
                items.map((item, index) => (
                    <RankingItemCard 
                        key={`${item}-${index}`} 
                        item={item}
                        location={location} 
                        onMoveToUnranked={onMoveToUnranked}
                    />
                ))
            )}
        </Box>
    )
}

export default RankingTier
