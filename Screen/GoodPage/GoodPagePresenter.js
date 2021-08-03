import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import HeadLineContent from '../../Component/HeadLineContent';
import PhotoContent from '../../Component/PhotoContent';
import RecommendContent from '../../Component/RecommendContent';

export default ({route,loading}) => {
   
    return (
    <>
            {!loading ? <View>
                {route.name === "헤드라인" &&
                    <ScrollView>
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                        <RecommendContent />
                    </ScrollView>}
                {route.name === "경제" &&
                    <ScrollView>
                        <PhotoContent />
                        <PhotoContent />
                        <PhotoContent />
                        <PhotoContent />
                        <PhotoContent />
                    </ScrollView>}
                {route.name === "IT" &&
                    <ScrollView>
                        <HeadLineContent />
                        <HeadLineContent />
                        <HeadLineContent />
                        <HeadLineContent />
                        <HeadLineContent />
                    </ScrollView>}
            </View> : <ActivityIndicator size={'large'} color={'black'} />}
            </>
    );
}