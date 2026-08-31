import axios, {AxiosRequestConfig} from 'axios';
import {
    Balance,
    GetAccountBalanceReply,
    GetAccountBalanceRequest,
    GetBlocksReply,
    GetBlocksRequest,
    GetCurrenciesReply,
    GetCurrenciesRequest,
    GetLogsReply,
    GetLogsRequest,
    GetNFTHoldersReply,
    GetNFTHoldersRequest,
    GetNFTMetadataReply,
    GetNFTMetadataRequest,
    GetNFTsByOwnerReply,
    GetNFTsByOwnerRequest,
    GetNftTransfersReply,
    GetTokenHoldersCountReply,
    GetTokenHoldersCountRequest,
    GetTokenHoldersReply,
    GetTokenHoldersRequest,
    GetTokenPriceReply,
    GetTokenPriceRequest,
    GetTokenTransfersReply,
    GetTransactionsByAddressReply,
    GetTransactionsByAddressRequest,
    GetTransactionsByHashReply,
    GetTransactionsByHashRequest,
    GetTransfersRequest,
    GetTokenPriceHistoryRequest,
    GetTokenPriceHistoryReply,
    GetInteractionsRequest,
    GetInteractionsReply,
    ExplainTokenPriceRequest,
    ExplainTokenPriceReply,
    GetBlockchainStatsRequest,
    GetBlockchainStatsReply
} from "./types";

type JsonRPCPayload = { error?: { code?: number, data?: any, message?: string }, result?: any };

export class AnkrProvider {
    url: string
    requestConfig: AxiosRequestConfig
    _nextId: number

    /**
     * Constructs an instance of AnkrProvider.
     * @param endpoint Advanced API endpoint. Example: https://rpc.ankr.com/multichain/YOUR-TOKEN
     */
    constructor(endpoint: string) {
        this.url = endpoint
        this.requestConfig = {headers: {'Content-Type': 'application/json', 'Accept-Encoding': 'gzip'}};
        this._nextId = 1
    }

    /**
     * Returns the array of Log matching the filter.
     * @param params A GetLogsRequest object.
     * @returns Promise<GetLogsReply>
     */
    async getLogs(params: GetLogsRequest): Promise<GetLogsReply> {
        return this.send<GetLogsReply>("ankr_getLogs", params)
    }

    /**
     * Returns the array of Block within specified range.
     * @param params A GetBlocksRequest object.
     * @returns Promise<GetBlocksReply>
     */
    async getBlocks(params: GetBlocksRequest): Promise<GetBlocksReply> {
        return this.send<GetBlocksReply>("ankr_getBlocks", params)
    }

    /**
     * Returns the Transaction(s) with specified hash among all supported blockchains.
     * @param params A GetTransactionsByHashRequest object.
     * @returns Promise<GetTransactionsByHashReply>
     */
    async getTransactionsByHash(params: GetTransactionsByHashRequest): Promise<GetTransactionsByHashReply> {
        return this.send<GetTransactionsByHashReply>("ankr_getTransactionsByHash", params)
    }

    /**
     * Returns Transactions of specified address.
     * @param params A GetTransactionsByAddressRequest object.
     * @returns Promise<GetTransactionsByAddressReply>
     */
    async getTransactionsByAddress(params: GetTransactionsByAddressRequest): Promise<GetTransactionsByAddressReply> {
        return this.send<GetTransactionsByAddressReply>("ankr_getTransactionsByAddress", params)
    }

    /**
     * Returns Transfers of specified address.
     * @param params A GetTransfersRequest object.
     * @returns Promise<GetTokenTransfersReply>
     */
    async getTokenTransfers(params: GetTransfersRequest): Promise<GetTokenTransfersReply> {
        return this.send<GetTokenTransfersReply>("ankr_getTokenTransfers", params)
    }

    /**
     * Returns NFT Transfers of specified address.
     * @param params A GetNftTransfersRequest object.
     * @returns Promise<GetNftTransfersReply>
     */
    async getNftTransfers(params: GetNftTransfersRequest): Promise<GetNftTransfersReply> {
        return this.send<GetNftTransfersReply>("ankr_getNftTransfers", params)
    }

    /**
     * Returns coin and token balances of the wallet.
     * @param params A GetAccountBalanceRequest object.
     * @returns Promise<Balance[]>
     */
    async getAccountBalance(params: GetAccountBalanceRequest): Promise<GetAccountBalanceReply> {
        return this.send<GetAccountBalanceReply>("ankr_getAccountBalance", params)
    }

