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

  const [ savedItems, setSavedItems ] = useState({});
  const [ markedItems, setMarkedItems ] = useState({});

  useEffect(() => {
    const storagedSavedItems = localStorage.getItem('savedItems');
    const storagedMarkedItems = localStorage.getItem('markedItems');
    const parsedSavedItems = storagedSavedItems ? JSON.parse(storagedSavedItems) : {};
    const parsedMarkedItems = storagedMarkedItems ? JSON.parse(storagedMarkedItems) : {};

    setMarkedItems(parsedMarkedItems);
    setSavedItems(parsedSavedItems);
  }, []);

  const handleMarkClick = (id) => {
    if (!markedItems[id]) {
      const updatedMarkedItems = {
        ...markedItems,
        [id]: true
      }

      setMarkedItems(updatedMarkedItems);
      localStorage.setItem('markedItems', JSON.stringify(updatedMarkedItems));
    }
  }

  const handleSaveClick = (id) => {
    const newSavedItems = { ...savedItems };

    if (newSavedItems[id]) {
      delete newSavedItems[id];
    }

    setSavedItems(newSavedItems);
    localStorage.setItem('savedItems', JSON.stringify(newSavedItems));
  }

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