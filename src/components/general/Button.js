import { Button } from 'antd'
import styled from 'styled-components'

const SeeThroughButton = styled(Button)`
  background-color: inherit !important;
  border-color: #EC407A !important;
  color: inherit !important;
  ${({ primary }) => primary ? `
    background-color: #EC407A !important;
    border-color: #EC407A !important;
    color: #fff !important;
  ` : null}
  &:hover, &:active {
    background-color: #EC407A !important;
    border-color: #EC407A !important;
    color: #fff !important;
  }
  &:disabled {
    background-color: inherit !important;
    border-color: #EC407A !important;
    color: inherit !important;
    opacity: 0.5;
  }
`

export default SeeThroughButton
