"use client";

import React from 'react';
import TotalPosition from './TotalPosition';
import PositionList from './PositionList';
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const PositionSummary = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [balance, setBalance] = useState(0);
    const [netChange, setNetChange] = useState(0);
    const { getToken } = useAuth();

    useEffect(() => {
        async function fetchPortfolio() {
            const token = await getToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/user/portfolio`, {
                credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          }
            });
            const data = await res.json();
            setPortfolio(data.portfolio || []);
            setBalance(data.balance || 0);
            setNetChange(data.netChange || 0);
        }
        fetchPortfolio();
    }, [getToken]);


    return (
        <div className="flex flex-col gap-4 flex-1 min-h-0">
            <TotalPosition
                totalValue={balance}
                totalChange={netChange}
            />
            <PositionList positions={portfolio} />
        </div>
    );
};

export default PositionSummary;