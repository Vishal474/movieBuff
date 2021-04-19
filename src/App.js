import './App.css';
import HomePage from './components/homePage'
import { Provider } from 'react-redux';
import store from './store/store'
import './style/main.scss'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HomePage></HomePage>
      </div>
    </Provider>
  );
}

export default App;
