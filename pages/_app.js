import '../styles/reset.css';
import { Layout } from '../components/Layout/Layout';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import mainReducer from '../src/store/reducers';

const store = createStore(mainReducer, applyMiddleware(thunk));

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
