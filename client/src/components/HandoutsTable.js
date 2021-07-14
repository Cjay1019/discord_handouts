import React from "react";
import { Divider, Table, TableBody, TableContainer, TableRow, Toolbar, Typography, Paper, makeStyles } from '@material-ui/core';
import axios from "axios";
import HandoutsTableRow from "./HandoutsTableRow";

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

export default function HandoutsTable({ handouts, loadHandouts, handleDialogOpen, sent }) {
    const classes = useStyles();

    const sendHandout = async handout => {
        try {
            const discordResponse = await axios.post("/api/sendHandout", handout);

            if (discordResponse.data.code !== 200) throw (discordResponse.data);

            const updateBody = { id: handout.id, fields: { sent: true } };
            const updateHandoutResponse = await axios.put("/api/updateHandout", updateBody);

            if (updateHandoutResponse.data.code !== 200) throw (updateHandoutResponse.data);

            loadHandouts();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <TableContainer component={Paper} className={classes.table}>
            <Toolbar>
                <Typography variant="h6">{sent ? "Sent" : "Unsent"}</Typography>
            </Toolbar>
            <Divider />

            <Table>
                <TableBody>
                    {handouts.map((handout, idx) => (
                        <TableRow key={idx}>
                            <HandoutsTableRow
                                handout={handout}
                                sendHandout={sendHandout}
                                handleDialogOpen={handleDialogOpen}
                                loadHandouts={loadHandouts}
                            />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}