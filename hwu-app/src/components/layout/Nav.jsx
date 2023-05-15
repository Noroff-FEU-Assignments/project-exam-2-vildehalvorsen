import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <li>
        <Link to='/account'>Account</Link>
      </li>
      <li>
        <Link to='/feed'>Feed</Link>
      </li>
      <li>
        <Link to='/'>Dashboard</Link>
      </li>
    </nav>
  )
}
