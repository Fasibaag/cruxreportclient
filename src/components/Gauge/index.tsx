import * as echarts from "echarts";
import { useEffect } from "react";

const extractedRanges = (histogramData) =>
  histogramData.map((item) => {
    const range = item.end
      ? `${item.start} - ${item.end}`
      : `${item.start} and above`;
    return {
      range,
      density: item.density,
    };
  });

const GaugeChart = ({ title, value, chartData, currentPercentage }) => {
  debugger;
  useEffect(() => {
    // Initialize the chart
    const chartDom = document.getElementById("gaugeChart");
    const myChart = echarts.init(chartDom);

    const densities = () => {
      const cumulativeDensities = chartData.reduce((acc, current) => {
        const lastValue = acc.length > 0 ? acc[acc.length - 1] : 0;
        acc.push(lastValue + current.value);
        return acc;
      }, []);

      // Normalize to the range 0 to 1
      const totalDensity = cumulativeDensities[cumulativeDensities.length - 1]; // The last value will be the total
      const normalizedDensities = cumulativeDensities.map(
        (value) => value / totalDensity
      );
      return chartData.map((item, index) => ({
        ...item,
        normalizedValue: normalizedDensities[index],
      }));
    };

    console.log(densities());

    // Define the option for the Gauge chart
    const option = {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          type: "gauge",
          axisLine: {
            lineStyle: {
              width: 10,
              color: [
                [0.9504, "#2eb872"],
                [0.9809, "#2eb872"],
                [1, "#2eb872"],
              ],
            },
          },
          pointer: {
            itemStyle: {
              color: "auto",
            },
          },
          axisTick: {
            distance: -20,
            length: 8,
            lineStyle: {
              color: "#fff",
              width: 2,
            },
          },
          splitLine: {
            distance: -30,
            length: 10,
            lineStyle: {
              color: "#fff",
              width: 4,
            },
          },
          axisLabel: {
            color: "inherit",
            distance: 40,
            fontSize: 15,
          },
          detail: {
            valueAnimation: true,
            formatter: "{value} %",
            color: "inherit",
          },
          data: [
            {
              value: value,
              name: "SCORE",
              fontSize: 15,
            },
          ],
        },
      ],
    };

    // Set the options and render the chart
    myChart.setOption(option);

    // Cleanup on unmount
    return () => {
      myChart.dispose();
    };
  }, [chartData, currentPercentage, title]); // Re-run effect when value changes

  return <div id="gaugeChart" style={{ width: "100%", height: "400px" }} />;
};

export default GaugeChart;
