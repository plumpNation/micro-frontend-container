import { FC, Suspense, lazy } from 'react'
import { Routes, Route, BrowserRouter, Link, Outlet } from 'react-router-dom'

import { ErrorBoundary } from './components/ErrorBoundary';

const AboutWorld: FC = () => <div>About World!</div>;

const HelloReact: FC = () => {
  const ChildApp = lazy(() => import('remoteRepo/ChildApp'));

  return (
    <Suspense fallback={<div>loading remote child...</div>}>
      <ErrorBoundary remote message="ChildApp could not be loaded">
        {/* @ts-ignore: next-line */}
        <ChildApp />
      </ErrorBoundary>
    </Suspense>
  );
};

const MainLayout: FC = () => (
  <>
    <nav>
      <Link to="/about">About</Link>
    </nav>
    <Outlet />
  </>
);

export const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HelloReact />} />
        <Route path="about" element={<AboutWorld />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
