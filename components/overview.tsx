"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: 1,
  },
  {
    name: "Feb",
    total: 2,
  },
  {
    name: "Mar",
    total: 3,
  },
  {
    name: "Apr",
    total: 4,
  },
  {
    name: "May",
    total: 5,
  },
  {
    name: "Jun",
    total: 6,
  },
  {
    name: "Jul",
    total: 7,
  },
  {
    name: "Aug",
    total: 8,
  },
  {
    name: "Sep",
    total: 9,
  },
  {
    name: "Oct",
    total: 10,
  },
  {
    name: "Nov",
    total: 11,
  },
  {
    name: "Dec",
    total: 12,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
