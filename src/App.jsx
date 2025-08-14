import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        🚀 React está funcionando
      </h1>
      <p className="mb-6 text-lg">Has hecho clic {count} veces</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Haz clic aquí
      </button>
    </div>
  );
}