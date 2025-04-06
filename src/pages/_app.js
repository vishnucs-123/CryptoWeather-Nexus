import ThemeContextProvider from '../theme/ThemeContext';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import 'animate.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </ThemeContextProvider>
  );
};

export default MyApp;
