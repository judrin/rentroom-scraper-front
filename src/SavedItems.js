import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';

import Item from './Item';

const StyledContainer = styled(Container)`
  margin-top: 3em;
`

const Inner = styled.div`
  display: grid;
  grid-gap: 10px;
`

function Board() {

  const [ data, setData ] = useState({
    savedItems: {},
    markedItems: {}
  })

  useEffect(() => {
    const storagedSavedItems = localStorage.getItem('savedItems');
    const storagedMarkedItems = localStorage.getItem('markedItems');
    const parsedSavedItems = storagedSavedItems ? JSON.parse(storagedSavedItems) : {};
    const parsedMarkedItems = storagedMarkedItems ? JSON.parse(storagedMarkedItems) : {};

    setData({
      savedItems: parsedSavedItems,
      markedItems: parsedMarkedItems
    })

  }, []);

  const handleMarkClick = (id) => {
    const { markedItems } = data;

    if (!markedItems[id]) {
      const updatedMarkedItems = {
        ...markedItems,
        [id]: true
      }

      setData({
        ...data.savedItems,
        markedItems: updatedMarkedItems
      });
      localStorage.setItem('markedItems', JSON.stringify(updatedMarkedItems));
    }
  }

  const handleSaveClick = (id) => {
    const { savedItems } = data;
    const newSavedItems = { ...savedItems };

    if (newSavedItems[id]) {
      delete newSavedItems[id];
    }

    setData({
      ...data.markedItems,
      savedItems: newSavedItems
    });
    localStorage.setItem('savedItems', JSON.stringify(newSavedItems));
  }

  const { savedItems } = data;
  const sortedItems = Object.values(savedItems).sort((a, b) => b.id - a.id);

  return (
    <>
      <StyledContainer maxWidth="md">
        <Inner>
          {sortedItems.map(item => (
            <Item
              key={item.id}
              id={item.id}
              title={item.title}
              writer={item.writer}
              href={item.href}
              date={item.date}
              marked={false}
              saved={item.saved}
              otherList={{}}
              countClick={() => {}}
              markClick={handleMarkClick}
              saveClick={handleSaveClick}
            />
          ))}
        </Inner>
      </StyledContainer>
    </>
  );
}

export default Board;