import styled from 'styled-components'
import PropTypes from 'prop-types'

const TextButton = styled.button`
  background: none!important;
  color: ${({ light }) => light ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
  border: none; 
  padding: 0!important;
  font: inherit;
  /*border is optional*/
  ${({ underline, light }) => underline && `border-bottom: 1px solid ${light ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};`}
  cursor: pointer;
  :hover {
    color: ${({ light }) => light ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'};
    ${({ underline, light }) => underline && `border-bottom: 1px solid ${light ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)'};`}
  }
`
TextButton.propTypes = {
  underline: PropTypes.bool,
  light: PropTypes.bool,
}
TextButton.defaultProps = {
  underline: true,
  light: false,
}

export default TextButton