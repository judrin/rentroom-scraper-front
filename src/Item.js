import React from 'react';
import styled from 'styled-components'
import { Grid, Paper } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const defaultIconStyle = `
  position: absolute;
  right: 5px;
  top: 3px;
  cursor: pointer;
  z-index: 1;
`

const UnCheckedIcon = styled(CheckCircleOutlineIcon)`
  ${defaultIconStyle}
  color: #bbb;

  &:hover {
    color: #2980b9;
  }
`

const CheckedIcon = styled(CheckCircleIcon)`
  ${defaultIconStyle}
  color: #2980b9;

  &:hover {
    color: #2c3e50;
  }
`

const GridContainer = styled(Grid)``;

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

const StyledPaper = styled(Paper)`
  position: relative;
  
  > ${GridContainer} {
    opacity: ${props =>  props.marked ? 0.5 : 1};
    position: relative;
  }

  ${Inner} {
    background-color: ${props =>  props.marked ? '#bdc3c7' : '#fff' };
  }
`

function Item({ id, title, writer, href, date, otherList, marked, countClick, markClick }) {
  return (
    <StyledPaper marked={marked ? 1 : 0}>
      {marked 
      ? <CheckedIcon onClick={() => markClick(writer, title)} /> 
      : <UnCheckedIcon onClick={() => markClick(writer, title)} />}
      <GridContainer container spacing={2}>
        <Grid item xs={12}>
          <Inner>
            <Title>
              <a 
                href={href} 
                target="_blank"
                onClick={() => markClick(writer, title, false)}
                rel="noopener noreferrer">
                {title}
              </a>
            </Title>
            <Info>
              <Writer>글쓴이: {writer}</Writer>
              <PostDate>{date}</PostDate>
              <Count onClick={(event) => countClick(event, otherList)}>작성자의 다른글: {otherList.length}</Count>
            </Info>
          </Inner>
        </Grid>
      </GridContainer>
    </StyledPaper>
  );
}

export default Item;