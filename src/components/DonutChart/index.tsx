import * as echarts from "echarts";
import { useEffect } from "react";

const colors = ["#2eb872", "#ffa952", "#e46161"];

interface ChartDataItem {
  value: number | string;
  name: string;
}

interface DonutChartProps {
  title: string;
  value: string | number;
  chartData: ChartDataItem[];
  currentPercentage: number | string;
  threshold: { label: string; color: string };
}

const DonutChart1: React.FC<DonutChartProps> = ({
  title,
  chartData,
  currentPercentage,
  value,
  threshold,
}) => {
  useEffect(() => {
    const chartDom = document.getElementById(title) as HTMLElement;
    const myChart = echarts.init(chartDom);

    // Calculate the total value and determine the angle for the mark line
    const totalValue = chartData.reduce(
      (acc, item) => acc + Number(item.value),
      0
    );
    const angle = (Number(currentPercentage) / totalValue) * 360;

    // Calculate x2 and y2 based on the angle
    const radius = 100; // Adjust based on your chart's size
    const x2 = 150 + radius * Math.cos((angle * Math.PI) / 180); // Center + radius * cos(angle)
    const y2 = 150 + radius * Math.sin((angle * Math.PI) / 180); // Center + radius * sin(angle)

    const option = {
      title: {
        subtext: `${title}`,
        bottom: "left",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: title,
          type: "pie",
          radius: ["40%", "60%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
            text: "hello",
          },
          emphasis: {
            label: {
              show: false,
              fontSize: "18",
              fontWeight: "bold",
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          labelLine: {
            show: false,
          },
          data: chartData,
          itemStyle: {
            color: (params: any) => colors[params.dataIndex],
          },
        },
      ],
      graphic: [
        {
          type: "text",
          left: "center",
          bottom: "center",
          style: {
            text: `${value}`,
            textAlign: "center",
            font: "12px Arial",
            fill: threshold.color || "#000",
          },
        },
        {
          type: "text",
          bottom: "10%",
          left: "center",
          style: {
            text: `${currentPercentage} - ${value}(ms)`,
            subtext: `${threshold.label}`,
            textAlign: "center",
            font: "12px Arial",
            fill: threshold.color || "#000",
          },
        },
        {
          type: "text",
          bottom: "15%",
          left: "center",
          style: {
            text: `${threshold.label}`,
            textAlign: "center",
            font: "12px Arial",
            fill: threshold.color || "#000",
          },
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [title, chartData, currentPercentage]);

  return <div id={title} style={{ width: "300px", height: "300px" }}></div>;
};

export default DonutChart1;
