import React from 'react';

import {
    Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
    TextField, Typography
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { grey } from '@mui/material/colors';

import { PRODUCTS } from '../../assets/data';
import { Product, Topix17Industry, TOPIX_17INDUSTRY } from '../../types';

interface Column {
  id: "productCode" | "productName" | "topix17Industry" | "status";
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'productCode', label: '銘柄コード', minWidth: 100 },
  { id: 'productName', label: '銘柄名', minWidth: 200 },
  { id: 'topix17Industry', label: '業種', minWidth: 170, },
  { id: 'status', label: '', minWidth: 100, },
];

interface filter {
  product?: Product;
  industry?: Topix17Industry;
}

const ALL_PRODUCTS: Product[] = PRODUCTS.map((product) => product as Product);


// 銘柄選択コンポーネント
const ProductSelector = (props: {
  selectedProducts: Product[];
  pushProduct: (product: Product) => void;
}) => {

  const [products, setProducts] = React.useState<Product[]>(ALL_PRODUCTS);
  const [filter, setFilter] = React.useState<filter>({ product: undefined, industry: undefined });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    const products = PRODUCTS.map((product) => product as Product);
    if (filter.product && filter.industry) {
      setProducts(products.filter((product) => product.productCode === filter.product?.productCode && product.topix17Industry === filter.industry));
    }
    else if (filter.product) {
      setProducts(products.filter((product) => product.productCode === filter.product?.productCode));
    }
    else if (filter.industry) {
      setProducts(products.filter((product) => product.topix17Industry === filter.industry));
    }
    else {
      setProducts(products);
    }
  }, [filter]);


  return (
    <>
      <Typography variant="h6" sx={{ display: 'flex', pb: 2 }}>
        ポートフォリオに追加する銘柄を選択してください。
      </Typography>

      <Grid container spacing={2} pb={1} >
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            options={ALL_PRODUCTS.map((option) => `${option.productCode} ${option.productName}`)}
            renderInput={(params) => <TextField {...params} label="銘柄検索" />}
            onChange={(e, v) => {
              setFilter({ ...filter, product: ALL_PRODUCTS.find((product) => `${product.productCode} ${product.productName}` === v) })
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            options={TOPIX_17INDUSTRY}
            renderInput={(params) => <TextField {...params} label="業種" />}
            onChange={(e, v) => {
              setFilter({ ...filter, industry: v ?? undefined })
            }}
            fullWidth
          />
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
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
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {

                  const seleted = props.selectedProducts.some((product) => product.productCode === row.productCode);

                  return (
                    <TableRow hover tabIndex={-1} key={row.productCode}
                      sx={{ cursor: "pointer", backgroundColor: seleted ? `${grey[300]} !important` : "inherit" }}
                      onClick={() => {
                        if (!seleted) {
                          props.pushProduct(row);
                        }
                      }}
                    >
                      {columns.map((column) => {
                        const value = column.id !== "status" ? row[column.id] : seleted ? "選択済み" : "";
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 100]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}


export default ProductSelector;
