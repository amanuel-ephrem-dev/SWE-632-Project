import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
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
            <Card style={{ width: '56rem', borderRadius: '15px', border: "1.5px solid black" }} >
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <p className="text-start category-name">  {props.title}</p>
                        <p className="text-start category-text">  {props.body}</p>
                    </div>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: '12px', justifyContent: 'center', paddingRight: '20px' }}>
                        <Link to={`/my-rankings/${props.id}`} state={{ template_name: props.title }}>
                            <button className="card-button"> View </button>
                        </Link>
                        <Link to={`/compare/${props.id}`} state={{ template_name: props.title, template_id: props.template_id }}>
                            <button className="card-button"> Compare </button>
                        </Link>
                        <button className="card-button card-button-delete" onClick={() => setConfirmOpen(true)}> Delete </button>
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