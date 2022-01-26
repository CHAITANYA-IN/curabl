
import React, { Component } from "react";
import { Switch, Route, Redirect,Router } from "react-router-dom";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Payment from "./pages/Payment";
import Appointment from "./pages/Appointment";
import Scheduling from "./pages/Scheduling";
import myAppointments from "./pages/myAppointments"
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import RocketChat from "./pages/RocketChat";
import logout from "./pages/logout";
// import VideoCall from "./pages/VideoCall
import Main from "./components/layout/Main";
import TabToolbar from "./pages/Tabs";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import {ProtectedRoute} from "./services/protectedRoutes";
import axios from 'axios';
import userAuthentication from "./middleware/isauth"
import { history } from './helper/history';
import { authenticationService } from './services/authservice';




class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
          currentUser: null
      };
  }

  componentDidMount() {
      authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }
  // componentWillUnmount(){
  //   authenticationService.currentUser.
  // }

  logout() {
      authenticationService.logout();
      history.push('/login');
  }

  render() {
      const { currentUser } = this.state;
      return (
        <div className="App">
          {/* <Router history={history}> */}
            <Switch>
              <Route path="/sign-up" exact component={SignUp} />
              <Route path="/sign-in" exact component={SignIn} />
              {/* <Route path="/" exact component={SignIn} /> */}
              <Main>
                <ProtectedRoute exact path="/dashboard" component={Home} />
                <ProtectedRoute exact path="/tables" component={Tables} />
                <ProtectedRoute exact path="/billing" component={Billing} />
                <ProtectedRoute exact path="/payment" component={Payment} />
                <ProtectedRoute exact path="/appointment" component={Appointment} />
                <ProtectedRoute exact path="/scheduling" component={Scheduling} />
                <ProtectedRoute exact path="/myappointments" component={myAppointments} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <ProtectedRoute exact path="/editprofile" component={EditProfile} />
                <ProtectedRoute exact path="/log-out" component={logout} />

                
                {/* <Toolbar> */}
                <ProtectedRoute exact path="/call" component={TabToolbar} />
                {/* </Toolbar> */}
                <Redirect from="*" to="/dashboard" />
                {/* <Redirect path="*" component={() => "404 NOT FOUND"} /> */}
              </Main>
            </Switch>
          {/* </Router> */}
      </div>
      );
  }
}

// function App() {
//   // let routes = (
//   //   <Switch>
//   //       <Route path="/sign-up" exact component={SignUp} />
//   //       <Route path="/sign-in" exact component={SignIn} />
//   //       <Main>
//   //         <Route exact path="/dashboard" component={Home} />
//   //         <Route exact path="/tables" component={Tables} />
//   //         <Route exact path="/billing" component={Billing} />
//   //         <Route exact path="/payment" component={Payment} />
//   //         <Route exact path="/appointment" component={Appointment} />
//   //         <Route exact path="/scheduling" component={Scheduling} />
//   //         <Route exact path="/profile" component={Profile} />
//   //         <Route exact path="/editprofile" component={EditProfile} />
//   //         {/* <Toolbar> */}
//   //         <Route exact path="/call" component={TabToolbar} />
//   //         {/* </Toolbar> */}
//   //         <Redirect from="*" to="/dashboard" />
//   //       </Main>
//   //     </Switch>
//   // );

//   return (
//     <div className="App">
//       <Switch>
//         <Route path="/sign-up" exact component={SignUp} />
//         <Route path="/sign-in" exact component={SignIn} />
//         <Main>
//           <ProtectedRoute exact path="/dashboard" component={Home} />
//           <ProtectedRoute exact path="/tables" component={Tables} />
//           <ProtectedRoute exact path="/billing" component={Billing} />
//           <ProtectedRoute exact path="/payment" component={Payment} />
//           <ProtectedRoute exact path="/appointment" component={Appointment} />
//           <ProtectedRoute exact path="/scheduling" component={Scheduling} />
//           <ProtectedRoute exact path="/profile" component={Profile} />
//           <ProtectedRoute exact path="/editprofile" component={EditProfile} />
//           {/* <Toolbar> */}
//           <ProtectedRoute exact path="/call" component={TabToolbar} />
//           {/* </Toolbar> */}
//           <Redirect path="*" component={() => "404 NOT FOUND"} />
//         </Main>
//       </Switch>
//     </div>
//   );
// }

export default App;
