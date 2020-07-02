import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import axios from 'axios';
import debounce from 'lodash.debounce';

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

  const [ data, setData ] = useState({
    items: [],
    markedItems: {},
    savedItems: {}
  });
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ otherItems, setOtherItems ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ maxLoadingItems, setMaxLoadingItems ] = useState(50);

  const open = Boolean(anchorEl);
  const popupId = open ? 'simple-popover' : undefined;

  useEffect(() => {
    const storagedMarkedItems = localStorage.getItem('markedItems');
    const storagedSavedItems = localStorage.getItem('savedItems');
    const parsedMarkedItems = storagedMarkedItems ? JSON.parse(storagedMarkedItems) : {};
    const parsedSavedItems = storagedSavedItems ? JSON.parse(storagedSavedItems) : {};

    axios.get('https://b8jm8vulpe.execute-api.ca-central-1.amazonaws.com/dev/posts')
    .then(response => {
      const data = response.data.result
      const lists = [];
      const writerLists = {};

      for (let i = 0; i < data.length; i++) {
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

      setData({
        items: lists,
        markedItems: parsedMarkedItems,
        savedItems: parsedSavedItems
      });
      setLoading(false);
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
    console.log(data);
    const { items, markedItems } = data;

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
      });

      setData({
        ...data.savedItems,
        items: updatedItems,
        markedItems: markedItems
      })
      localStorage.setItem('markedItems', JSON.stringify(updatedMarkedItems));
    }
  }

  const handleSaveClick = (id) => {
    const { items, savedItems } = data;
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
    });

    setData({
      ...data.markedItems,
      items: updatedItems,
      savedItems: newSavedItems
    })

    localStorage.setItem('savedItems', JSON.stringify(newSavedItems));
  }

  window.onscroll = debounce(() => {
    const scrollX = window.innerHeight + document.documentElement.scrollTop;

    if (loading !== true && scrollX >= document.documentElement.offsetHeight) {
      setMaxLoadingItems(maxLoadingItems + 50);
    }
  }, 100);

  const itemsToDisplay = [];
  const items = data.items;

  for (let i = 0; i < maxLoadingItems && i < items.length; i++) {
    itemsToDisplay.push((
      <Item
        key={items[i].id}
        id={items[i].id}
        title={items[i].title}
        writer={items[i].writer}
        href={items[i].href}
        date={items[i].date}
        marked={items[i].marked}
        saved={items[i].saved}
        otherList={items[i].otherList}
        countClick={handlePopupClick}
        markClick={handleMarkClick}
        saveClick={handleSaveClick}
      />
    ));
  }

  return (
    <>
      <StyledContainer maxWidth="md">
        <Inner>
          {itemsToDisplay}
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