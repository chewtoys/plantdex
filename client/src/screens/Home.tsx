import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FunctionComponent = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/plants">Plants</Link>
    </div>
  );
};

export default Home;
