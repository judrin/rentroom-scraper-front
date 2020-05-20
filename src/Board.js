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
  const [ savedItems, setSavedItems ] = useState({});
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ otherItems, setOtherItems ] = React.useState([]);

  const open = Boolean(anchorEl);
  const popupId = open ? 'simple-popover' : undefined;

  useEffect(() => {
    const storagedMarkedItems = localStorage.getItem('markedItems');
    const storagedSavedItems = localStorage.getItem('savedItems');
    const parsedMarkedItems = storagedMarkedItems ? JSON.parse(storagedMarkedItems) : {};
    const parsedSavedItems = storagedSavedItems ? JSON.parse(storagedSavedItems) : {};

    axios.get('https://d3azinm4se.execute-api.ca-central-1.amazonaws.com/dev/posts')
    .then(response => {
      const data = response.data.result
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
        list.saved = false;

        if (parsedMarkedItems[list.id]) {
          list.marked = true;
        }

        if (parsedSavedItems[list.id]) {
          list.saved = true;
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
      setSavedItems(parsedSavedItems);
    })
  }, []);

  const handlePopupClick = (event, lists) => {
    setAnchorEl(event.currentTarget);
    setOtherItems(lists);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkClick = (id) => {
    if (!markedItems[id]) {
      const updatedMarkedItems = {
        ...markedItems,
        [id]: true
      }
      
      const updatedItems = items.map(item => {
        if (item.id === id) {
          item.marked = true;
        }
        return item;
      })

      setItems(updatedItems);
      setMarkedItems(updatedMarkedItems);
      localStorage.setItem('markedItems', JSON.stringify(updatedMarkedItems));
    }
  }

  const handleSaveClick = (id) => {
    const newSavedItems = { ...savedItems };
    const updatedItems = items.map(item => {
      if (item.id === id) {
        item.saved = !item.saved;

        if (newSavedItems[id]) {
          delete newSavedItems[id];
        } else {
          newSavedItems[id] = {
            ...item
          };

          delete newSavedItems[id].otherList;
        }
      }
      return item;
    })

    setItems(updatedItems);
    setSavedItems(newSavedItems);
    localStorage.setItem('savedItems', JSON.stringify(newSavedItems));
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
              saved={item.saved}
              otherList={item.otherList}
              countClick={handlePopupClick}
              markClick={handleMarkClick}
              saveClick={handleSaveClick}
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