import { Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

export default function NavButton({ title, path, locked = false }) {
    const { pathname } = useLocation();
    const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));

    return (
        <Button
            component={Link}
            to={locked ? undefined : path}
            color="inherit"
            sx={{
                fontWeight: 500,
                fontFamily: 'Poppins, sans-serif',
                cursor: locked ? 'not-allowed' : 'pointer',
                borderBottom: isActive ? '2px solid currentColor' : '2px solid transparent',
                borderRadius: 0,
                paddingBottom: '4px',
            }}
            startIcon={locked ? <LockIcon fontSize="small" /> : null}
        >
            {title}
        </Button>
    );
}