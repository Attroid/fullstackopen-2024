import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const action = (type) => () => store.dispatch({ type });

  const { good, ok, bad } = store.getState();

  return (
    <div>
      <button onClick={action("GOOD")}>good</button>
      <button onClick={action("OK")}>ok</button>
      <button onClick={action("BAD")}>bad</button>
      <button onClick={action("ZERO")}>reset stats</button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
