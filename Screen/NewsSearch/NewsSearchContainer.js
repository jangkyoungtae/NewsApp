import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewsSearchPresenter from "./NewsSearchPresenter";
function NewsSearchContainer({ sort, mode, font,route }) {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.addListener('focus',() => {
            console.log(route.backData);
        })
    },[])
    return (
        <NewsSearchPresenter
            sort={sort}
            mode={mode}
            font={font}
            backData={route.backData}
        />
    )
}
function mapStateToProps(state) {
    return {
        sort: state.sort,
        font: state.font,
        mode: state.mode,
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        changeSort: sort => dispatch(actionCreators.changeSort(sort)),
        changeFontSize: (font) => dispatch(actionCreators.changeFontSize(font)),
        changeMode : (mode) =>dispatch(actionCreators.changeMode(mode)),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(NewsSearchContainer);