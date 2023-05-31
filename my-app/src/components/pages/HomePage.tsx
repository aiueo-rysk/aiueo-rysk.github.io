import exp from 'constants';
import logo from '../../assets/logo.svg';
import Autocomplete from '@mui/material/Autocomplete';
import { PRODUCTS } from '../../assets/data';
import { Box, Container, TextField } from '@mui/material';

// ホーム画面のコンポーネント
const HomePage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box m={3}>
      <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={PRODUCTS.map((option) => `${option.productCode} ${option.productName}`)}
          sx={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="銘柄検索" />}
        />
      </Box>
    </Container>
  );
}

export default HomePage;