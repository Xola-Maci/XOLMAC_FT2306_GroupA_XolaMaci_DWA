//@ts-check
/**
 * Create a basic store for managing application state.
 * @param {function} reducer - A function that specifies how the state should change in response to actions.
 * @returns {Object} An object representing the store with methods for getting the state, dispatching actions, and subscribing to state changes.
 */
const storeCreate = (reducer) => {
    let state = undefined;
    const subscribers = [];

    /**
     * Get the current state of the store.
     * @returns {any} The current state of the application.
     */
    const getState = () => state;

    /**
     * Dispatch an action to update the state based on the provided reducer function.
     * @param {Object} action - An action object that describes the type of action and any associated data.
     */
    const dispatch = (action) => {
        state = reducer(state, action);
        subscribers.forEach((subscriber) => subscriber());
    };

    /**
     * Subscribe a function to be called whenever the state changes.
     * @param {Function} subscriber - A function to be called when the state changes.
     */
    const subscribe = (subscriber) => {
        subscribers.push(subscriber);
    };

    return {
        getState,
        dispatch,
        subscribe,
    };
}


/**
 * Action Creator for adding.
 * @returns {Object} Action object with type 'ADD'.
 */
const add = () => {
    return {
        type: 'ADD',
    };
}

/**
 * Action Creator for subtracting.
 * @returns {Object} Action object with type 'SUBTRACT'.
 */
const subtract = () => {
    return {
        type: 'SUBTRACT',
    };
}

/**
 * Action Creator for resetting.
 * @returns {Object} Action object with type 'RESET'.
 */
const reset = () => {
    return {
        type: 'RESET',
    };
}

// Reducer

/**
 * Initial state for the counter.
 * @type {{count: number}}
 */
const initialState = {
    count: 0
}

/**
 * Reducer for the counter.
 * @param {Object} state - Current state.
 * @param {Object} action - Action to perform.
 * @returns {Object} New state.
 */
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD':
            return { ...state, count: state.count + 1 };

        case 'SUBTRACT':
            return { ...state, count: state.count - 1 };

        case 'RESET':
            return { ...state, count: 0 };

        default:
            return state;
    }
}

// Store --> Globalized state
const store = storeCreate(counterReducer);

// Subscribers
const subscribers = [];

/**
 * Subscribe to changes in the store.
 * @param {Function} subscriber - A function to be called on state changes.
 */
const subscribe = (subscriber) => {
    subscribers.push(subscriber);
};

/**
 * Unsubscribe from changes in the store.
 * @param {Function} subscriber - A function to be removed from subscribers.
 */
const unsubscribe = (subscriber) => {
    const index = subscribers.indexOf(subscriber);
    if (index !== -1) {
        subscribers.splice(index, 1);
    }
};

// DISPATCH

// Scenario 1
subscribe(() => {
    console.log(store.getState().count);
});
store.dispatch(add());

// Scenario 2
subscribe(() => {
    console.log(store.getState().count);
});
store.dispatch(add());
store.dispatch(add());

// Scenario 3
subscribe(() => {
    console.log(store.getState().count);
});
store.dispatch(subtract());

// Scenario 4
subscribe(() => {
    console.log(store.getState().count);
});
store.dispatch(reset());

// Example Unsubscribe
unsubscribe(subscribers[0]);
