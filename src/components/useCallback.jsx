import React, { useCallback, useState } from "react";

const Child = React.memo(({ handleClick }) => {
  console.log("Child rendered");

  return (
    <button onClick={handleClick}>
      Click Child
    </button>
  );
});

function App() {
  const [count, setCount] = useState(0);
   
  const handleClick = useCallback(() => {
    console.log("Child button clicked");
  }, []);

  return (
    <div>
      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increase Count
      </button>

      <Child handleClick={handleClick} />
    </div>
  );
}

export default App;

