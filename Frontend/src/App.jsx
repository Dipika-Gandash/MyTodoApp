import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Signup from "./pages/Signup.jsx";
import PageNotFound from "./components/PageNotFound";
import Login from "./pages/Login.jsx";

function App() {
  const [user, setUser] = useState(null); 

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home user={user} /> 
    },
    {
      path: "/signup",
      element: <Signup setUser={setUser} />
    },
    {
      path: "/login",
      element: <Login setUser={setUser}/>
    },
    {
      path: "*",
      element: <PageNotFound />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
