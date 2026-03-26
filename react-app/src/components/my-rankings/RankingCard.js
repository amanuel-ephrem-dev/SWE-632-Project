import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { DeleteOutline } from '@mui/icons-material';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useApi } from 'contexts/ApiContext';
import "components/my-rankings/RankingCard.css"


function RankingCard(props) {
    const { SERVER_URL } = useApi();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/delete/tier-list/${props.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete tier list');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting tier list:', error);
        } finally {
            setConfirmOpen(false);
        }
    };

    return (
        <>
            <Card style={{ width: '40rem', borderRadius: '15px', border: "1.5px solid black" }} >
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <p className="text-start category-name">  {props.title}</p>
                        <p className="text-start category-text">  {props.body}</p>
                    </div>
                    <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                        <Link to={`/my-rankings/${props.id}`} state={{ template_name: props.title }}>
                            <button className="card-button" style={{ margin: '0px 20px 0px 20px' }}> View </button>
                        </Link>
                        <Link to={`/compare/${props.id}`} state={{ template_name: props.title, template_id: props.template_id }}>
                            <button className="card-button" style={{ width: "8rem", height: "2.6rem" }}> Compare </button>
                        </Link>
                        <IconButton
                            onClick={() => setConfirmOpen(true)}
                            sx={{
                                color: 'grey',
                                transition: 'transform 0.2s ease, color 0.2s ease',
                                '&:hover': {
                                    transform: 'scale(1.3)',
                                    color: '#d32f2f',
                                    background: 'transparent',
                                },
                            }}
                        >
                            <DeleteOutline fontSize="medium" />
                        </IconButton>
                    </div>
                </div>
            </Card>

            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Delete Tier List?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete <strong>{props.title}</strong>? This cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)} color="inherit" sx={{ color: '#212121' }}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default RankingCard