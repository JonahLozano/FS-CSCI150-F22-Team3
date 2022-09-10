import "./App.css";
import Stocks from "../src/components/Stocks";
import Signup from "../src/components/Signup";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>FantasyStock</h1>
        <Stocks />
        <Signup />
      </header>
    </div>
  );
}

export default App;
