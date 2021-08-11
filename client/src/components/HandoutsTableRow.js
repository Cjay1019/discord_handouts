import React, { useContext, useState } from "react";
import { Avatar, Button, CircularProgress, Dialog, DialogActions, DialogTitle, IconButton, TableCell, Tooltip, Zoom, makeStyles, Typography } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PublishIcon from '@material-ui/icons/Publish';
import axios from "axios";
import { HandoutContext } from "../contexts/HandoutContext";

const useStyles = makeStyles(theme => ({
    image: {
        cursor: "pointer"
    },
    deleteButton: {
        color: theme.palette.error.main
    },
    cancelButton: {
        color: theme.palette.primary.main
    },
    spinner: {
        width: "36px !important",
        height: "36px !important",
        marginRight: "16px !important",
        marginLeft: "24px !important"
    }
}));

export default function HandoutsTableRow({ handout, sendHandout, handleDialogOpen, loadHandouts, openForm }) {
    const classes = useStyles();
    const [, setHandout] = useContext(HandoutContext);
    const [isOpen, setOpen] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const deleteHandout = async () => {
        setDeleting(true);
        try {
            const deleteResponse = await axios.post("/api/deleteHandout", handout);

            if (deleteResponse.data.code !== 200) throw (deleteResponse.data);

            setOpen(false);
            loadHandouts();
        } catch (err) {
            setDeleting(false);
            console.error(err);
        }
    }

    const editHandout = () => {
        setHandout(handout);
        openForm();
    }

    return (
        <>
            <TableCell width="10%">
                <Tooltip TransitionComponent={Zoom} title="Send handout" placement="top" enterDelay={500}>
                    <IconButton aria-label="upload" onClick={() => sendHandout(handout)}>
                        <PublishIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell width="10%">
                <Avatar
                    alt={handout.name}
                    src={handout.url}
                    variant="rounded"
                    className={classes.image}
                    onClick={() => handleDialogOpen({ url: handout.url, name: handout.name })}
                />
            </TableCell>
            <TableCell>
                <Typography>{handout.name}</Typography>
            </TableCell>
            <TableCell align="right">
                <Tooltip TransitionComponent={Zoom} title="Edit handout" placement="top" enterDelay={500}>
                    <IconButton aria-label="edit" onClick={editHandout}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip TransitionComponent={Zoom} title="Delete handout" placement="top" enterDelay={500}>
                    <IconButton aria-label="delete" onClick={() => setOpen(true)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </TableCell>

            <Dialog
                open={isOpen}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Delete ${handout.name}?`}</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} className={classes.cancelButton}>Cancel</Button>
                    {isDeleting ? <CircularProgress className={classes.spinner} /> : <Button onClick={deleteHandout} autoFocus className={classes.deleteButton}>Delete</Button>}
                </DialogActions>
            </Dialog>
        </>
    );
}