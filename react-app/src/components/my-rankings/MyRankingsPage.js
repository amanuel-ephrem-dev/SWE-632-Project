import { Container, Typography, Box, Button } from '@mui/material';
import RankingCard from 'components/my-rankings/RankingCard'
import 'components/my-rankings/MyRankingsPage.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { useApi } from 'contexts/ApiContext';

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
})

// Helper function to convert UTC to EST
const convertToEST = (timestamp) => {
    const date = new Date(timestamp);
    date.setHours(date.getHours() - 5);
    return date;
}

export default function MyRankingsPage() {
    const { SERVER_URL } = useApi();
    const { userId } = useAuth();
    const [dataItems, setDataItems] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/tier-lists/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                // Always check if the response is okay (status 200-299)
                if (!response.ok) {
                    console.log(`HTTP error ${response.status}`)
                }

                const data = await response.json();
                setDataItems(data)
            } catch (err) {
                console.log(err.message)
            }
        };

        fetchUsers();
    }, [SERVER_URL, userId]);


    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: 'center', mt: 8 }}>
                <Typography variant="h3" fontWeight="bold">
                    My Rankings
                </Typography>

                {/* Adds whitespace*/}
                <div style={{ padding: "10px", paddingTop: "10px" }}>
                    <p></p>
                </div>

                <div className="vertical-stack">

                    {dataItems.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                            <Typography variant="h6" fontWeight="bold">
                                You don’t have any rankings yet
                            </Typography>

                            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                                Get started by creating your first ranking.
                            </Typography>

                            <Button
                                component={Link}
                                to="/templates"
                                variant="contained"
                                sx={{
                                    mt: 1,
                                    px: 4,
                                    py: 1.4,
                                    borderRadius: '999px',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    backgroundColor: 'black',
                                    color: 'white',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        backgroundColor: '#222',
                                        boxShadow: 'none',
                                    },
                                }}
                            >
                                Get Started
                            </Button>
                        </div>
                    ) : (
                        dataItems
                            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                            .map(key => (
                                <div key={key.id}>
                                    <div className="centered-horizontally">
                                        <RankingCard
                                            title={key.template_name}
                                            body={DATE_FORMATTER.format(convertToEST(key.created_at))}
                                            id={key.id}
                                            template_id={key.template_id}
                                        />
                                    </div>

                                    <div style={{ paddingTop: "5px" }}>
                                        <p></p>
                                    </div>
                                </div>
                            ))
                    )}

                </div>

            </Box>
        </Container>
    );
}