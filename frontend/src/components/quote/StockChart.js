"use client";

import React, { useState, useEffect } from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
  ChartCanvas, Chart, CandlestickSeries, LineSeries, BarSeries, AreaSeries,
  XAxis, YAxis, EdgeIndicator, MouseCoordinateX, MouseCoordinateY, CrossHairCursor,
  CurrentCoordinate, OHLCTooltip, MovingAverageTooltip, MACDSeries,
  discontinuousTimeScaleProviderBuilder, ema, sma, macd, last, withSize
} from "react-stockcharts3";
import { useParams } from "next/navigation";

import { getData } from "@/utils/stockData";

function StockChart({ width = 800, ratio = 3, type = "svg" }) {
  const params = useParams();
  const symbol = (params?.symbol || "MSFT").toUpperCase();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchChartData() {
      const chartData = await getData(symbol);
      setData(chartData);
    }
    fetchChartData();
  }, [symbol]);

  if (!data) return <div>Loading stock data...</div>;

  // Indicators
  const ema26 = ema().id(0).options({ windowSize: 26 }).merge((d, c) => { d.ema26 = c; }).accessor(d => d.ema26);
  const ema12 = ema().id(1).options({ windowSize: 12 }).merge((d, c) => { d.ema12 = c; }).accessor(d => d.ema12);
  const macdCalculator = macd().options({ fast: 12, slow: 26, signal: 9 }).merge((d, c) => { d.macd = c; }).accessor(d => d.macd);
  const smaVolume50 = sma().id(3).options({ windowSize: 10, sourcePath: "volume" }).merge((d, c) => { d.smaVolume50 = c; }).accessor(d => d.smaVolume50);

  const macdAppearance = { stroke: { macd: "#FF0000", signal: "#00F300" }, fill: { divergence: "#4682B4" } };

  // Apply indicators
  const calculatedData = macdCalculator(smaVolume50(ema12(ema26(data))));

  const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(d => d.date);
  const { data: chartData, xScale, xAccessor, displayXAccessor } = xScaleProvider(calculatedData);

  const start = xAccessor(last(chartData));
  const end = xAccessor(chartData[Math.max(0, chartData.length - 150)]);
  const xExtents = [start, end];

  return (
    <ChartCanvas
      height={600} width={width} ratio={ratio}
      margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
      type={type} seriesName={symbol}
      data={chartData} xScale={xScale} xAccessor={xAccessor} displayXAccessor={displayXAccessor} xExtents={xExtents}
    >
      <Chart id={1} height={400} yExtents={[d => [d.high, d.low], ema26.accessor(), ema12.accessor()]} padding={{ top: 10, bottom: 20 }}>
        <XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} tickStrokeStyle="#FFFFFF" strokeStyle="#FFFFFF" tickLabelFill="#FFFFFF"/>
        <YAxis axisAt="right" orient="right" ticks={5} tickStrokeStyle="#FFFFFF" strokeStyle="#FFFFFF" tickLabelFill="#FFFFFF"/>
        <MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")} />
        <CandlestickSeries />
        <LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()} />
        <CurrentCoordinate yAccessor={ema12.accessor()} fill={ema12.stroke()} />
        <EdgeIndicator itemType="last" orient="right" edgeAt="right" yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />
        <OHLCTooltip origin={[-40, 0]} textFill="#FFFFFF" labelFill="#AAAAAA" />
        <MovingAverageTooltip
          origin={[-38, 15]}
          options={[
            { yAccessor: ema12.accessor(), type: ema12.type(), stroke: ema12.stroke(), windowSize: ema12.options().windowSize },
          ]}
        />
      </Chart>

      {/* <Chart id={2} height={150} yExtents={[d => d.volume, smaVolume50.accessor()]} origin={(w, h) => [0, h - 300]}>
        <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} />
        <MouseCoordinateY at="left" orient="left" displayFormat={format(".4s")} />
        <BarSeries yAccessor={d => d.volume} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />
        <AreaSeries yAccessor={smaVolume50.accessor()} stroke={smaVolume50.stroke()} fill={smaVolume50.fill()} />
      </Chart> */}
{/* 
      <Chart id={3} height={150} yExtents={macdCalculator.accessor()} origin={(w, h) => [0, h - 150]} padding={{ top: 10, bottom: 10 }}>
        <XAxis axisAt="bottom" orient="bottom" />
        <YAxis axisAt="right" orient="right" ticks={2} />
        <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat("%Y-%m-%d")} />
        <MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")} />
        <MACDSeries yAccessor={d => d.macd} {...macdAppearance} />
      </Chart> */}

      <CrossHairCursor />
    </ChartCanvas>
  );
}

export default withSize()(StockChart);
