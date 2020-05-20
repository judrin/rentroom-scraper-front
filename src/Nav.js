import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import HomeIcon from '@material-ui/icons/Home';

const StyledAppBar = styled(AppBar)`
  background-color: #34495e !important;
`;

const StyledToolbar = styled(Toolbar)`
  justify-content: flex-end;
`

const StyledLink = styled(Link)`
  color: #fff;
`

function Nav() {
  return (
    <StyledAppBar position="static">
      <StyledToolbar variant="dense">
        <StyledLink to="/">
          <IconButton
            aria-label="home"
            color="inherit"
          >
            <HomeIcon />
          </IconButton>
        </StyledLink>
        <StyledLink to="/saved">
          <IconButton
            aria-label="saved posts"
            color="inherit"
          >
            <BookmarkIcon />
          </IconButton>
        </StyledLink>
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Nav;