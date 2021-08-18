
import React, { useState } from 'react';
import { ActivityIndicator,   FlatList, View } from 'react-native';
import HeadLineContent from '../../Component/HeadLineContent';
import PhotoContent from '../../Component/PhotoContent';
import RecommendContent from '../../Component/RecommendContent';

export default ({ loading, sort, newsContents ,handleLoadMore,font,endContent }) => {
    
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
    const renderItem = ({ item }) => {
        if (item.ImageUrl !== "" && item.ImageUrl !==undefined) {            
           
            if(sort == 1 )
                return <RecommendContent
                    font={font}
                    key={item.id}
                    title={item.title}
                    content={item.content}
                    imageUrl={item.ImageUrl}
                    date={item.date}
                />
            else if(sort == 2 )
                return <PhotoContent
                    font={font}
                    key={item.id}
                    title={item.title}
                    content={item.content}
                    url={item.ImageUrl}
                    date={item.date}
                />
            else if(sort == 3)
                return <HeadLineContent
                    font={font}
                    key={item.id}
                    title={item.title}
                    content={item.content}
                    url={item.ImageUrl}
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
                    onEndReached={endContent && isLoadMore}
                    onEndReachedThreshold={0.5}
                />
                {loadMore && <ActivityIndicator color="black" size="large" />}
            </View> : <ActivityIndicator size={'large'} color={'black'} />}
            </>
    );
}