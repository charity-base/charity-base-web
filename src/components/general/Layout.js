import styled from 'styled-components'

const FixedHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ height }) => height ? `${height}px` : '150px'};
  padding: 24px;
  background-color: #FFF;
  z-index: 999;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #FAFAFA;
`

const ScrollableContent = styled.div`
  padding: ${({ paddingTop }) => paddingTop === undefined ? 150 : paddingTop}px 24px 24px 24px;
  height: 100%;
  overflow-y: scroll;
`

export { FixedHeader, ScrollableContent }