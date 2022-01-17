import React, { FC } from 'react'
import { Routes, Route, BrowserRouter, Link, Outlet } from 'react-router-dom'
// @ts-ignore
import ChildApp from 'ChildApp/ChildApp';

const AboutWorld: FC = () => <div>About World!</div>;
const HelloReact: FC = () => <ChildApp info={{name: "Jeff", age: 10}} />;
const Home: FC = () => (
  <>
    <nav>
      <Link to="/about">About</Link>
      <Link to="/react">React</Link>
    </nav>
    <Outlet />
  </>
);

export const Navigation: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="react" element={<HelloReact />} />
        <Route path="about" element={<AboutWorld />} />
      </Route>
    </Routes>
  </BrowserRouter>
);