import CharityBaseClient from 'charity-base'
import { charityBaseApiKey, charityBaseApiUri } from './constants'

const charityBase = new CharityBaseClient({
  apiKey: charityBaseApiKey,
  baseUrl: charityBaseApiUri,
})

export default charityBase
