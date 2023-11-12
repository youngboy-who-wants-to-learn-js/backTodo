import {
    addNewTodo,
    setTodos,
    deleteTodo,
    deleteCompleted,
    updateTodo,
    toggleAll,
} from '../../actions/todosActions/actionCreators';
import { changeRoleRequest, blockUser } from '../../actions/usersActions/actionCreators';
import { socketTodosEvents, socketUsersEvents } from '../../../common/enums/socketEvents';
// @ts-ignore
function eventHandlers(payload) {
    switch (payload.type) {
        case socketTodosEvents.add:
            return addNewTodo(payload.payload);
        case socketTodosEvents.get:
            return setTodos(payload.payload);
        case socketTodosEvents.delete:
            return deleteTodo(+payload.payload.id);
        case socketTodosEvents.deleteCompltd:
            return deleteCompleted(payload.payload);
        case socketTodosEvents.update:
            return updateTodo(payload.payload.id, payload.payload);
        case socketTodosEvents.toggleall:
            return toggleAll(payload.payload);
        case socketUsersEvents.assignRole:
            return changeRoleRequest(payload.payload);
        case socketUsersEvents.userStatus:
            return blockUser(payload.payload);
        default:
            return new Error('Error in eventHandlers');
    }
}

export default eventHandlers;
