import React from 'react'
import { useContextComp } from './MyContext';

const Home = () => {
  const { user } = useContextComp();
  return (
    <div>
      home {user.name}
    </div>
  )
}

export default Home