    /**
     * Returns NFT collectibles of the wallet.
     * @param params A GetNFTsByOwnerRequest object.
     * @returns Promise<GetNFTsByOwnerReply>
     */
    async getNFTsByOwner(params: GetNFTsByOwnerRequest): Promise<GetNFTsByOwnerReply> {
        return this.send<GetNFTsByOwnerReply>("ankr_getNFTsByOwner", params)
    }

    /**
     * Returns NFT's contract metadata.
     * @param params A GetNFTMetadataRequest object.
     * @returns Promise<GetNFTMetadataRequest>
     */
    async getNFTMetadata(params: GetNFTMetadataRequest): Promise<GetNFTMetadataReply> {
        return await this.send<GetNFTMetadataReply>("ankr_getNFTMetadata", params)
    }

    /**
     * Returns NFT's holders.
     * @param params A GetNFTHoldersRequest object.
     * @returns Promise<GetNFTHoldersRequest>
     */
    async getNFTHolders(params: GetNFTHoldersRequest): Promise<GetNFTHoldersReply> {
        return await this.send<GetNFTHoldersReply>("ankr_getNFTHolders", params)
    }

    /**
     * Returns list of token holders.
     * @param params A GetTokenHoldersRequest object.
     * @returns Promise<GetTokenHoldersReply>
     */
    async getTokenHolders(params: GetTokenHoldersRequest): Promise<GetTokenHoldersReply> {
        return this.send<GetTokenHoldersReply>("ankr_getTokenHolders", params)
    }

    /**
     * Returns list of historical token holders count by day.
     * @param params A GetTokenHoldersCountRequest object.
     * @returns Promise<GetTokenHoldersCountReply>
     */
    async getTokenHoldersCount(params: GetTokenHoldersCountRequest): Promise<GetTokenHoldersCountReply> {
        return this.send<GetTokenHoldersCountReply>("ankr_getTokenHoldersCount", params)
    }

    /**
     * Returns token USD price.
     * @param params A GetTokenPriceRequest object.
     * @returns Promise<GetTokenPriceReply>
     */
    async getTokenPrice(params: GetTokenPriceRequest): Promise<GetTokenPriceReply> {
        return this.send<GetTokenPriceReply>("ankr_getTokenPrice", params)
    }

    /**
     * Returns list of currencies.
     * @param params A GetCurrenciesRequest object.
     * @returns Promise<GetCurrenciesReply>
     */
    async getCurrencies(params: GetCurrenciesRequest): Promise<GetCurrenciesReply> {
        return this.send<GetCurrenciesReply>("ankr_getCurrencies", params)
    }

    /**
     * Returns history of the token price.
     * @param params A GetTokenPriceHistoryRequest object.
     * @returns Promise<GetTokenPriceHistoryReply>
     */
    async getTokenPriceHistory(params: GetTokenPriceHistoryRequest): Promise<GetTokenPriceHistoryReply> {
        return this.send<GetTokenPriceHistoryReply>("ankr_getTokenPriceHistory", params)
    }

    /**
     * Returns a list of tokens and the pool used for price calculation.
     * @param params A ExplainTokenPriceRequest object.
     * @returns Promise<ExplainTokenPriceReply>
     */
    async explainTokenPrice(params: ExplainTokenPriceRequest): Promise<ExplainTokenPriceReply> {
        return this.send<ExplainTokenPriceReply>("ankr_explainTokenPrice", params)
    }

    /**
     * Returns blockchain stats (num of txs, etc.).
     * @param params A GetBlockchainStatsRequest object.
     * @returns Promise<GetBlockchainStatsReply>
     */
    async getBlockchainStats(params: GetBlockchainStatsRequest): Promise<GetBlockchainStatsReply> {
        return this.send<GetBlockchainStatsReply>("ankr_getBlockchainStats", params)
    }

    /**
     * Returns on which chain address was interacting.
     * @param params A GetInteractionsRequest object.
     * @returns Promise<GetInteractionsReply>
     */
    async getInteractions(params: GetInteractionsRequest): Promise<GetInteractionsReply> {
        return this.send<GetInteractionsReply>("ankr_getInteractions", params)
    }


    private async send<TReply>(method: string, params: any): Promise<TReply> {
        const request = {method, params, id: (this._nextId++), jsonrpc: "2.0"};
        const response = await axios.post<JsonRPCPayload>(this.url, JSON.stringify(request), this.requestConfig);
        return await AnkrProvider.getResult(response.data) as TReply;
    }

    private static getResult(payload: JsonRPCPayload): any {
        if (payload.error) {
            const error: any = new Error(payload.error.message);
            error.code = payload.error.code;
            error.data = payload.error.data;
            throw error;
        }
        return payload.result;
    }
}
