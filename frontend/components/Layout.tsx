import * as React from 'react'
import Head from 'next/head'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <div className="body">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
    <style jsx>{`

      .body{
        background-color: #f9f9f9;
        width: 100%;
        height: 100vh;
        max-width: 768px;
        margin: auto;
      }

    `}</style>
  </div>
)

export default Layout
