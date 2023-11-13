import "./styles/app.scss";
import Display from "./components/Display";
import Controls from "./components/Controls";
import { useState } from "react";

function App() {
  const [session, setSession] = useState({ break: 5, session: 25 });
  const [isRunning, setIsRunning] = useState(false);
  
  return (
    <div className="app">
      <Display session={session} isRunning={isRunning} />
      <Controls session={session} setSession={setSession} isRunning={isRunning} setIsRunning={setIsRunning} />
    </div>
  );
}

export default App;
