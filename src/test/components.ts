export const exampleComponent = `\`\`\`javascript
import React, { useState } from 'react';

const CounterApp = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-6xl mb-8">{count}</div>
      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Increment
      </button>
    </div>
  );
};

export default CounterApp;
\`\`\``;
