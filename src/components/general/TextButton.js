import styled from 'styled-components'
import { lighten } from 'polished'

const TextButton = styled.button`
  background: none!important;
  color: #444;
  border: none; 
  padding: 0!important;
  font: inherit;
  /*border is optional*/
  ${({ underline }) => underline && 'border-bottom: 1px solid #444;'}
  cursor: pointer;
  :hover {
    color: ${lighten(0.2, '#444')};
    ${({ underline }) => underline && `border-color: ${lighten(0.2, '#444')}`}
  }
`

TextButton.defaultProps = {
  underline: true,
}

export default TextButton