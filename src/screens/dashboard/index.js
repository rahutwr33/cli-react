import React, { Component } from "react";
import { createDrawerNavigator  } from "react-navigation";
import Dashboard from "./dashboard.js";
import Sidebar from "../sidebar/sidebar.js";

const HomeScreenRouter = createDrawerNavigator(
  {
    Dashboard: { screen: Dashboard }
  },
  {
    contentComponent: props => <Sidebar {...props} />
  }
);
export default HomeScreenRouter;