import { Link } from "react-router-dom";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div>
      <Link to="/todos">Todos</Link>
      <TodoList />
    </div>
  );
}

export default App;
