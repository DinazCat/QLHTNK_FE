import React from "react";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DoctorsPage from "./views/DoctorsPage";
import BookingPage from "./views/BookingPage";
import BookingOnline from "./views/BookingOnline";
import SignInPage from "./views/SignInPage";
import SignUpPage from "./views/SignUpPage";
import IntroductionPage from "./views/IntroductionPage";
import Manager from "./views/Manager";
import NotFoundPage from "./views/NotFoundPage";
import ServicesPage from "./views/ServicesPage";
import ContactPage from "./views/ContactPage";
import ForgetPassword from "./views/ForgetPassword";
import Profile from "./views/Profile";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/doctors">
          <DoctorsPage />
        </Route>
        <Route path="/services">
          <ServicesPage />
        </Route>
        <Route path="/contacts">
          <ContactPage />
        </Route>
        <Route path="/booking">
          <BookingPage />
        </Route>
        <Route path="/bookingOnline">
          <BookingOnline />
        </Route>
        <Route path="/sign_in">
          <SignInPage />
        </Route>
        <Route path="/sign_up">
          <SignUpPage />
        </Route>
        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/manager">
          <Manager />
        </Route>

        <Route path="/" exact>
          <IntroductionPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
