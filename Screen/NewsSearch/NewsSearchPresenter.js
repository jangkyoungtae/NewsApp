import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import styled from "styled-components";
import { recomendApi } from "../../api/api";
import HeadLineContent from "../../Component/HeadLineContent";
import PhotoContent from "../../Component/PhotoContent";
import RecommendContent from "../../Component/RecommendContent";
import {Picker} from '@react-native-picker/picker';
const Container = styled.View`
    flex:1;
    padding-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
`;
const SearchInput = styled.TextInput`
    height:50px;
    
    padding:10px;
`;
const SearchBox = styled.View`
    width:100%;
    flex-direction:row;
    background-color: white;
`;
export default ({sort,mode,font,backData,}) => {
    const [changeText, setChangeText] = useState("");
    const [category, setCategory] = useState("business");
    const [newsData, setNewsData] = useState({
        loading:true,
        newsContents:[],
        newsContentsError:[]
    });
    if (backData !== undefined && backData !== "") {
        console.log(backData);
        //searchNewsBack(backData);
    }
    const searchNews = async () => {
         setNewsData({
            loading: true,
            newsContents:[],
            newsContentsError:[]
        });
        
        const [newsContents, newsContentsError] = await recomendApi.newsSearchContent(category, changeText);
        
        setNewsData({
            loading: false,
            newsContents,
            newsContentsError
        });
    }
  
    const renderItem = ({ item }) => {
        
        if (item.ImageUrl !== "" && item.ImageUrl !==undefined) {           
             if(sort == 1 )
                return <RecommendContent
                    font={font}
                    mode={mode}
                    key={item.id}
                    title={item.title}
                    content={item.content}
                    imageUrl={item.ImageUrl}
                    link={item.linkUrl}
                    date={item.date}
                />
            else if(sort == 2 )
                return <PhotoContent
                    font={font}
                    mode={mode}
                    key={item.id}
                    title={item.title}
                    content={item.content}
                    url={item.ImageUrl}
                    link={item.linkUrl}
                    date={item.date}
                />
            else if(sort == 3)
                return <HeadLineContent
                    font={font}
                    mode={mode}
                    key={item.id}
                    title={item.title}
                    content={item.content}
                    url={item.ImageUrl}
                    link={item.linkUrl}
                    date={item.date}
                />
            
        }
    }
 
    return (
        <Container>
            <SearchBox>
                <Picker
                    selectedValue={category}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                >
                    <Picker.Item label="??????" value="business" />
                    <Picker.Item label="IT" value="technology" />
                    <Picker.Item label="??????" value="general" />
                    <Picker.Item label="??????" value="science" />
                    <Picker.Item label="??????" value="entertainment" />
                    <Picker.Item label="?????????" value="sports" />
                </Picker>
                <SearchInput
                    value={changeText}
                    placeholder="????????? ????????? ???????????????"
                    onChangeText={(text) => setChangeText(text)}
                    onEndEditing={searchNews}
                    />
            </SearchBox>         
            {newsData.newsContents ? <FlatList
                data={newsData.newsContents}
                renderItem={renderItem}
                keyExtractor={item =>  item+Math.round(Math.random() * 13123561
                    ).toString()}
            />: <View
                    style={{
                        flex: 1,
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        backgroundColor:mode ==="true" ? "black": "white",
                    }}
                ><Text style={{
                        fontSize: font + 4,
                        color:mode ==="true" ? "white": "black",
                    
            }}>?????? ????????? ????????????.</Text></View>}
            
        </Container>
    )
}