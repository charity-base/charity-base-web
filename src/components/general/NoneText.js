import styled from 'styled-components'

const NoneText = styled.span`
  color: rgba(0,0,0,.4);
  font-size: ${({ size }) => size ? size : 14}px;
`

export { NoneText }
