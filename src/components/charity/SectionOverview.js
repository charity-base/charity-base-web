import styled from 'styled-components'
import { Card } from 'antd'

const SectionOverview = styled(Card)`
  text-align: center;
  margin-top: 8px;
  margin-bottom: 8px;
  ${({ hoverable }) => hoverable && `
    background: linear-gradient(to bottom right, #FFF, #FAFAFA);
    :hover {
      border-color: #F8BBD0;
    }
  `}
`


export { SectionOverview }
