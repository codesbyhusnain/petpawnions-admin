import Login from "../Pages/Login/Login";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import Articles from "../Pages/Articles/Articles";
import Places from "../Pages/Places/Places";
import AddPlace from "../Pages/Places/AddPlace";
import Events from "../Pages/Events/Events";
import AddEvent from "../Pages/Events/AddEvent";
import AddArticle from "../Pages/Articles/AddArticle";

//PUBLIC PAGES

const publicRoutes = [
  { path: "/", component: Login },
  { path: "/forgotpassword", component: ForgotPassword },
];

const privateRoutes = [
  { path: "/articles", component: Articles },
  { path: "/places", component: Places },
  { path: "/places/add-place", component: AddPlace },
  { path: "/events", component: Events },
  { path: "/events/add-event", component: AddEvent },
  { path: "/articles/add-article", component: AddArticle },
];

export { publicRoutes, privateRoutes };
