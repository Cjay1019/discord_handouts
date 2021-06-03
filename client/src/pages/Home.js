import React, { useState } from "react";
import { Avatar, Button, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';
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
    const classes = useStyles();

    const labels = ["First", "Second", "Third", "Forth"];

    const mockData = [
        { url: "https://media-waterdeep.cursecdn.com/avatars/thumbnails/16/590/1000/1000/636376367240991526.jpeg", name: "Umber Hulk", status: "unsent" },
        { url: "https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/91/1000/1000/636252738665379794.jpeg", name: "Vampire", status: "sent" },
        { url: "https://media-waterdeep.cursecdn.com/avatars/thumbnails/16/590/1000/1000/636376367240991526.jpeg", name: "Umber Hulk", status: "unsent" },
        { url: "https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/91/1000/1000/636252738665379794.jpeg", name: "Vampire", status: "sent" }
    ];

    const testClick = () => {
        axios.post("/api/send", mockData[0]).then(res => {
            console.log(res);
        })
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
                                    <Avatar alt={item.name} src={item.url} variant="rounded" className={classes.image} />
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}