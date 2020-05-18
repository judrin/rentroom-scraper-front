import React from 'react';
import styled from 'styled-components'
import { Popover } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9em;

  li {
    border-bottom: 1px solid #acacac;
    padding: 0.5em 0.8em;
    :last-child {
      border-bottom: 0;
    }
  }
`

const Date = styled.span`
  font-size: 0.8em;
  display: inline-block;
  border-radius: 3px;
  padding: 3px 5px;
  margin-left: 3px;
  color: #fff;
  background-color: #2980b9;
`

export default function Popup(props) {
  return (
      <Popover
        id={props.id}
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={props.close}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper>
          <List>
            {props.lists.map(list => (
              <li key={list.id}>
                <span>{list.title}</span>
                <Date>{list.date}</Date>
              </li>
            ))}
          </List>
        </Paper>
      </Popover>
  );
}
