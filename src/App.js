import './App.css';
import Board from './Board';
import {Provider} from 'react-redux';
import {store} from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Board />
      </div>
    </Provider>
  );
}

export default App;
