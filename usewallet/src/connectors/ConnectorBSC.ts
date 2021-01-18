import { Connector } from '../types'
import { ConnectionRejectedError } from '../errors'

export default async function init(): Promise<Connector> {
  const { BscConnector, UserRejectedRequestError } = await import(
    '@binance-chain/bsc-connector'
  )
  return {
    web3ReactConnector({ chainId }: { chainId: number }) {
      return new BscConnector({ supportedChainIds: [chainId] })
    },
    handleActivationError(err: Error) {
      if (err instanceof UserRejectedRequestError) {
        return new ConnectionRejectedError()
      }
      return null
    },
  }
}
