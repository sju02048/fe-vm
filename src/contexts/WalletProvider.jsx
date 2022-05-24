import React, { createContext, useCallback, useEffect, useMemo, useReducer } from "react";
import MY_WALLET from "constants/myWallet";
import { API } from "utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.data;

    case "INCREASE":
      const increasedCoins = state.map((coin) => {
        return coin.id === action.targetId ? { ...coin, count: coin.count + 1 } : coin;
      });
      return increasedCoins;

    case "DECREASE":
      const decreasedCoins = state.map((coin) => {
        return coin.id === action.targetId ? { ...coin, count: coin.count - 1 } : coin;
      });

      return decreasedCoins;

    default:
      throw Error("WalletProvider Invalid Type");
  }
};
export const WalletStateContext = createContext();
export const WalletDispatchContext = createContext();

const initialState = [];

const WalletProvider = ({ children }) => {
  const [wallet, dispatch] = useReducer(reducer, initialState);

  const fetchMyWallet = async () => {
    const { data: moneyData } = await API.getMyWallet();

    const initMoney = moneyData.map((moneyItem, index) => {
      // MY_WALLET에 있는 돈 개수 만큼 내 지갑에 돈이 들어옴.
      return { ...moneyItem, count: MY_WALLET[index].count };
    });

    dispatch({ type: "INIT", data: initMoney });
  };

  const onPushCoin = useCallback((targetId) => {
    dispatch({ type: "DECREASE", targetId });
  }, []);

  const dispatches = useMemo(() => {
    return {
      onPushCoin,
    };
  }, [onPushCoin]);

  useEffect(() => {
    fetchMyWallet();
  }, []);

  return (
    <WalletStateContext.Provider value={wallet}>
      <WalletDispatchContext.Provider value={dispatches}>{children}</WalletDispatchContext.Provider>
    </WalletStateContext.Provider>
  );
};

export default WalletProvider;
