import { Box, Chip } from '@mui/material';
import { Clear, DragIndicator } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { draggable } from  '@atlaskit/pragmatic-drag-and-drop/element/adapter';

function RankingItemCard({ item, location, onMoveToUnranked }) {
    const ref = useRef(null);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        //console.log("item", item)
        console.log(`hi - ${location}`)
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
    }

    var isRanked = location !== "unranked"
    if(isRanked){
        return (
            <Box sx={{
                margin: "2px"
            }}>
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
        )
    }else{
        return (
            <Box sx={{
                margin: "2px"
            }}>
                <Chip
                    ref={ref}
                    label={item.name}
                    icon={<DragIndicator sx={{ color: 'white !important', fontSize: 16 }} />}
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
        )
    }
}

export default RankingItemCard;
