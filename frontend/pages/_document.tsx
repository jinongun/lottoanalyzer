import Document, { Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
        <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Nanum+Myeongjo&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap" rel="stylesheet"/>

        </Head>
        <body>
          <Main />
          <NextScript />
          <style jsx global>{`
          
          `}</style>
        </body>
      </html>
    );
  }
}

export default CustomDocument;