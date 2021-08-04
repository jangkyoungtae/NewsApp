import React, { useState }  from 'react';
import { ActivityIndicator, Button, ScrollView, Text, View } from 'react-native';
import HeadLineContent from '../../Component/HeadLineContent';
import PhotoContent from '../../Component/PhotoContent';
import RecommendContent from '../../Component/RecommendContent';

export default ({ route, loading }) => {
    const [sort, setSort] = useState(1);
    const boardSort = () => {
        if (sort < 3 ) {
            setSort(sort + 1);
        } else {
            setSort(1);
        }
    }
    const images = [
        {
                id:1,
                url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA2MDhfMTg2%2FMDAxNjIzMTM2OTY2Nzgw.9P2eAuoy4w4XNveRzaqQiW_OXcLaQoukf89Ieck2ZWAg.JOL_5QW4niZhCRHeYuX2czHq8JwmmMBHDpwRHQAzQ2kg.JPEG.0919mimijuju%2FIMG_6257.jpg&type=sc960_832',
                title: '[영상] 세계 4위도 꺾었다…여자 배구 준결승으로!',
            content: "한국 여자 배구 대표팀이 강호 터키를 꺾고 준결승에 진출했습니다.우리 대표팀은 오늘(4일) 오전 9시부터 일본 도쿄 아리아케아레나에서 터키를 상대로 열린 2020 도쿄올림픽 여자 배구 8강전에서 세트 스코어 3 : 2로 승리했습니다.1세트를 먼저 내준 뒤 2세트를 이기면서 따라붙은 대표팀은 3세트도 연거푸 이겨 승기를 잡았지만 끈질기게 추격한 터키에 4세트를 내주며 승부를 5세트까지 이어갔습니다.대표팀은 마지막 5세트에서 동점에 동점을 거듭하는 팽행한 경기를 펼친 끝에 결국 15 대 13으로 승리를 거머쥐었습니다.세계랭킹 13위인 우리 대표팀은 지난 한일전에서 랭킹 5위인 일본을 꺾은 데 이어 이번에는 4위인 터키에도 승리를 거뒀습니다. 손에 땀을 쥐게 한 마지막 5세트 경기 모습, 영상으로 확인하시죠."
        },
        {
             id:2,
                url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA2MDlfMTU3%2FMDAxNjIzMjQzODIxMTMw.QMLNDjLRlX7oCmZi7b_JH29wVDjscEi2Vl4pvUlxerQg.oxMd3VOdiapusHmvQ-YqcEnfXBEYvEDnKJy18nvXpUQg.JPEG.tkdgk72%2FIMG_1505.jpg&type=sc960_832',
                title: '[올림픽] 박찬호 KBS 해설위원의 투구 철학, “투수는 공격하는 자리입니다!”',
                content: "박찬호 해설위원, \"야구에서 투수는 공격하는 위치, 타자가 방어하게 해야 한다!\"메이저리그 124승 투수에서 KBS 마이크 잡아 '공격적인 투구 철학, 시청자들에게 친절하게 설명'이광용 캐스터 \"메이저리그 개척자, 박찬호는 이제 투머치 토커 아닌 유쾌한 굿 머치 토커\"올림픽 시청률 1위 '박찬호-이광용 명품 콤비' 오늘 저녁 7시 한일전 KBS 2TV 도쿄 현지 중계"        },
        {
              id:3,
                url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA3MTNfMTcy%2FMDAxNjI2MTcxODMzMzgz.SGlp5V3H8OPmCyaQu2PSQac1clJB8H3WGxxiw1DzUm4g.xO5-5CjCY0pU3FXs0nGK7ewGh4NMjWkVqmY_E0F2mGMg.JPEG.beautifulnail_0514%2FKakaoTalk_20210622_103722445.jpg&type=sc960_832',
                title: '오늘의 기사 제목',
                content: '오늘의 기사 내용은 이것입니다. 앞으로도 계속 바뀌지 않고 이것일 것입니다. 바뀌지 않는다고 하여 당황 하지 마시고 잘 읽어 보시기를 바랍니다.'
        },
        {
               id:4,
                url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA2MjJfMiAg%2FMDAxNjI0MzU5ODgyODcy.NIHU3hZmFN0NFaSAAqn5VrOmflgPx6n6T2b0dUUA1GAg.WnKdLrOV9JvgtJ53JG4NN7gL-3W4IQy-eCSN9avhPjgg.JPEG.hayo322%2FP20210613_134223759_9A56BE26-5571-454D-8FA9-2F00C755CF87.JPG&type=sc960_832',
                title: '오늘의 기사 제목',
                content: '오늘의 기사 내용은 이것입니다. 앞으로도 계속 바뀌지 않고 이것일 것입니다. 바뀌지 않는다고 하여 당황 하지 마시고 잘 읽어 보시기를 바랍니다.'
        },
        {
                id:5,
                url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA3MTNfMTM0%2FMDAxNjI2MTYzNjY3ODg5.9_xfKMrfMac9BKxVIdJ5wIEHWFEflqAnIaq83GtMapwg.s48znInOfW_8tyQF52Qwc6LaE8Vu4mIKTCnG1IKsfQAg.JPEG.i60422%2FIMG_9206.jpg&type=sc960_832',
                title: '오늘의 기사 제목',
                content: '오늘의 기사 내용은 이것입니다. 앞으로도 계속 바뀌지 않고 이것일 것입니다. 바뀌지 않는다고 하여 당황 하지 마시고 잘 읽어 보시기를 바랍니다.'
        }, {
                id:6,
                url: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA2MjZfMTg2%2FMDAxNjI0Njc4NTY5OTI0.vMxIPB1a0Bf08Cg3cnG-bN3tiRIfE_TwT4btXbUJ89kg.d-8wZy55hn0loStHSejSyc78KbdZmUXZD3W1Bv5H8Mwg.JPEG.isue227%2F2021%25A3%25AD06%25A3%25AD24%25A3%25AD09%25A3%25AD14%25A3%25AD51%25A3%25AD729.jpg&type=sc960_832',
                title: '오늘의 기사 제목',
                content: '오늘의 기사 내용은 이것입니다. 앞으로도 계속 바뀌지 않고 이것일 것입니다. 바뀌지 않는다고 하여 당황 하지 마시고 잘 읽어 보시기를 바랍니다.'
            },
        

    ]
    return (
    <>
            {!loading ? <View>
                <Button title={'정렬'} onPress={boardSort}/>
                    <ScrollView>
                    {sort == 1 &&
                        images.map((item) => {
                          return  <RecommendContent key={item.id} {...item} />
                        })
                    }
                    {sort == 2 &&
                        images.map((item) => {
                           return <PhotoContent key={item.id} {...item} />
                        })
                    }
                    {sort == 3 &&
                        images.map((item) => {
                           return <HeadLineContent key={item.id} {...item} />
                        })
                        
                    }
                    </ScrollView>
                
            </View> : <ActivityIndicator size={'large'} color={'black'} />}
            </>
    );
}