import Hamburger from '../_common/Hamburger';
import MyScore from './leftSection/MyScore';
import TabContainer from './leftSection/Tab';
import RankingList from './leftSection/RankingList';
import { S } from './Ranking.style';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RankingApis from '../../api/ranking';
import Loading from '../_common/Loading';
import RankDetail from './RankDetail';
import { useLocation } from 'react-router-dom';

const Rank = ({ isLogin }) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const sort = params.get('sort');
    console.log('sortsort', sort);
    const navigate = useNavigate();
    //api로 받아온 데이터 관리하는 곳
    const [rankingData, setRankingData] = useState();
    const [currentUserId, setCurrentUserId] = useState();
    const memberId = localStorage.getItem('memberId') || -1;
    const [loading, setLoading] = useState(true);
    const [rankLoading, setRankLoading] = useState(true);
    const timetableId = localStorage.getItem('tableId');

    //sort에 따라 랭킹 정보 불러오기
    useEffect(() => {
        setRankingData();
        setLoading(true);
        setRankLoading(true);
        const fetchData = async sort => {
            sort = sort ? sort : 'LOWEST';
            const res = await getRankingList(sort, memberId);
            console.log('받아온 랭킹정보', sort, res);
            setRankingData(res?.data);
            setCurrentUserId(res?.data[0]?.timetableId);
        };
        fetchData(sort);
        setLoading(false);
    }, [sort, currentUserId, memberId]);

    const getRankingList = (sort, memberId) => {
        return RankingApis.GetRanking(sort, memberId);
    };

    const getDetailData = timetableId => {
        return RankingApis.GetOneRankingDetail(timetableId, memberId);
    };

    //랭킹 로딩 중일떄
    useEffect(() => {
        if (rankLoading && rankingData) {
            setRankLoading(false);
        }
    }, [rankLoading, rankingData]);

    useEffect(() => {}, []);
    return (
        <S.Wrapper>
            <Hamburger />
            {/*랭킹 보여주는 left section*/}
            {!currentUserId && !sort ? (
                <Loading title='랭킹보드' />
            ) : (
                <S.Container>
                    <S.SmallContainer>
                        {!isLogin ? (
                            <S.NewButton
                                onClick={() => {
                                    navigate('/login');
                                }}
                                isMobile={false}
                            >
                                시간표 등록하기
                            </S.NewButton>
                        ) : timetableId === 'null' ? (
                            <S.NewButton
                                onClick={() => {
                                    navigate('/create');
                                }}
                                isMobile={false}
                            >
                                시간표 등록하기
                            </S.NewButton>
                        ) : (
                            <MyScore isMobile={false} datas={rankingData} />
                        )}
                        <TabContainer />
                        <RankingList
                            rankLoading={rankLoading}
                            data={rankingData}
                            currentUserId={currentUserId}
                            setCurrentUserId={setCurrentUserId}
                        />
                    </S.SmallContainer>
                    {/*개별 유저 데이터 보여주는 right section*/}
                    <RankDetail
                        memberId={memberId}
                        currentUserId={currentUserId}
                        getRankingList={getRankingList}
                        setLoading={setLoading}
                        loading={loading}
                        rankLoading={rankLoading}
                        setRankLoading={setRankLoading}
                        timetableId={timetableId}
                        getDetailData={getDetailData}
                        setRankingData={setRankingData}
                        sort={sort}
                    />
                </S.Container>
            )}
        </S.Wrapper>
    );
};

export default Rank;
