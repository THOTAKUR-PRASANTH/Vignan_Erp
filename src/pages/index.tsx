import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import StudentLoginPage from './StudentLoginPage';

const Home: NextPage = () => {
  return (
    <div>
       <Head>
        <title>VIGNAN</title>
        <link rel="icon" href="" type="image/x-icon" />
		    <meta http-equiv="X-Frame-Options" content="sameorigin"/>
      </Head>
      <StudentLoginPage /> 
    </div>
  )
}

export default Home
