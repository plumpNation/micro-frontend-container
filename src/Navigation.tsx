import React, { FC, Suspense, lazy } from 'react'
import { Routes, Route, BrowserRouter, Link, Outlet } from 'react-router-dom'

const AboutWorld: FC = () => <div>About World!</div>;

const HelloReact: FC = () => {
  // @ts-ignore
  const ChildApp = lazy(() => import('ChildApp/ChildApp'));

  return (
    <Suspense fallback={<div>loading remote child...</div>}>
      <ChildApp info={{name: "Jeff", age: 10}} />
    </Suspense>
  );
};

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
