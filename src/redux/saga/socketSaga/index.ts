import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import socket from '../../../common/api/socket';
import { getUserStorage } from '../../../common/utils/tokens';
import { setSockedId } from '../../actions/authActions/actionCreators';
import store from '../../store';
import eventHandlers from './eventHandlers';

function connect() {
    return new Promise((resolve) => {
        socket.on('connect', () => {
            const user = getUserStorage();
            if (user) {
                store.dispatch(setSockedId(socket.id));
                socket.emit('connect-id', { userId: user.id, socketId: socket.id });
            }
            console.log('socket bly', socket);
            resolve(socket);
        });
    });
}

interface IEventType {
    type: string;
}

interface IEvent extends IEventType {
    payload: unknown;
}

// eslint-disable-next-line
function* createSocketChannel(socket: any): Generator {
    return eventChannel((emit) => {
        const eventHandler = (event: IEvent) => {
            if (event) {
                console.log('event', event);
                emit(event);
            }
            console.log('socket emit:', event);
        };
        socket.on('event', eventHandler);
        const unsubscribe = () => {
            socket.off('event', eventHandler);
        };

        return unsubscribe;
    });
}

function* watchOnEventHandlers(): Generator {
    const socketClient = yield call(connect);
    const socketChannel: any = yield call(createSocketChannel, socketClient);
    console.log('tyt watchOnEventHandlers');
    while (true) {
        try {
            const payload = yield take(socketChannel);
            console.log('watchsocket payload', payload);
            // @ts-ignore
            yield put(eventHandlers(payload));
        } catch (err) {
            console.error('socket error:', err);
            // socketChannel.close()
        }
    }
}

export default watchOnEventHandlers;
