import React from 'react';
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './screens/Home';
import Character from './screens/Movie';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Honk&display=swap');

  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html {
    font-family: "Honk", system-ui;
    font-size: 48px;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: linear-gradient(to bottom, #100a0c, #341f29);
    /* background: linear-gradient(to bottom, rgba(16, 10, 12, 0.49) 10%, #14141434 15%, #ffc0cb7d 20%, #ffc0cbcc 35%, #ffc0cb7d 40%, #ffc0cb34 50%, #ffc0cb7d); */
    color: #fff;
    overflow-x: hidden; /* 가로 스크롤바 숨김 (row 내부 제외) */
  }

  a {
      color: #fff;
      text-decoration: none;
  }

  ul {
      list-style: none;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
