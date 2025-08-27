import WebApp from "@twa-dev/sdk";

import reactLogo from "./1shared/icons/react.svg";
import viteLogo from "./1shared/icons/vite.svg";

import "./App.css";
import { useStore } from "./app/store";
import { observer } from "mobx-react-lite";
import { Button } from "./1shared/ui/Button";

export const App = observer(() => {
  const { counter } = useStore();

  const count = counter.get();

  const alertCount = () => WebApp.showAlert(`Hello World! Current count is ${count}`);

  const closeApp = () => WebApp.close();

  return (
    <>
      <div>
        <a rel="noopener" href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a rel="noopener" href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => counter.increase()}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <div className="card">
        <button onClick={alertCount}>Show Alert</button>
        <Button label="закрыть" handleClick={closeApp} />
      </div>
    </>
  );
});
