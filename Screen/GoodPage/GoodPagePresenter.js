
import React, { useState } from 'react';
import { ActivityIndicator,   FlatList, RefreshControl, View } from 'react-native';
import HeadLineContent from '../../Component/HeadLineContent';
import PhotoContent from '../../Component/PhotoContent';
import RecommendContent from '../../Component/RecommendContent';

export default ({ loading, sort, mode,newsContents, handleLoadMore, font, endContent, getData }) => {
    
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
                flexDirection:"column"
            }}>
                
                <FlatList
                    data={newsContents}
                    renderItem={renderItem}
                    keyExtractor={item =>  Math.round(Number(item.id)*Math.random() * 13123561
                        ).toString()}
                    onEndReached={!endContent && isLoadMore}
                    onEndReachedThreshold={0.1}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
                {loadMore && <ActivityIndicator color="black" size="large" />}
            </View> : <ActivityIndicator size={'large'} color={'black'} />}
            </>
    );
}