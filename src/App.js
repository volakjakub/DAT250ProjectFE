import {Routes, Route} from 'react-router-dom';
import './App.css';
import "primereact/resources/themes/tailwind-light/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";

import Header from "./components/header/header.component";
import Index from "./routes/index/index.route";
import Login from "./routes/login/login.route";
import Register from "./routes/register/register.route";
import Dashboard from "./routes/dashboard/dashboard.route";
import Create from "./routes/create/create.route";
import Detail from "./routes/detail/detail.route";
import Logout from "./routes/logout/logout.route";
import Update from "./routes/update/update.route";                                //icons

function App() {
  return (
      <div className='App'>
          <Routes>
              <Route
                  path='/'
                  element={
                      <>
                          <Header></Header>
                          <Index></Index>
                      </>
                  }
              />
              <Route
                  path='/dashboard'
                  element={
                      <>
                          <Header></Header>
                          <Dashboard></Dashboard>
                      </>
                  }
              />
              <Route
                  path='/create'
                  element={
                      <>
                          <Header></Header>
                          <Create></Create>
                      </>
                  }
              />
              <Route
                  path='/detail/:code'
                  element={
                      <>
                          <Header></Header>
                          <Detail></Detail>
                      </>
                  }
              />
              <Route
                  path='/update/:code'
                  element={
                      <>
                          <Header></Header>
                          <Update></Update>
                      </>
                  }
              />
              <Route
                  path='/login'
                  element={
                    <>
                        <Header></Header>
                        <Login></Login>
                    </>
                  }
              />
              <Route
                  path='/register'
                  element={
                      <>
                          <Header></Header>
                          <Register></Register>
                      </>
                  }
              />
              <Route
                  path='/logout'
                  element={
                      <>
                          <Header></Header>
                          <Logout></Logout>
                      </>
                  }
              />
          </Routes>
      </div>
  );
}

export default App;
