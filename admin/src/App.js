
import React, { Component } from "react";
import { Switch, Route, } from "react-router-dom";
import Home from "./pages/Home";

import logout from "./pages/logout";
import AdminSignIn from "./pages/Adminlogin"
import AdminDashboard from "./pages/AdminDashboard"
import AddClinic from "./pages/AddClinic"

import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { ProtectedDoctorRoute, ProtectedRoute, ProtectedPatientRoute, ProtectedAdminRoute } from "./services/protectedRoutes";
import axios from 'axios';
import userAuthentication from "./middleware/isauth"
import { history } from './helper/history';
import { authenticationService } from './services/authservice';
import AddInstructor from "./pages/AddInstructor"




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

          <Route path="/adminSignin" exact component={AdminSignIn} />
          <Route path="/" exact component={AdminSignIn} />

          <Main>
            <ProtectedRoute exact path="/dashboard" component={Home} />
            <ProtectedRoute exact path="/log-out" component={logout} />
            <ProtectedRoute exact path="/adminDashboard" component={AdminDashboard} />
            <ProtectedRoute exact path="/addClinic" component={AddClinic} />
            <ProtectedRoute exact path="/addInst" component={AddInstructor} />


            {/* <Toolbar> */}
            {/* <ProtectedRoute exact path="/call" component={TabToolbar} /> */}
            {/* </Toolbar> */}
            {/* <Redirect from="*" to="/dashboard" /> */}
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
//   //       <Route path="/" exact component={SignIn} />
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
