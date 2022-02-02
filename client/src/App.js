import "./App.css";
import useApi from "./services/useAPI";

function App() {
  const { loading, data, error } = useApi("http://localhost:5000/api/user");
  console.log(data)
  return <div className="App">Hello</div>;
}

export default App;
