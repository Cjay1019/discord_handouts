import React, { useEffect, useState } from "react";
import { Avatar, Button, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, makeStyles } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import axios from "axios";
import { response } from "express";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    image: {
        cursor: "pointer"
    }
});

export default function Home() {
    const [handouts, setHandouts] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [image, setImage] = useState(false);

    const classes = useStyles();

    useEffect(async () => {
        // TODO: Try Catches
        const allHandouts = await axios.get("/api/getAllHandouts");
        setHandouts(allHandouts.data);
    }, []);

    const handleDialogOpen = (url) => {
        setOpen(true);
        setImage(url);
    }

    const handleDialogClose = () => setOpen(false);

    const sendHandout = async (handout) => {
        // TODO: Try catches
        const discordResponse = await axios.post("/api/sendHandout", handout);
        console.log(discordResponse.data);

        if (discordResponse.data.code === 200) {
            const updateBody = { id: handout.id, sent: true };
            const updateStatusResponse = await axios.post("/api/updateStatus", updateBody);
            // TODO: update state
        }
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
                        {handouts.map((handout, idx) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    <IconButton aria-label="upload" onClick={() => sendHandout(handout)}>
                                        <PublishIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <Avatar alt={handout.name} src={handout.url} variant="rounded" className={classes.image} onClick={() => handleDialogOpen(handout.url)} />
                                </TableCell>
                                <TableCell>{handout.name}</TableCell>
                                <TableCell>{handout.status}</TableCell>
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