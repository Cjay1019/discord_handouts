import React from "react";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton, TableCell, TextField, Switch, makeStyles } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';

export default function HandoutForm({ formIsOpen, setFormOpen }) {
    return (
        <Dialog open={formIsOpen} onClose={() => setFormOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New Handout</DialogTitle>
            <DialogContent>
                <TextField
                    autoComplete="off"
                    autoFocus
                    name="name"
                    // value={}
                    margin="dense"
                    variant="outlined"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                // onChange={handleChange}
                />
                <TextField
                    autoComplete="off"
                    autoFocus
                    name="url"
                    // value={}
                    margin="dense"
                    variant="outlined"
                    id="url"
                    label="Image URL"
                    type="text"
                    fullWidth
                // onChange={handleChange}
                />
                <FormGroup row>
                    <FormControlLabel
                        control={<Switch />}
                        label="Send name to Discord"
                    />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setFormOpen(false)} color="primary">
                    Cancel
                </Button>
                {/* {isCreating
                    ? <CircularProgress className={classes.spinner} />
                    : <Button onClick={() => isUpdating() ? handleUpdate() : handleCreate()} color="primary" disabled={!readyToCreate()}>
                        {isUpdating() ? "Update" : "Create"}
                    </Button>} */}
            </DialogActions>
        </Dialog>

    )
}