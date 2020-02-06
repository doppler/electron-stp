import { MdSettings, MdLock, MdHome } from 'react-icons/md';
import { IconContext } from 'react-icons';
import React from 'react';
import useAuth from './Auth/useAuth';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  background-color: var(--header-background-color);
  height: 2em;
  width: 100%;
  /* border-bottom: var(--panel-border); */
  box-shadow: 1px 1px 2px black;
  display: flex;
  align-items: center;
  & div {
    flex-grow: 1;
    display: flex;
  }
  & .left {
    justify-content: flex-start;
    & > * {
      margin-left: 0.5em;
    }
  }
  & .right {
    justify-content: flex-end;
    & > * {
      margin-right: 0.5em;
    }
  }
  & span.breadcrumbs {
    white-space: pre;
    overflow-x: hidden;
    & > span::after {
      content: ' > ';
    }
    & > span:last-child::after {
      content: '';
    }
  }
`;
const Header = () => {
  const { user, isAdminUser } = useAuth();

  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <StyledHeader>
        <div className='left'>
          <NavLink exact to='/' className='link'>
            <MdHome />
          </NavLink>
          {/* <span className='breadcrumbs'>
            {location.pathname
              .replace(/\//, '')
              .split('/')
              .map((name, i) => (
                <span key={i}>{name}</span>
              ))}
          </span> */}
        </div>
        <div className='right'>
          <span>{user.name}</span>
          {/* <span>{JSON.stringify(user.roles)}</span> */}
          <Link to='/logout' className='link'>
            <MdLock />
          </Link>
          {isAdminUser() && (
            <NavLink to='/settings' className='link'>
              <MdSettings />
            </NavLink>
          )}
        </div>
      </StyledHeader>
    </IconContext.Provider>
  );
};

export default Header;
