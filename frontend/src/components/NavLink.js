import React from 'react';
import { Link as RouterLink, Route } from 'react-router-dom';
import { FontIcon, ListItem, Subheader, Button } from 'react-md';

const styles = {
  rightIcon : {
    padding: 0,
    lineHeight: '9px',
    float: 'right',
    marginTop: 7,
    marginRight: -5
  }
}

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

const NavLink = ({ label, to, exact, icon, subheader, location, rightIcon, rightIconAction, iconLabel }) => {
  return (
    label?
      subheader?
        <Subheader 
          primaryText={label} 
          >
          <Button 
            icon 
            tooltipLabel={iconLabel}
            onClick={() => rightIconAction()}
            className="md-cell md-cell--right"
            style={styles.rightIcon}>
              {rightIcon}
          </Button>
        </Subheader>
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

