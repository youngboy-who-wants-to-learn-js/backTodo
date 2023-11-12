import MomentUtils from '@date-io/moment';
import { FormControl, InputLabel, MenuItem, Select, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Moment } from 'moment';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActiveFilter from '../../common/enums';
import { setFilter } from '../../redux/actions/todosActions/actionCreators';
import { getFilter } from '../../redux/selectors';

const TodoFilters = (): ReactElement => {
    const dispatch = useDispatch();
    const { period, dateRangeFrom, dateRangeTo, activeFilter } = useSelector(getFilter);

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();

    const handleChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        const active = value ? ActiveFilter.dateRange : ActiveFilter.period;
        dispatch(setFilter({ activeFilter: active }));
    };

    const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        dispatch(setFilter({ period: e.target.value as string }));
    };

    const handleDateChangeFrom = (date: Moment | null) => {
        console.log('tyt', date);
        dispatch(setFilter({ dateRangeFrom: date.toDate() }));
    };
    const handleDateChangeTo = (date: Moment | null) => {
        dispatch(setFilter({ dateRangeTo: date.toDate() }));
    };
    return (
        <div className="todo-filters">
            <div className="todo-filters__item">
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Select period</InputLabel>
                    <Select
                        disabled={activeFilter !== ActiveFilter.period}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={period}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={null}>
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value={1}>Today</MenuItem>
                        <MenuItem value={7}>Week ago</MenuItem>
                        <MenuItem value={30}>Month ago</MenuItem>
                        <MenuItem value={60}>Two months ago</MenuItem>
                        <MenuItem value={180}>Half year ago</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="todo-filters__item">
                <Switch
                    onChange={handleChangeSwitch}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </div>
            <div className="todo-filters__item">
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        disabled={activeFilter !== ActiveFilter.dateRange}
                        disableToolbar
                        name="from"
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="from"
                        value={dateRangeFrom}
                        onChange={handleDateChangeFrom}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        disabled={activeFilter !== ActiveFilter.dateRange}
                        disableToolbar
                        name="to"
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="to"
                        value={dateRangeTo}
                        onChange={handleDateChangeTo}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
        </div>
    );
};

export default TodoFilters;
