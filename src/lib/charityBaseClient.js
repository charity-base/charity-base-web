import charityBaseClient from 'charity-base'
import { charityBaseApiKey } from './constants'

const charityBase = charityBaseClient({
  apiKey: charityBaseApiKey,
  baseUrl: '/api',
})

export default charityBase
