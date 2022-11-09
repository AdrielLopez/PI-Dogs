import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogCreate from "./components/DogCreate";
import DogDetail from "./components/DogDetail";
import About from "./components/About";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/dog" component={DogCreate} />
        <Route path="/detail/:id" component={DogDetail} />
        <Route path="/about" component={About} />
      </div>
    </BrowserRouter>  
  );
}

export default App;
