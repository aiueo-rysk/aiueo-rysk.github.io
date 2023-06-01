import React from 'react';
import { Cell, Label, Pie, PieChart } from 'recharts';

import { Typography } from '@mui/material';
import {
    blueGrey, brown, indigo, lightBlue, lightGreen, orange, purple, red, teal, yellow
} from '@mui/material/colors';

import { Portfolio } from '../../types';

interface Data {
  name: string;
  value: number;
}

const COLORS = [red[500], indigo[500], teal[500], yellow[500], brown[500], purple[500], lightBlue[500], lightGreen[500], orange[500], blueGrey[500]];

// PortfolioをholdingStock.stock * holdingStock.purchasePriceの昇順に並べて最大１０件のData配列にする。10件目以降のデータはその他としてまとめる
const createData = (portfolio: Portfolio): Data[] => {
  const data: Data[] = portfolio.holdingStocks
    .filter((holdingStock) => holdingStock.stock > 0 || holdingStock.purchasePrice > 0)
    .map((holdingStock) => ({
      name: holdingStock.productName,
      value: holdingStock.stock * holdingStock.purchasePrice,
    })).sort((a, b) => b.value - a.value);
  if (data.length > 10) {
    const otherValue = data.slice(10).reduce((previousValue, currentValue) => previousValue + currentValue.value, 0);
    data.splice(10);
    data.push({ name: "その他", value: otherValue });
  }
  return data;
}


const PortfolioViewer = (props: {
  portfolio?: Portfolio;
}) => {

  const data = props.portfolio ? createData(props.portfolio) : [];



  return data.length > 0 ? (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label={({ name, value, cx, x, y, index }) => {
          const textAnchor = x > cx ? "start" : "end";
          const fill = COLORS[index % COLORS.length];
          return (
            <>
              <text x={x} y={y} textAnchor={textAnchor} fill={fill}>
                {name}
              </text>
              <text
                x={x}
                y={y}
                dominantBaseline="hanging"
                textAnchor={textAnchor}
                fill={fill}
              >
                {value}
              </text>
            </>
          )
        }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  ) : (
    <Typography variant="h6" sx={{ display: 'flex', pb: 2 }}>
      ポートフォリオを作成してください。
    </Typography>
  );
};

export default PortfolioViewer;
