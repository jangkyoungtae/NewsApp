
import React from 'react';
import { ActivityIndicator,   FlatList, View } from 'react-native';
import HeadLineContent from '../../Component/HeadLineContent';
import PhotoContent from '../../Component/PhotoContent';
import RecommendContent from '../../Component/RecommendContent';

export default ({ loading, sort, newsContents }) => {
    
    
    const renderItem = ({ item }) => {
        if (item.ImageUrl !== "" && item.ImageUrl !==undefined) {            
           
            if(sort == 1 )
                return <RecommendContent
                    key={item.id}
                    title={item.title}
                    content={item.content}
                    imageUrl={item.ImageUrl}
                    date={item.date}
                />
            else if(sort == 2 )
                return <PhotoContent
                    key={item.id}
                    title={item.title}
                    content={item.content}
                    url={item.ImageUrl}
                    date={item.date}
                />
            else if(sort == 3)
                return <HeadLineContent
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
            {!loading ? <View>
                
                <FlatList
                    data={newsContents}
                    renderItem={renderItem}
                    keyExtractor={item => Math.round(Math.random()*65464564652).toString()}
                />                
            </View> : <ActivityIndicator size={'large'} color={'black'} />}
            </>
    );
}