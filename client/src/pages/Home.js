import React, { useEffect, useState } from "react";
import { Container, Dialog, Fab, Tooltip, Zoom, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
import HandoutsTable from "../components/HandoutsTable";
import HandoutForm from "../components/HandoutForm";

const useStyles = makeStyles(theme => ({
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

export default function Home() {
    const [handouts, setHandouts] = useState([]);
    const [dialogIsOpen, setDialogOpen] = useState(false);
    const [formIsOpen, setFormOpen] = useState(false);
    const [image, setImage] = useState(false);

    useEffect(() => loadHandouts(), []);

    const classes = useStyles();

    const loadHandouts = async () => {
        try {
            const allHandouts = await axios.get("/api/getAllHandouts");
            setHandouts(allHandouts.data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleDialogOpen = image => {
        setDialogOpen(true);
        setImage(image);
    }

    const handleDialogClose = () => setDialogOpen(false);

    const openForm = () => setFormOpen(true);

    const renderTables = () => {
        const sentHandouts = handouts.filter(handout => handout.sent);
        const unsentHandouts = handouts.filter(handout => !handout.sent);

        return (
            <>
                {sentHandouts.length > 0 &&
                    <HandoutsTable
                        handouts={sentHandouts}
                        loadHandouts={loadHandouts}
                        handleDialogOpen={handleDialogOpen}
                        sent={true}
                    />}
                {unsentHandouts.length > 0 &&
                    <HandoutsTable
                        handouts={unsentHandouts}
                        loadHandouts={loadHandouts}
                        handleDialogOpen={handleDialogOpen}
                        sent={false}
                    />}
            </>
        );
    }

    return (
        <Container maxWidth="md">
            {renderTables()}
            <Dialog open={dialogIsOpen} onClose={handleDialogClose}>
                <img src={image.url} alt={image.name} />
            </Dialog>
            <Tooltip TransitionComponent={Zoom} title="Add handout" placement="left">
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={openForm}><AddIcon /></Fab>
            </Tooltip>
            <HandoutForm
                formIsOpen={formIsOpen}
                setFormOpen={setFormOpen}
            />
        </Container>
    );
}