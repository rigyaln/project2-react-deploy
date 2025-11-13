import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxHeight: '80vh',
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PeopleModal(prop) { /* prop is all the data from p in the peopleGroup */
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <img src={prop.imagePath} alt="person" onClick={handleOpen} />
            <br/>
            <Button onClick={handleOpen}>{prop.name}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <img 
                        src={prop.imagePath} 
                        alt={prop.name}
                        style={{width: '150px', display: 'block', margin: '0 auto 20px'}}
                    />
                    
                    <Typography variant="h4" component="h2" sx={{fontWeight: 'bold', mb: 1}}>
                        {prop.name}
                    </Typography>
                    
                    {prop.title && (
                        <Typography variant="h6" component="p" sx={{mb: 1}}>
                            {prop.title}
                        </Typography>
                    )}
            
                    {prop.tagline && (
                        <Typography variant="h6" component="p" sx={{mb: 2, fontStyle: 'italic'}}>
                            {prop.tagline}
                        </Typography>
                    )}
                
                    {prop.interestArea && (
                        <Typography variant="body1" sx={{mb: 1}}>
                            <strong>Interest Areas:</strong> {prop.interestArea}
                        </Typography>
                    )}
                    
                    {prop.office && (
                        <Typography variant="body1" sx={{mb: 1}}>
                            <strong>Office:</strong> {prop.office}
                        </Typography>
                    )}
                    
                    {prop.phone && (
                        <Typography variant="body1" sx={{mb: 1}}>
                            <strong>Phone:</strong> {prop.phone}
                        </Typography>
                    )}
                
                    {prop.email && (
                        <Typography variant="body1" sx={{mb: 1}}>
                            <strong>Email:</strong> <a href={`mailto:${prop.email}`}>{prop.email}</a>
                        </Typography>
                    )}
        
                    {prop.website && (
                        <Typography variant="body1" sx={{mb: 1}}>
                            <strong>Website:</strong> <a href={prop.website} target="_blank" rel="noopener noreferrer">
                                {prop.website}
                            </a>
                        </Typography>
                    )}
    
                    {prop.twitter && (
                        <Typography variant="body1" sx={{mb: 1}}>
                            <strong>Twitter:</strong> <a href={`https://twitter.com/${prop.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                                {prop.twitter}
                            </a>
                        </Typography>
                    )}
                    
                    {prop.facebook && (
                        <Typography variant="body1" sx={{mb: 1}}>
                            <strong>Facebook:</strong> <a href={`https://facebook.com/${prop.facebook}`} target="_blank" rel="noopener noreferrer">
                                {prop.facebook}
                            </a>
                        </Typography>
                    )}
                </Box>
            </Modal>
        </div>
    );
}