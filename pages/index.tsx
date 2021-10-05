import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { previousState } from '../models/__snapshots__/history';
import Layout from './../components/Todo'

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    document.addEventListener('keydown', function(e) {
            
      if( e.which === 90 && e.ctrlKey ){
        previousState()
      }

    })

    setLoading(true)

  }, []);

  return (
    loading ? <Layout /> : null
  )
}

export default Home
