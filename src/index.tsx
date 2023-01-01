import ReactDOM from 'react-dom';
import App from './App';
import RootStore, { RootStoreProvider } from './store';

const rootStore = new RootStore();

ReactDOM.render(
  <RootStoreProvider store={rootStore}>
    <App />
  </RootStoreProvider>,
  document.getElementById('root') as HTMLElement
);
