import React from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Paper, Tab } from '@mui/material';

import { Portfolio, Product } from '../../types';
import PortfolioEditor from '../organisms/PortfolioEditor';
import PortfolioViewer from '../organisms/PortfolioViewer';
import ProductSelector from '../organisms/ProductSelector';

const DEFAULT_VALUES: Portfolio = {
  portfolioName: "新しいポートフォリオ",
  holdingStocks: [],
};

// ホーム画面のコンポーネント
const HomePage = () => {

  const [selectedProducts, setSelectedProducts] = React.useState<Product[]>([]);
  const [portfolio, setPortfolio] = React.useState<Portfolio>(DEFAULT_VALUES);

  const pushProduct = (product: Product) => {
    setSelectedProducts([...selectedProducts, product]);
    setPortfolio({...portfolio, holdingStocks: [...portfolio.holdingStocks, {...product, stock: 0, purchasePrice: 0}]})
  }

  const popProduct = (product: Product) => {
    setSelectedProducts(selectedProducts.filter((selectedProduct) => selectedProduct.productCode !== product.productCode));
    setPortfolio({...portfolio, holdingStocks: portfolio.holdingStocks.filter((holdingStock) => holdingStock.productCode !== product.productCode)})
  }

  // タブ関連
  const [value, setValue] = React.useState<"select" | "edit" | "view">("select");
  const handleChange = (event: React.ChangeEvent<{}>, newValue: "select" | "edit" | "view") => {
    setValue(newValue);
  };


  return (
    <Container maxWidth="lg">
      <Box m={3}>
        <TabContext value={value}>
          <TabList onChange={handleChange} component={Paper} >
            <Tab label="1. 銘柄選択" value="select" style={{ minWidth: 150 }} />
            <Tab label="2. ポートフォリオ編集" value="edit" style={{ minWidth: 150 }} />
            <Tab label="3. 分析" value="view" style={{ minWidth: 150 }} />
          </TabList>
          <TabPanel value="select">
            <ProductSelector selectedProducts={selectedProducts} pushProduct={pushProduct} />
          </TabPanel>
          <TabPanel value="edit">
            <PortfolioEditor portfolio={portfolio} popProduct={popProduct} setPortfolio={setPortfolio} />
          </TabPanel>
          <TabPanel value="view">
            <PortfolioViewer portfolio={portfolio} />
          </TabPanel>
        </TabContext>
      </Box >
    </Container>
  );
}

export default HomePage;
