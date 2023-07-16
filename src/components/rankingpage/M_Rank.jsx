import MHamburgerButton from '../_common/M_HamburgerBtn';
import NewButton from './leftSection/NewButton';
import TabContainer from './leftSection/Tab';
import RankingList from './leftSection/RankingList';
import MyScore from './leftSection/MyScore';
import { M } from './Ranking.style';

const MobileRank = ({ isMyData }) => {
    const isMobile = true;
    return (
        <M.FlexContainer>
            <MHamburgerButton />
            {isMyData ? (
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <MyScore isMobile={isMobile} />
                </div>
            ) : (
                <div style={{ marginTop: '30%', width: '30%' }}>
                    <NewButton isMobile={isMobile} />
                </div>
            )}
            <TabContainer isMobile={isMobile} />
            <RankingList isMobile={isMobile} />
        </M.FlexContainer>
    );
};

export default MobileRank;
