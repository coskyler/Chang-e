"use client";

import { tsvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

const parseDate = timeParse("%Y-%m-%d");

export function parseData(parse = parseDate) {
  return function(d) {
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
  return function(d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;
    return d;
  };
}

export const getData = async () => {
  // const response = await fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv");
  const response = [
  {"t":"2025-09-29","o":247.85,"h":251.1486,"l":242.77,"c":244.05,"v":32505777},
  {"t":"2025-09-30","o":242.81,"h":243.29,"l":239.245,"c":243.1,"v":34724346},
  {"t":"2025-10-01","o":240.75,"h":246.3,"l":238.61,"c":244.9,"v":31658234},
  {"t":"2025-10-02","o":245.15,"h":246.81,"l":242.3,"c":245.69,"v":25483298},
  {"t":"2025-10-03","o":244.49,"h":246.3,"l":241.655,"c":245.35,"v":30249559},
  {"t":"2025-10-06","o":244.78,"h":251.32,"l":244.58,"c":250.43,"v":28894653},
  {"t":"2025-10-07","o":248.27,"h":250.44,"l":245.52,"c":245.76,"v":23181285},
  {"t":"2025-10-08","o":244.96,"h":246.005,"l":243.82,"c":244.62,"v":21307104},
  {"t":"2025-10-09","o":244.47,"h":244.76,"l":239.15,"c":241.53,"v":27892086},
  {"t":"2025-10-10","o":241.43,"h":244.09,"l":235.84,"c":236.57,"v":33180323},
  {"t":"2025-10-13","o":240.21,"h":244.5,"l":239.71,"c":244.15,"v":24995028},
  {"t":"2025-10-14","o":241.23,"h":247.12,"l":240.51,"c":245.45,"v":22111572},
  {"t":"2025-10-15","o":247.245,"h":252.11,"l":245.99,"c":251.03,"v":27007690},
  {"t":"2025-10-16","o":251.765,"h":256.96,"l":250.101,"c":251.46,"v":27997159},
  {"t":"2025-10-17","o":250.76,"h":254.22,"l":247.81,"c":253.3,"v":29671629},
  {"t":"2025-10-20","o":254.69,"h":257.33,"l":254.23,"c":256.55,"v":22350155},
  {"t":"2025-10-21","o":254.74,"h":254.88,"l":244.15,"c":250.46,"v":47312098},
  {"t":"2025-10-22","o":254.37,"h":256.36,"l":249.29,"c":251.69,"v":35029370},
  {"t":"2025-10-23","o":252.98,"h":255.04,"l":251.85,"c":253.08,"v":19901425},
  {"t":"2025-10-24","o":256.58,"h":261.68,"l":255.315,"c":259.92,"v":28655126}
];
  // const data = tsvParse(await response.text(), parseData(parseDate));
  const data = response.map(d => ({
  date: parseDate(d.t),
  open: +d.o,
  high: +d.h,
  low: +d.l,
  close: +d.c,
  volume: +d.v
}));
  return data;
};