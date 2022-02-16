import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import RegisterAuthor from "../pages/Authentication/RegisterAuthor";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
// import Dashboard from "../pages/Dashboard/index";
import PetEvents from "../pages/PetEvents/PetEventsColumns";
import PetPlaces from "../pages/PetPlaces/PetPlaces";
import Articles from "../pages/Articles/Articles";
import AppUser from "../pages/AppUser/AppUser";
import AdminUser from "../pages/AdminUser/AdminUser";
import InviteAdmin from "../pages/InviteAdmin/InviteAdmin";
import InviteAuthor from "../pages/InviteAuthor/InviteAuthor";
import UserInfo from "../pages/UserInfo/UserInfo";

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login";
import Register1 from "../pages/AuthenticationInner/Register";
import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import RegisterAdmin from "../pages/Authentication/RegisterAdmin";

const authProtectedRoutes = [
  // { path: "/dashboard", component: Dashboard },
  { path: "/petevents", component: PetEvents },
  { path: "/petplaces", component: PetPlaces },
  { path: "/articles", component: Articles },
  { path: "/appusers", component: AppUser },
  { path: "/adminusers", component: AdminUser },
  { path: "/inviteadmin", component: InviteAdmin },
  { path: "/inviteauthor", component: InviteAuthor },
  { path: "/userinfo", component: UserInfo },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/registerauthor", component: RegisterAuthor },
  { path: "/registeradmin", component: RegisterAdmin },

  // Authentication Inner
  { path: "/auth-login", component: Login1 },
  { path: "/auth-register", component: Register1 },
  { path: "/auth-recoverpw", component: ForgetPwd1 },
];

export { authProtectedRoutes, publicRoutes };
