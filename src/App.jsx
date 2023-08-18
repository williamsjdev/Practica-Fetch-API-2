import { Suspense } from "react";
import { fetchData } from "./fetchData";
import './App.css'


const apiData = fetchData("https://jsonplaceholder.typicode.com/users");

function App() {

  const data = apiData.read();

  return (
    <>
      <div>
        <h1>Fetch Like a Pro</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ul className="card">
            {data?.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </Suspense>
      </div>
    </>
  )
}

export default App