import ActiveFilter from '../../enums';
import callPrivateAPI from '../callPrivateAPI';
import { CallPrivateAPIReturn, IFilterPayload } from '../types';

const filterTodoAPI = async (filtersPayload: IFilterPayload): Promise<CallPrivateAPIReturn> => {
    const { status, period, dateRangeFrom, dateRangeTo, activeFilter } = filtersPayload;
    const periodUrl = period ? `&period=${period}` : '';
    const dateRange =
        dateRangeFrom && dateRangeTo
            ? `&dateRangeFrom=${dateRangeFrom}&dateRangeTo=${dateRangeTo}`
            : '';

    let url = `/todos?filter=${status}`;
    if (activeFilter === ActiveFilter.period) {
        url = `/todos?filter=${status}${periodUrl}`;
    }
    if (activeFilter === ActiveFilter.dateRange) {
        url = `/todos?filter=${status}${dateRange}`;
    }
    return callPrivateAPI({
        url,
        options: {
            method: 'GET',
            headers: {},
        },
    });
};

export default filterTodoAPI;
