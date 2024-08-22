import styled from "styled-components";
import Heading from "../../ui/Heading";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#4E79A7",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#F28E2B",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#E15759",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#76B7B2",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#59A14F",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#EDC948",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#3B5998",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#D95F02",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#B2182B",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4D7F86",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#38771D",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#B08904",
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

const DurationChart = () => {
  const { isDarkMode } = useDarkMode();

  const { isLoading, stays } = useRecentStays();

  if (isLoading) return <Spinner />;

  const data = prepareData(!isDarkMode ? startDataLight : startDataDark, stays);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey={"value"}
            innerRadius={75}
            outerRadius={110}
            paddingAngle={4}
            cx="40%"
            cy="40%"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={data.at(index).color} />
            ))}
          </Pie>
          <Legend
            verticalAlign="top"
            align="right"
            layout="vertical"
            width={"30%"}
            iconSize={12}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};

export default DurationChart;
