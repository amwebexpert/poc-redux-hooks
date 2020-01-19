import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { IUserState, userReducer } from '../reducers/user.reducer';

const logger = createLogger({
    // ...options
});

export interface IApplicationState {
    userState: IUserState,
    localeCode: string;
}

class StoreFactory {
    public init(): Store {
        const reducers = combineReducers({
            userState: userReducer
        });

        const storeInstance = createStore(reducers, {}, applyMiddleware(logger));

        return storeInstance;
    }
}

export const store = new StoreFactory().init();
