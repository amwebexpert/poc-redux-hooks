import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { IUserState, userReducer } from '../reducers/user.reducer';

export interface IApplicationState {
    userState: IUserState,
    localeCode: string;
}

class StoreFactory {
    public init(): Store {
        const logger = createLogger({/** Logger options */ });
        const middlewares = [logger];
        const reducers = combineReducers({
            userState: userReducer,
        });

        const composeEnhancers =
            typeof window === 'object' &&
                (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
                (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

        const storeInstance = createStore(reducers, {}, composeEnhancers(
            applyMiddleware(...middlewares)
        ));

        return storeInstance;
    }
}

export const store = new StoreFactory().init();
