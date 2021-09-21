import type { NextPage } from 'next'

import React, { useEffect, useState } from 'react'
import Layout from './todo/index'

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    loading ? <Layout /> : null
  )
}

export default Home
