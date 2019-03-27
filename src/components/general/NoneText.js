import styled from 'styled-components'

const NoneText = styled.span`
  opacity: 0.9;
  font-size: ${({ size }) => size ? size : 14}px;
`

export { NoneText }
