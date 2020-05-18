import React from 'react';
import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core';

const Inner = styled.div`
  padding: 1.5em 1em;
`

const Info = styled.div`
  font-size: 0.8em;
  > span {
    display: inline-block;
    border-radius: 3px;
    padding: 3px 5px;
    color: #fff;

    :not(:last-child) {
      margin-right: 5px;
    }
  }
`

const Title = styled.h3`
  margin-top: 0;
  > a {
    color: inherit;
    text-decoration: none;
  }
`;

const Writer = styled.span`
  background-color: #e74c3c;
`

const PostDate = styled.span`
  background-color: #2980b9;
`;

const Count = styled.span`
  background-color: #2c3e50;
  cursor: pointer;
`;

function Item({ id, title, writer, href, date, otherList, click }) {
  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Inner>
            <Title>
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer">
                {title}
              </a>
            </Title>
            <Info>
              <Writer>글쓴이: {writer}</Writer>
              <PostDate>{date}</PostDate>
              <Count onClick={(event) => click(event, otherList)}>작성자의 다른글: {otherList.length}</Count>
            </Info>
          </Inner>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Item;