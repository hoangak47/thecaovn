import React, { Fragment } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
