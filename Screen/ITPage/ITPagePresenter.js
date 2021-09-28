
import React, { useState } from 'react';
import { ActivityIndicator,   Dimensions,   FlatList, RefreshControl, Text, View } from 'react-native';
import HeadLineContent from '../../Component/HeadLineContent';
import PhotoContent from '../../Component/PhotoContent';
import RecommendContent from '../../Component/RecommendContent';
import {
  AdMobBanner,
} from 'expo-ads-admob';
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
import Constants from 'expo-constants';

const testID = 'ca-app-pub-3940256099942544/6300978111';
const productionID = 'ca-app-pub-1441798552294944/4163653555';
// Is a real device and running in production.
const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;

export default ({ loading, sort,mode, newsContents ,handleLoadMore,font,endContent ,getData}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const isLoadMore = () => {
        if (!endContent) {
            setLoadMore(true);
            setTimeout(()=>{ 
                handleLoadMore();
                setLoadMore(false);
            }, 1000);
        }
        
    }
    const onRefresh = () => {
        if (!endContent) {
             setRefreshing(true);
            new Promise((resolve, reject) => {
                getData(false);
                resolve(true);
            }).then((result) => {
                console.log(result);
                if (result) {
                    setRefreshing(false);
                }
            });
        }
        
        
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
    <>
            {!loading ? <View
                style={{
                    flex:1,
                    flexDirection: "column",
                backgroundColor:mode ==="true" ? "black": "white",
            }}>
                
               {newsContents ? <FlatList
                    data={newsContents}
                    renderItem={renderItem}
                    keyExtractor={item =>  Math.round(Number(item.id)*Math.random() * 13123561
                        ).toString()}
                    onEndReached={!endContent && isLoadMore}
                    onEndReachedThreshold={0.1}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
                }}>기사 목록이 없습니다.</Text></View>}
                {loadMore && <ActivityIndicator color="black" size="large" />}
                 <AdMobBanner
                        style={{
                            width: WIDTH,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        bannerSize="banner"
                        adUnitID={adUnitID} 
                    servePersonalizedAds 
                    onDidFailToReceiveAdWithError={"에러"} />
            </View> : <ActivityIndicator size={'large'} color={'black'} />}
            </>
    );
}