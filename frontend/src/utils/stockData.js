"use client";

import { tsvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

const parseDate = timeParse("%Y-%m-%d");

export function parseData(parse = parseDate) {
  return function (d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;
    return d;
  };
}

export function parseData2(parse = parseDate) {
  return function (d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;
    return d;
  };
}

export const getData = async (symbol) => {
  console.log(symbol);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/stock/history?symbol=${symbol}`,
    { credentials: "include" }
  );
  const raw = await response.json();

  const data = raw.map((d) => ({
    date: parseDate(d.t),
    open: +d.o,
    high: +d.h,
    low: +d.l,
    close: +d.c,
    volume: +d.v,
  }));

  return data;
};
