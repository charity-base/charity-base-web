import styled from 'styled-components'

const InfoText = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
  letter-spacing: 0.04em;
  line-height: 1.6;
  font-weight: 400;
  ${({ center }) => center && 'text-align: center;'}
`

export { InfoText }
