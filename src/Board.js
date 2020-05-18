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
  const [ markedItems, setMarkedItems ] = useState({});
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ otherItems, setOtherItems ] = React.useState([]);

  const open = Boolean(anchorEl);
  const popupId = open ? 'simple-popover' : undefined;

  useEffect(() => {
    const storagedItems = localStorage.getItem('markedItems');
    const parsedMarkedItems = storagedItems ? JSON.parse(storagedItems) : {};

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
        list.marked = false;

        if (parsedMarkedItems[list.writer]) {
          if (parsedMarkedItems[list.writer].includes(list.title)) {
            list.marked = true;
          }
        }

        if (writerLists[list.writer]) {
          writerLists[list.writer].push(list);
          continue;
        }

        writerLists[list.writer] = list.otherList;
        writerLists[list.writer].push(list);

        lists.push(list);
      }

      setItems(lists);
      setMarkedItems(parsedMarkedItems);
    })
  }, []);

  const handlePopupClick = (event, lists) => {
    setAnchorEl(event.currentTarget);
    setOtherItems(lists);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkClick = (writer, title, toggle = true) => {
    const lists = markedItems[writer] || [];
    const updatedLists = lists.filter(list => list !== title);

    if (lists.length === updatedLists.length) {
      updatedLists.push(title);
    } else if (!toggle) {
      return;
    }

    const updatedMarkedItems = {
      ...markedItems,
      [writer]: updatedLists
    }

    const updatedItems = items.map(item => {
      if (item.writer === writer && item.title === title) {
        item.marked = !item.marked;
      }

      return item;
    })

    localStorage.setItem('markedItems', JSON.stringify(updatedMarkedItems));
    setMarkedItems(updatedMarkedItems);
    setItems(updatedItems);
  }

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
              marked={item.marked}
              otherList={item.otherList}
              countClick={handlePopupClick}
              markClick={handleMarkClick}
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