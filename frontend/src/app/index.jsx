import React from "react";
import Home from "./AdminHomeScreen";
export default function index() {
  //we will define (under the folder `app`) our screens,
  //for now, we will return the Home, as the first screen,
  //it will change to the authed page that will redirect to Home Page.
  return (
    <Home />
  );
}