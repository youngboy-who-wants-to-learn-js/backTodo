import { Button, ButtonGroup } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useTodosLength from '../../common/customHook/useTodosLength';
import upperFirtsLetter from '../../common/utils/upperFirtsLetter';
import { deleteCompletedSaga, setFilter } from '../../redux/actions/todosActions/actionCreators';
import { AppStateType } from '../../redux/reducers/rootReducers';

const TodoFooter = (): ReactElement => {
    const dispatch = useDispatch();
    const { status } = useSelector((state: AppStateType) => state.filter);
    const { activeTodos } = useTodosLength();
    const handlerDeleteCompleted = () => dispatch(deleteCompletedSaga());

    const handlerFilter = (filterItem: string) => dispatch(setFilter({ status: filterItem }));

    const allButton = ['all', 'active', 'completed'].map((filterItem) => (
        <Button
            onClick={() => handlerFilter(filterItem)}
            className="filters__item "
            color={status === filterItem ? 'secondary' : 'primary'}
            key={filterItem}
        >
            {upperFirtsLetter(filterItem)}
        </Button>
    ));

    return (
        <footer className="footer">
            <>
                <div>
                    <span id="items-count">{activeTodos}</span> items left
                </div>
                <ButtonGroup aria-label="outlined secondary button group">{allButton}</ButtonGroup>
                <Button onClick={handlerDeleteCompleted} className="clear-completed">
                    Clear Completed
                </Button>
            </>
        </footer>
    );
};

export default TodoFooter;
