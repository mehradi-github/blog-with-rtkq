import React from 'react';
// import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PostsManager from './features/post/PostsManager';

import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from './features/auth/authApi';
import { logout, selectIsAuthenticated } from './features/auth/authSlice';
import {
  MDBBtn,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
} from 'mdb-react-ui-kit';

function App() {
  const [login] = useLoginMutation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  return (
    <div>
      <MDBNavbar expand="lg" bgColor="primary" dark>
        <MDBContainer fluid>
          <MDBNavbarBrand href="/">Post Manager</MDBNavbarBrand>
          <MDBNavbarNav className="me-auto">
            <MDBNavbarItem>
              <MDBNavbarLink href="/">Home</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/counter">Counter</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <div className="d-flex input-group w-auto">
            {!isAuthenticated ? (
              <MDBBtn
                outline
                color="light"
                aria-label="Login"
                onClick={() => {
                  login({ ignore: 'This will just set the headers' });
                }}
              >
                {' '}
                Login
              </MDBBtn>
            ) : (
              <MDBBtn
                color="danger"
                aria-label="Logout"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </MDBBtn>
            )}
          </div>
        </MDBContainer>
      </MDBNavbar>

      <Routes>
        <Route path="/" element={<PostsManager />}></Route>
        <Route path="/counter" element={<Counter />}></Route>
        <Route></Route>
      </Routes>
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <Counter />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <span>
    //       <span>Learn </span>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux-toolkit.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux Toolkit
    //       </a>
    //       ,<span> and </span>
    //       <a
    //         className="App-link"
    //         href="https://react-redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React Redux
    //       </a>
    //     </span>
    //   </header>
    // </div>
  );
}

export default App;
