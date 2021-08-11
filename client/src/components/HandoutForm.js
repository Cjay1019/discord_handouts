import React, { useContext, useEffect, useState } from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField, Switch, makeStyles } from '@material-ui/core';
import axios from "axios";
import { HandoutContext } from "../contexts/HandoutContext";

const useStyles = makeStyles({
    spinner: {
        width: "36px !important",
        height: "36px !important",
        marginRight: "16px !important",
        marginLeft: "24px !important"
    }
});

export default function HandoutForm({ formIsOpen, setFormOpen, loadHandouts }) {
    const classes = useStyles();
    const [isCreating, setCreating] = useState(false);
    const [staticName, setStaticName] = useState("");
    const [handout, setHandout] = useContext(HandoutContext);

    useEffect(() => setStaticName(handout.name), [handout.name]);

    const handleChange = e => setHandout({ ...handout, [e.target.name]: e.target.value || !e.target.checked });

    const isUpdating = () => !!handout.id;

    const readyToCreate = () => handout.name && handout.url;

    const resetForm = () => setHandout({ id: "", name: "", url: "", hideName: false });

    const handleCreate = async () => {
        setCreating(true);

        try {
            const newHandout = { name: handout.name, url: handout.url, hideName: handout.hideName };
            const createResponse = await axios.post("/api/createHandout", newHandout);

            if (createResponse.data.code !== 200) throw (createResponse.data);

            setFormOpen(false);
            setTimeout(() => setCreating(false), 250);
            resetForm();
            loadHandouts();
        } catch (err) {
            setCreating(false);
            console.log(err);
        }
    }

    const handleUpdate = async () => {
        const updatedHandout = {
            id: handout.id,
            fields: { name: handout.name, url: handout.url, hideName: handout.hideName }
        }
        setCreating(true);

        try {
            const updateResponse = await axios.put("/api/updateHandout", updatedHandout);

            if (updateResponse.data.code !== 200) throw updateResponse.data;

            setFormOpen(false);
            setTimeout(() => setCreating(false), 250);
            resetForm();
            loadHandouts();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Dialog open={formIsOpen} onClose={() => setFormOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{isUpdating() ? `Update ${staticName}` : "Create new handout"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoComplete="off"
                    autoFocus
                    name="name"
                    value={handout.name}
                    margin="dense"
                    variant="outlined"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    autoComplete="off"
                    name="url"
                    value={handout.url}
                    margin="dense"
                    variant="outlined"
                    id="url"
                    label="Image URL"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                />
                <FormGroup row>
                    <FormControlLabel
                        control={<Switch checked={!handout.hideName} onChange={handleChange} name="hideName" />}
                        label="Send name to Discord"
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setFormOpen(false)} color="primary">
                    Cancel
                </Button>
                {isCreating
                    ? <CircularProgress className={classes.spinner} />
                    : <Button onClick={() => isUpdating() ? handleUpdate() : handleCreate()} color="primary" disabled={!readyToCreate()}>
                        {isUpdating() ? "Update" : "Create"}
                    </Button>}
            </DialogActions>
        </Dialog>

    );
}