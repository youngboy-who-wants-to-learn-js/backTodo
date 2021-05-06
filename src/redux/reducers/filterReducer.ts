import { Moment } from 'moment';
import { AnyAction } from 'redux';
import { SET_FILTER } from '../actions/todosActions/actionTypes';
import ActiveFilter from '../../common/enums';

type Filters = 'all' | 'active' | 'completed' | string;

export interface IFilterReducer {
    status: Filters;
    period: string | null;
    dateRangeFrom: Moment | string | null;
    dateRangeTo: Moment | string | null;
    activeFilter: string;
}

const initialState: IFilterReducer = {
    status: 'all',
    period: null,
    dateRangeFrom: null,
    dateRangeTo: null,
    activeFilter: ActiveFilter.period,
};

function filterReducer(state: IFilterReducer = initialState, action: AnyAction): IFilterReducer {
    switch (action.type) {
        case SET_FILTER:
            console.log('call', action.payload);
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default filterReducer;
