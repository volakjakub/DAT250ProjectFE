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
import Detail from "./routes/detail/detail.route";                                //icons

function App() {
  return (
      <div className='App'>
          <Routes>
              <Route
                  path='/'
                  element={
                      <>
                          <Header user='Jakub'></Header>
                          <Index></Index>
                      </>
                  }
              />
              <Route
                  path='/dashboard'
                  element={
                      <>
                          <Header user='Jakub'></Header>
                          <Dashboard></Dashboard>
                      </>
                  }
              />
              <Route
                  path='/create'
                  element={
                      <>
                          <Header user='Jakub'></Header>
                          <Create></Create>
                      </>
                  }
              />
              <Route
                  path='/detail/:id'
                  element={
                      <>
                          <Header user='Jakub'></Header>
                          <Detail></Detail>
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
          </Routes>
      </div>
  );
}

export default App;
