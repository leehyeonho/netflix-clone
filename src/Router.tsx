import {createBrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./screens/Home";
import Movie from "./screens/Movie";
import App from "./App";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
                children: [
                    {
                        path: "movies/:id",
                        element: <Movie />,
                    }
                ]
            },
        ]
    }
])

export default router;