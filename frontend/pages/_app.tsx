
import App from "next/app";
import React from "react";


export default class MyApp extends App {
  async componentDidMount() {
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Component {...pageProps} />
        <style jsx global>{`
          body{
            margin: 0;
            background-color: #fff;
            font-family: 'Nanum Gothic', sans-serif;

          }
          h1, h2, h3, h4, h5, p{
            margin: 0;
          }
        `}</style>
      </>
    );
  }
}