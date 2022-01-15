import React, { FC } from 'react'
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'

const AboutWorld: FC = () => <div>About World!</div>;
const HelloReact: FC = () => <div>Hello React!</div>;
const Home: FC = () => (
  <nav>
    <Link to="/about">About</Link>
    <Link to="/react">React</Link>
  </nav>
);

export const Navigation: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="react" element={<HelloReact />} />
      <Route path="about" element={<AboutWorld />} />
    </Routes>
  </BrowserRouter>
);