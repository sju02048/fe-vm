import { WalletStateContext } from "contexts/WalletProvider";
import { calcTotalMoney } from "helpers/calculateMoney";
import React, { useContext, useEffect, useState } from "react";

const VMInfo = () => {
  const { coinInMachine } = useContext(WalletStateContext);
  const totalMoney = calcTotalMoney(coinInMachine);

  const handleReturnCoin = () => {};

  const handleChange = () => {};

  useEffect(() => {}, []);
  return (
    <div className="flex flex-col w-[33%] gap-4 p-4 text-xl border-black ">
      <div className="h-[70%] border-4 border-starbucks rounded-2xl p-2 text-base">하이</div>
      <div className="flex justify-between font-semibold">
        <span>남은시간</span>
        <span>10초</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>넣은금액</span>
        <div className="flex items-center justify-end rounded-full hover:ring-4 z-1">
          <input
            className="w-24 text-right bg-transparent outline-none cursor-pointer"
            value={totalMoney}
            onChange={handleChange}
          />
          <span>원</span>
        </div>
      </div>
      <button className="text-2xl btn btn--starbucks" onClick={handleReturnCoin}>
        반환버튼
      </button>
    </div>
  );
};

export default VMInfo;
