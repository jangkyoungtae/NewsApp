import { createStore } from "redux";

const SORT = "SORT";
const FONT = "FONT";
const MODE = "MODE";
const REFR = "REFR";

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
const changeMode = (mode) => {
    return {
        type: MODE,
        mode
    }
}
const changeRefresh = (refresh) => {
    return {
        type: REFR,
        refresh
    }
}
const reducer = (state = { 'sort': '1', 'font': 13 ,'mode': 'false', 'refresh': '0'}, action) => {   
    if (action.type === "SORT") {
        return {'sort':action.sort,'font':state.font,'mode': state.mode,'refresh': state.refresh};
    } else if (action.type === "FONT") {
         return {'sort':state.sort,'font':action.font,'mode': state.mode,'refresh': state.refresh};
    } else if (action.type === "MODE") {
         return {'sort':state.sort,'font':state.font,'mode': action.mode,'refresh': state.refresh};
    } else if (action.type === "REFR") {
         return {'sort':state.sort,'font':state.font,'mode': state.mode,'refresh': action.refresh};
    }else {
        return state;
    }
}
const store = createStore(reducer);

export const actionCreators = {
    changeSort,
    changeFontSize,
    changeMode,
    changeRefresh

}

export default store;