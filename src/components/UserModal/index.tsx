import { Backdrop, Button, Fade, Modal } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

interface IUserModal {
    open: boolean;
    handleToggle: () => void;
    contacts: {
        age: string;
        phone: string | number;
        address: string;
    };
}

const UserModal = ({ open, handleToggle, contacts }: IUserModal): ReactElement => {
    const useStyles = makeStyles((theme) =>
        createStyles({
            modal: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            paper: {
                backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
            },
            div: {
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
            },
        }),
    );
    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleToggle}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Contacts Info</h2>
                    <div className="contacts-info">
                        <ul>
                            <li>Mobile: {contacts.phone}</li>
                            <li>Age: {contacts.age}</li>
                            <li>Address: {contacts.address}</li>
                        </ul>
                    </div>
                    <div className={classes.div}>
                        <Button onClick={handleToggle} variant="contained" color="secondary">
                            Close
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
};

export default UserModal;
