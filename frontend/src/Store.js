import { combineReducers, legacy_createStore } from 'redux';
const managecard = (state = 0, action) => {
    if (action.type === "plus") {

        return state + 1;
    }
    else if (action.type === "minus") {
        return state - 1;
    }
    else if (action.type === "initial") {
        return action.initialdata;
    }
    else return state;
}
const rootReducer = combineReducers({
    managecard
})
const store = legacy_createStore(rootReducer);
export default store;

