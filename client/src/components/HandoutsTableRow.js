import React from "react";
import { Avatar, IconButton, TableCell, makeStyles } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles({
    image: {
        cursor: "pointer"
    }
});

export default function HandoutsTableRow({ handout, sendHandout, handleDialogOpen }) {
    const classes = useStyles();

    return (
        <>
            <TableCell>
                <IconButton aria-label="upload" onClick={() => sendHandout(handout)}>
                    <PublishIcon />
                </IconButton>
            </TableCell>
            <TableCell>
                <Avatar
                    alt={handout.name}
                    src={handout.url}
                    variant="rounded"
                    className={classes.image}
                    onClick={() => handleDialogOpen({ url: handout.url, name: handout.name })}
                />
            </TableCell>
            <TableCell>{handout.name}</TableCell>
        </>
    );
}