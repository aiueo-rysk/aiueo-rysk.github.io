import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import {
    Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Typography
} from '@mui/material';

import { Portfolio, Product } from '../../types';

interface Column {
  id: "productCode" | "productName" | "topix17Industry" | "stock" | "purchasePrice" | "ratio" | "removeButton";
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'productCode', label: '銘柄コード', minWidth: 80 },
  { id: 'productName', label: '銘柄名', minWidth: 200 },
  { id: 'stock', label: '保有株', minWidth: 100, },
  { id: 'purchasePrice', label: '株価', minWidth: 100, },
  { id: 'ratio', label: '資産比率', minWidth: 60, },
  { id: 'removeButton', label: '', minWidth: 60, },
];




// ポートフォリオの編集用のコンポーネント
const PortfolioEditor = (props: {
  portfolio: Portfolio;
  popProduct: (product: Product) => void;
  setPortfolio: (product: Portfolio) => void;
}) => {

  const {
    control,
    watch,
    reset,
  } = useForm<Portfolio>({
    defaultValues: props.portfolio
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "holdingStocks"
  });

  const holdingStocks = watch("holdingStocks");

  React.useEffect(() => {
    reset({ holdingStocks: props.portfolio.holdingStocks });
    calcTotalAndRatios();
  }, [props.portfolio.holdingStocks]);

  const [total, setTotal] = React.useState(0);
  const [ratios, setRatios] = React.useState<Number[]>([]);

  // 合計と比率を計算する関数
  const calcTotalAndRatios = () => {
    // 合計を計算する
    const total = holdingStocks.reduce((sum, holdingStock) => sum + (holdingStock.stock * holdingStock.purchasePrice), 0);
    setTotal(total);
    // 比率を計算する 整数の%表示にするために100倍している
    const ratios = holdingStocks.map((holdingStock) => Math.round((holdingStock.stock * holdingStock.purchasePrice) / total * 10000) / 100);
    setRatios(ratios);
  }

  return (
    <>
      <Grid container spacing={2} pb={1} alignItems={"center"}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="portfolioName"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="ポートフォリオ名"
                type="text"
                variant="outlined"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
         <Typography>銘柄数：{holdingStocks.length} 件、総資産：{total} 円</Typography>
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {holdingStocks
                .map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.productCode}>
                      {columns.map((column) => {
                        return column.id === "stock" || column.id === "purchasePrice" ? (
                          <TableCell key={column.id} align={column.align}>
                            <Controller
                              name={`holdingStocks.${i}.${column.id}`}
                              control={control}
                              render={({ field, fieldState }) => (
                                <TextField
                                  {...field}
                                  type="number"
                                  variant="outlined"
                                  error={fieldState.invalid}
                                  helperText={fieldState.error?.message}
                                  onChange={(e) => {
                                    calcTotalAndRatios();
                                    field.onChange(e);
                                    props.setPortfolio(watch());
                                  }}
                                  // テキストボックスの後ろに単位を表示する
                                  InputProps={{
                                    endAdornment: <Typography>{column.id === "stock" ? "株" : "円"}</Typography>
                                  }}
                                  // テキストボックスのサイズを調整する
                                  sx={{ width: 130, mt: -2, mb: -2, }}
                                />
                              )}
                            />
                          </TableCell>
                        ) : column.id === "removeButton" ? (
                          <TableCell key={column.id} align={column.align}>
                            <Button
                              variant="outlined"
                              onClick={() => {
                                props.popProduct(row)
                                remove(i);
                              }}>
                              削除
                            </Button>
                          </TableCell>
                        ) : column.id === "ratio" ? (
                          <TableCell key={column.id} align={column.align}>
                            {ratios[i] ? `${ratios[i]}%` : "0%"}
                          </TableCell>
                        ) : (
                          <TableCell key={column.id} align={column.align}>
                            {row[column.id]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default PortfolioEditor;
