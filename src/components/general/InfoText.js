import styled from 'styled-components'

const SideBarTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 20px;
`

const InfoText = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
  letter-spacing: 0.04em;
  line-height: 1.6;
  font-weight: 400;
  ${({ center }) => center && 'text-align: center;'}
`

export { InfoText, SideBarTitle }
