import { createStore } from "redux";

const SORT = "SORT";
const changeSort = (sort) => {
    return {
        type: SORT,
        sort
    }
}
const reducer = (state='1',action) => {
    if (action.type === "SORT") {
        return action.sort;
    } else {
        return state;
    }
}

const store = createStore(reducer);

export const actionCreators = {
    changeSort
}

export default store;