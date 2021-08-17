import { createStore } from "redux";

const SORT = "SORT";
const FONT = "FONT";
const changeSort = (sort) => {
    return {
        type: SORT,
        sort
    }
}
const changeFontSize = (font) => {
    return {
        type: FONT,
        font
    }
}
const reducer = (state = { 'sort': '1', 'font': 13 }, action) => {
    console.log(action.type);
    if (action.type === "SORT") {
        return {'sort':action.sort,'font':state.font};
    } else if (action.type === "FONT") {
         return {'sort':state.sort,'font':action.font};
    } else {
        return state;
    }
}
const store = createStore(reducer);

export const actionCreators = {
    changeSort,
    changeFontSize

}

export default store;