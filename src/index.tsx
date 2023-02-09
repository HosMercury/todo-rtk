import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoShow } from "./components/TodoShow";
import { AllTodos } from "./components/AllTodos";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/todos" element={<AllTodos />} />
        <Route path="/:id" element={<TodoShow />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
