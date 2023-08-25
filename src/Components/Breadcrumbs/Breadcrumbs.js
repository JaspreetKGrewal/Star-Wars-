import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

export const Breadcrumbs = ({ paths }) => {
  return (
    <div className="breadcrumbs">
      {paths.map((path, index) => (
        <span key={index}>
          <Link to={path.url}>{path.label}</Link>
          {index < paths.length - 1 && <span className="separator"> / </span>}
        </span>
      ))}
    </div>
  );
};
