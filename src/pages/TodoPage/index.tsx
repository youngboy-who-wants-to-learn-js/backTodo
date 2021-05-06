import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import TodoFilters from '../../components/TodoFilters';
import TodoFooter from '../../components/TodoFooter';
import TodoHeader from '../../components/TodoHeader';
import TodoMain from '../../components/TodoMain';
import { filterTodoSaga } from '../../redux/actions/todosActions/actionCreators';
import { getFilter } from '../../redux/selectors';

const TodoPage = (): ReactElement => {
    const { status, period, dateRangeFrom, dateRangeTo, activeFilter } = useSelector(getFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filterTodoSaga());
    }, [dispatch, status, period, dateRangeFrom, dateRangeTo, activeFilter]);

    return (
        <section className="todo-app" id="todo-app">
            <Header />
            <TodoHeader />
            <TodoFilters />
            <TodoMain />
            <TodoFooter />
        </section>
    );
};

export default TodoPage;
