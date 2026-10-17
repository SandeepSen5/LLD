import React, { useMemo, useState } from 'react';

export default function Test() {

    const [count, setCount] = useState(0);
    const [number, setNumber] = useState(10);
       
    const expensiveCalculation = useMemo(() => {
        console.log("Calculating...");
        let result = 0;
        for (let i = 0; i < 1000000000; i++) {
            result += number;
        }
        return result;
    }, [number])

    return (
        <div>
            <h2>Count: {count}</h2>

            <button onClick={() => setCount(count + 1)}>
                Increase Count
            </button>

            <br /><br />

            <button onClick={() => setNumber(number + 1)}>
                Increase Number
            </button>

            <h2>Result: {expensiveCalculation}</h2>
        </div>
    )
}
