import React, { useState } from "react";
import { Avatar, Button, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, makeStyles } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import axios from "axios";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    image: {
        cursor: "pointer"
    }
});

export default function Home() {
    const [isOpen, setOpen] = useState(false);
    const [image, setImage] = useState(false);

    const classes = useStyles();

    const labels = ["First", "Second", "Third", "Forth"];

    const mockData = [
        { url: "https://media-waterdeep.cursecdn.com/avatars/thumbnails/16/590/1000/1000/636376367240991526.jpeg", name: "Umber Hulk", status: "unsent" },
        { url: "https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/91/1000/1000/636252738665379794.jpeg", name: "Vampire", status: "sent" },
        { url: "https://media-waterdeep.cursecdn.com/avatars/thumbnails/16/590/1000/1000/636376367240991526.jpeg", name: "Umber Hulk", status: "unsent" },
        { url: "https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/91/1000/1000/636252738665379794.jpeg", name: "Vampire", status: "sent" }
    ];

    const handleDialogOpen = (url) => {
        setOpen(true);
        setImage(url);
    };
    const handleDialogClose = () => setOpen(false);

    const testClick = async () => {
        const discordResponse = await axios.post("/api/send", mockData[0]);
        console.log(discordResponse);
    }

    return (
        <Container maxWidth="md">
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    {/* <TableHead>
                        <TableRow>
                            {labels.map(item => <TableCell>{item}</TableCell>)}
                        </TableRow>
                    </TableHead> */}
                    <TableBody>
                        {mockData.map((item, idx) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    <IconButton aria-label="upload" onClick={testClick}>
                                        <PublishIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Avatar alt={item.name} src={item.url} variant="rounded" className={classes.image} onClick={() => handleDialogOpen(item.url)} />
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={isOpen} onClose={handleDialogClose}>
                <img src={image} />
            </Dialog>
        </Container>
    );
}