import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../ui/Navbar';
import BattleHistoryItem from '../components/BattleHistoryItem';
import { useFetching } from '../hooks/useFetching.js';
import { useAccessToken } from '../hooks/useAccessToken';
import UserService from '../api/UserService.js';
import Loader from '../ui/Loader.jsx';

const BattleListPage = () => {
  const [accessToken] = useAccessToken();
  const [userBattle, setUserData] = useState([])

  const [fetchBattleHistory, isBattleLoad, battleError] = useFetching(async () => {
    if (!accessToken) return
    const response = await UserService.getHistoryBattleUser(accessToken);
    setUserData(response.data);
  });

  useEffect(() => {
    fetchBattleHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const memoizedBattle = useMemo(() => userBattle, [userBattle]);

  return (
    <div>
      <Navbar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <h1>Battle History</h1>
      </div>
      {isBattleLoad ?
        <Loader />
        : <>
          {battleError ?
            <div>
              Error loading battles: {battleError}
            </div>
            :
            <>
              {memoizedBattle.map((battle) =>
                <BattleHistoryItem objHistory={battle} />
              )}
            </>
          }
        </>
      }
    </div>
  );
};

export default BattleListPage;
