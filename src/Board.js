import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import axios from 'axios';

import Item from './Item';
import Popup from './Popup';

const StyledContainer = styled(Container)`
  margin-top: 3em;
`

const Inner = styled.div`
  display: grid;
  grid-gap: 10px;
`

function Board() {

  const [ items, setItems ] = useState([]);
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ otherItems, setOtherItems ] = React.useState([]);

  const open = Boolean(anchorEl);
  const popupId = open ? 'simple-popover' : undefined;

  useEffect(() => {
    axios.get('https://d3azinm4se.execute-api.ca-central-1.amazonaws.com/dev/posts')
    .then(response => {
      const data = response.data.result.Items
      const lists = [];
      const writerLists = {};

      for (let i = data.length - 1; i >= 0; i--) {
        const list = { ...data[i] };
        list.otherList = [];

        const date = new Date(list.date * 1000);
        const yy = date.getFullYear()
        const mm = date.getMonth() + 1;
        const dd = date.getDate();
        list.date = `${yy}-${('0' + mm).slice(-2)}-${dd}`;

        if (writerLists[data[i].writer]) {
          writerLists[data[i].writer].push(list);
          continue;
        }

        writerLists[data[i].writer] = list.otherList;
        writerLists[data[i].writer].push(list);

        lists.push(list);
      }

      setItems(lists);
    })
  }, []);

  const handlePopupClick = (event, lists) => {
    setAnchorEl(event.currentTarget);
    setOtherItems(lists);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledContainer maxWidth="md">
        <Inner>
          {items.map(item => (
            <Item
              key={item.id}
              id={item.id}
              title={item.title}
              writer={item.writer}
              href={item.href}
              date={item.date}
              otherList={item.otherList}
              click={handlePopupClick}
            />
          ))}
        </Inner>
      </StyledContainer>
      <Popup
        id={popupId}
        open={open}
        close={handleClose}
        anchorEl={anchorEl}
        lists={otherItems}
      />
    </>
  );
}

export default Board;