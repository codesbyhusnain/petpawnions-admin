import Login from "../Pages/Login/Login";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import Articles from "../Pages/Articles/Articles";

//PUBLIC PAGES

const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/forgotpassword", component: ForgotPassword },
];

const privateRoutes = [{ path: "/articles", component: Articles }];

export { publicRoutes, privateRoutes };
