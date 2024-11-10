import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Stories from "./pages/Stories";
import Explore from "./pages/Explore";
import Write from "./pages/Write";
import Account from "./pages/Account"
import ErrorPage from "./pages/ErrorPage"
import Register from "./pages/Register";


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
            path: "/register",
            element:<Register/>
        },
        {
            path: "/write",
            element: <Write/>
        },
        {
            path:"/stories/:id",
            element: <Stories/>
        },
        {  
            path: "/account/:username",  
            element: <Account/>  
        },
        ]
    }
]

export default routes;