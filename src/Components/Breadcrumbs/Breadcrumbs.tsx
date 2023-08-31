import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

interface BreadcrumbsPath{
label: string,
url: string,
active: boolean
}

interface BreadcrumbsProps{
  paths: BreadcrumbsPath[]
}
export const Breadcrumbs = ( props: BreadcrumbsProps ) => {
  const{paths} = props
  return (
    <div className="breadcrumbs">
      {paths.map((path: { url: string; active: boolean; label: string; }, index: number) => (
        <span key={index}>
          <Link to={path.url} className={path.active?"breadcrumb-active" : "breadcrumb-inactive"} style={{textDecoration: 'none'}}>{path.label}</Link>
          {index < paths.length - 1 && <span className="separator"> / </span>}
        </span>
      ))}
    </div>
  );
};
