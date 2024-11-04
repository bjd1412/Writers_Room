import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Story from "./pages/Stories";
import Explore from "./pages/Explore";
import Write from "./pages/Write";
import ErrorPage from "./pages/ErrorPage"

const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
            path: "/",
            element: <Home/>,
        },
        {
            path:"/explore",
            element: <Explore/>,
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/write",
            element: <Write/>
        },
        {
            path:"/stories/:id",
            element: <Stories/>
        }
        ]
    }
]

export default routes;