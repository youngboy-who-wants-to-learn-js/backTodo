import {
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { USER_ROLE_ADMIN, USER_ROLE_USER } from '../../common/enums/role';
import { USER_STATUS_ACTIVE, USER_STATUS_INACTIVE } from '../../common/enums/status';
import { IFullUser } from '../../common/interfaces';
import { assignRoleUser, setStatusUser } from '../../redux/actions/usersActions/actionCreators';
import UserModal from '../UserModal';

interface IUserTable {
    users: IFullUser[];
}

export interface IConctacts {
    age: string;
    phone: string | number;
    address: string;
}

const UserTable = ({ users }: IUserTable): ReactElement => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [contacts, setContacts] = useState<IConctacts | null>();

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
            table: {
                minWidth: 600,
            },
            pointer: {
                cursor: 'pointer',
            },
        }),
    );
    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);
    const classes = useStyles();

    const handleChangeRole = (role: number, id: number) => dispatch(assignRoleUser(role, id));

    const handleChangeStatus = (status: number, id: number) => dispatch(setStatusUser(status, id));
    const handleToggle = () => setOpen(!open);
    const handleSetUserContact = (id: number) => {
        const { age, phone, address } = users.find((user: IFullUser) => user.id === id).UserContact;
        const contact = { age, phone, address };
        setContacts(contact);
    };

    const handleUserClick = (userId: number) => () => {
        handleSetUserContact(userId);
        handleToggle();
    };

    const handleChangeStatusSelect = (userId: number) => (
        e: React.ChangeEvent<{ value: unknown }>,
    ) => {
        const target = e.target as HTMLInputElement;
        const value = +target.value;
        handleChangeStatus(value, userId);
    };

    const handleChangeRoleSelect = (userId: number) => (
        e: React.ChangeEvent<{ value: unknown }>,
    ) => {
        const target = e.target as HTMLInputElement;
        const value = +target.value;
        handleChangeRole(value, userId);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>User Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Role</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user: IFullUser) => {
                            return (
                                <StyledTableRow key={user.id}>
                                    <StyledTableCell
                                        onClick={handleUserClick(user.id)}
                                        component="th"
                                        scope="row"
                                        className={classes.pointer}
                                    >
                                        {user.userName}
                                    </StyledTableCell>
                                    <StyledTableCell>{user.email}</StyledTableCell>
                                    <StyledTableCell>
                                        <Select
                                            id="status-select"
                                            defaultValue={user.status}
                                            onChange={handleChangeStatusSelect(user.id)}
                                        >
                                            <MenuItem value={USER_STATUS_ACTIVE}>active</MenuItem>
                                            <MenuItem value={USER_STATUS_INACTIVE}>
                                                inactive
                                            </MenuItem>
                                        </Select>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Select
                                            id="role-select"
                                            defaultValue={user.role}
                                            onChange={handleChangeRoleSelect(user.id)}
                                        >
                                            <MenuItem value={USER_ROLE_USER}>user</MenuItem>
                                            <MenuItem value={USER_ROLE_ADMIN}>admin</MenuItem>
                                        </Select>
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {open && <UserModal open handleToggle={handleToggle} contacts={contacts} />}
        </>
    );
};

export default UserTable;
