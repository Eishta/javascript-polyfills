import React from "react";

const connect = (mapStateToProps, mapDispatchToProps) => Component => {
    class Connect extends React.Component {
        constructor(props) {
            super(props);

            this.state = props.store.getState();
        }

        componentDidMount() {
            this.props.store.subscribe(state => {
                this.setState(state);
            });
        }

        render() {
            const { store } = this.props;

            return (
                <Component
                    {...this.props}
                    {...mapStateToProps(store.getState())}
                    {...mapDispatchToProps(store.dispatch)}
                />
            );
        }
    }

    return props => (
        <ReduxContext.Consumer>
            {store => <Connect {...props} store={store} />}
        </ReduxContext.Consumer>
    );
};

const ReduxContext = React.createContext("redux");

const Provider = ({ store, children }) => (
    <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
);

/**
 * Creates a Redux store which will hold all our application
 * state.
 */
const createStore = reducer => {
    /**
     * This is where our global application state
     * will live.
     *
     * Notice the use of `let` here -- we won't ever
     * be mutating the state directly but instead
     * replacing it with the next state each time.
     */
    let state

    /**
     * This will hold a list of referneces to listener
     * functions that we'll fire when the state changes.
     *
     * Any time a part of our UI subscribes to our store,
     * we'll add that to this list.
     */
    const listeners = []

    /**
     * Returns the current state of the Store.
     */
    const getState = () => state

    /**
     * Dispatches an action to trigger a state change
     * and then invokes all listeners.
     */
    const dispatch = action => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())

        /**
         * We return the Action so that we can chain Actions
         * in other parts of our application.
         */
        return action
    }

    /**
     * Add a subscription to our list of listeners.
     */
    const subscribe = listener => {
        listeners.push(listener)

        /**
         * Return an unsubscribe function to allow consumers
         * to remove the given listener.
         */
        return function unsubscribe() {
            const idx = listeners.indexOf(listener)
            listeners.splice(idx, 1)
        }
    }

    return { getState, dispatch, subscribe }
}

// const appReducer = combineReducer({ user: userReducer, cart: cartReducer })

/**
 * Combines multiple reducers that deal with individual
 * slices of state into one big app reducer.
 *
 * This composed reducer is typically what is fed into
 * `createStore`.
 */
const combineReducers = reducers => {
    const reducerKeys = Object.keys(reducers)
    function combinedReducer(state = {}, action) {
        const nextState = {}
        reducerKeys.forEach(key => {
            nextState[key] = reducers[key](state[key], action)
        })
        return nextState
    }

    return combinedReducer
}
/**
 * Wraps `dispatch` functions with the provided middleware
 * functions. Notice the curried functions.
 */
const applyMiddleware = (...middlewares) => {
    return createStore => reducer => {
        const store = createStore(reducer)
        return {
            ...store,
            dispatch: function dispatch(action) {
                /**
                 * Replace `store.dispatch` with `next` if you need to
                 * support composed middlewares.
                 */
                return middlewares(store)(store.dispatch)(action)
            },
        }
    }
}

/**
 * Wraps Action Creators in `dispatch` calls for the consumer so
 * that they don't have to call `store.dispatch(ActionCreator.something())`
 * each time.
 */
const bindActionCreators = (actionCreators, dispatch) => {
    const boundedActionCreators = {}
    const actionKeys = Object.keys(actionCreators)
    actionKeys.forEach(key => {
        const actionCreator = actionCreators[key]
        boundedActionCreators[key] = function boundedActionCreator() {
            return dispatch(actionCreator.apply(this, arguments))
        }
    })
    return boundedActionCreators
}
export { createStore, combineReducers, Provider, connect, applyMiddleware, bindActionCreators };



/********************************************Example combine reducer */
const initialState = {
    profile: {},
    loggedIn: false,
    lastUpdated: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOG_IN":
            return {
                ...state,
                profile: action.profile,
                loggedIn: true,
                lastUpdated: Date.now()
            }

        case "LOG_OUT":
            return {
                ...state,
                profile: {},
                loggedIn: false,
                lastUpdated: Date.now()
            }

        default:
            return state
    }
}
const initialState = {
    items: [],
    lastUpdated: null
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.itemToAdd],
                lastUpdated: Date.now()
            }

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item === action.itemToRemove),
                lastUpdated: Date.now()
            }

        default:
            return state
    }
}
import { createStore, combineReducers } from "redux"

const appReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
})

const store = createStore(appReducer)
const state = {
    user: {
        profile: {},
        loggedIn: false,
        lastUpdated: null,
    },
    cart: {
        items: [],
        lastUpdated: null,
    },
}

// Code for redux-thunk

function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => (next) => (action) => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }

        return next(action);
    };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;

// use of bindActioncreator
import { bindActionCreators } from "redux"
import { userActions, cartActions } from "./actions"
import store from "./store"

const boundedUserActions = bindActionCreators(userActions, store.dispatch)

const boundedCartActions = bindActionCreators(cartActions, store.dispatch)

// Dispatching Actions
boundedUserActions.logIn(profile)
boundedUserActions.logOut()
boundedCartActions.addItem(item)