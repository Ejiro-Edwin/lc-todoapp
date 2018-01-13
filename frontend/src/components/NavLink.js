import React from 'react';
import { Link as RouterLink, Route } from 'react-router-dom';
import { FontIcon, ListItem, Subheader } from 'react-md';


const _isActive = (to, pathname, exact = false) => {

  if (exact) {
    return pathname === to;
  }

  if (typeof to === 'string') {
    return pathname
      .toLowerCase()
      .includes(to.toLocaleLowerCase())
  }

  return pathname.includes(to)
}

const NavLink = ({ label, to, exact, icon, subheader, location }) => {
  return (
    label?
      subheader?
        <Subheader primaryText={label} />
        :
            <ListItem
              component={RouterLink}
              active={_isActive(to, location.pathname, exact)}
              to={to}
              primaryText={label}
              leftIcon={icon? <FontIcon>{icon}</FontIcon> : ""}
            />
      : null
  )
}

export default NavLink;

