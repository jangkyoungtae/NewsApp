import { createStore } from "redux";

const SORT = "SORT";
const FONT = "FONT";
const MODE = "MODE";
const TEXT = "TEXT";
const REFR = "REFR";
const SEARCH = "SEARCH";
const changeSort = (sort) => {
    return {
        type: SORT,
        sort
    }
}
const changeSearchText = (text) => {
    return {
        type: TEXT,
        text
    }
}
const changeSearchMode = (searchmode) => {
    return {
        type: SEARCH,
        searchmode
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
const reducer = (state = { 'sort': '1', 'font': '13' ,'mode': 'false', 'refresh': '0','text':"",'searchmode': '0'}, action) => {   
    if (action.type === "SORT") {
        return {'sort':action.sort,'font':state.font,'mode': state.mode,'refresh': state.refresh,'text':state.text,'searchmode':state.searchmode};
    } else if (action.type === "FONT") {
         return {'sort':state.sort,'font':action.font,'mode': state.mode,'refresh': state.refresh,'text':state.text,'searchmode':state.searchmode};
    } else if (action.type === "MODE") {
         return {'sort':state.sort,'font':state.font,'mode': action.mode,'refresh': state.refresh,'text':state.text,'searchmode':state.searchmode};
    } else if (action.type === "REFR") {
         return {'sort':state.sort,'font':state.font,'mode': state.mode,'refresh': action.refresh,'text':state.text,'searchmode':state.searchmode};
    }else if (action.type === "TEXT") {
         return {'sort':state.sort,'font':state.font,'mode': state.mode,'refresh': state.refresh,'text':action.text,'searchmode':state.searchmode};
    }else if (action.type === "SEARCH") {
         return {'sort':state.sort,'font':state.font,'mode': state.mode,'refresh': state.refresh,'text':state.text,'searchmode':action.searchmode};
    }else {
        return state;
    }
}
const store = createStore(reducer);

export const actionCreators = {
    changeSort,
    changeFontSize,
    changeMode,
    changeRefresh,
    changeSearchText,
    changeSearchMode

}

export default store;