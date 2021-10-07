
import React, { useState } from 'react';
import { ActivityIndicator,   Dimensions,   FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import HeadLineContent from '../../Component/HeadLineContent';
import PhotoContent from '../../Component/PhotoContent';
import RecommendContent from '../../Component/RecommendContent';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { deleteData } from '../../sqldata';
import {
  AdMobBanner,
} from 'expo-ads-admob';
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
import Constants from 'expo-constants';

const testID = 'ca-app-pub-3940256099942544/6300978111';
const productionID = 'ca-app-pub-1441798552294944/5131467909';
// Is a real device and running in production.
const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;

export default ({ loading, sort,mode, newsContents, font, navigation }) => {
    const [contentList, setContentList] = useState(newsContents._array);
    const handleDelete = (index) => {
        const array = [...contentList];
        deleteData(array[index].subject);
        console.log("인덱스", array[index].subject);
        array.splice(index, 1);
        setContentList(array);
    }
    const deleteContent = (index) => {
        return (
            
            <TouchableOpacity
                onPress={() => {
                    handleDelete(index)
                }
                }
                style={{
                    width:100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: mode == "false" ? "white":"black",
                    
                }}>
                <Text
                    style={{
                        fontSize: font + 2,
                        fontFamily: 'godob',
                        borderRadius: 10,
                        backgroundColor: mode == "false" ? "black" : "white",
                        color:mode == "false" ? "white":"black",
                        padding:20
                    }}
                    >삭제</Text>
            </TouchableOpacity>
            
        )
    }

    const renderItem = ({ item,index }) => {
        if (item.imgUrl !== "" && item.imgUrl !==undefined) {                      
             if(sort == 1 )
                 return (
                     <Swipeable renderRightActions={() => {
                         return deleteContent(index);
                     }}>
                         <RecommendContent
                             font={font}
                             key={item.id}
                             mode={mode}
                             title={item.subject}
                             content={item.content}
                             imageUrl={item.imgUrl}
                             link={item.link}
                             date={item.date}
                             isHistory={"true"}
                         />
                     </Swipeable>
                 );
            else if(sort == 2 )
                return (
                   <Swipeable renderRightActions={() => {
                         return deleteContent(index);
                     }}>
                        <PhotoContent
                            font={font}
                            mode={mode}
                            key={item.id}
                            title={item.subject}
                            content={item.content}
                            url={item.imgUrl}
                            link={item.link}
                            date={item.date}
                            isHistory={"true"}
                        />
                    </Swipeable>
                )
            else if(sort == 3)
                return (
                   <Swipeable renderRightActions={() => {
                         return deleteContent(index);
                     }}>
                        <HeadLineContent
                            font={font}
                            mode={mode}
                            key={item.id}
                            title={item.subject}
                            content={item.content}
                            url={item.imgUrl}
                            link={item.link}
                            date={item.date}
                            isHistory={"true"}
                        />
                    </Swipeable>
                )
        }
    }
    const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
        const toggleDrawer = () => {          
        //Props to open/close the drawer
            props.navigationProps.toggleDrawer();
        };

        return (
            <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={toggleDrawer}>
                {/*Donute Button Image */}
                <SimpleLineIcons name="options-vertical" size={24} color="black" />
            </TouchableOpacity>
            </View>
        );
    };
    return (
    <>
            {!loading ? <View
                style={{
                    flex:1,
                    flexDirection: "column",
                     backgroundColor:mode ==="true" ? "black": "white",
                }}   
            >
                <View
                    style={{
                    width:'100%',
                    flexDirection: "row",
                     backgroundColor: "#fff"
                }}
                >
                <Text
                    style={{
                        fontSize: font + 8,
                        fontFamily: 'godob',
                        padding: 12,
                       

                    }}
                    >내가 본 기사</Text>
                    <View
                        style={{
                            alignSelf: 'center',
                            position: 'absolute',
                            right:10,
                        }}
                    >
                        <NavigationDrawerStructure
                            
                                navigationProps={navigation} />
                    </View>
                    </View>
                {newsContents.length > 0 ? <FlatList
                    data={contentList ? contentList : setContentList(newsContents._array)}
                    renderItem={renderItem}
                    keyExtractor={item => Math.round(Number(item.id) * Math.random() * 13123561
                    ).toString()}
                   
                /> : <View
                        style={{
                            flex: 1,
                            alignContent: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            
                        }}
                    ><Text style={{
                            fontSize: font + 4,
                            color:mode ==="true" ? "white": "black",
                        
                    }}>기사 목록이 없습니다.</Text></View>}
                 {/* <AdMobBanner
                        style={{
                            width: WIDTH,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        bannerSize="banner"
                        adUnitID={adUnitID} /> */}
            </View> : <ActivityIndicator size={'large'} color={'black'} />}
            </>
    );
}