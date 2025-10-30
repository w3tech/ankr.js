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
    GetNftTransfersRequest,
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

    constructor(endpoint: string) {
        this.url = endpoint
        this.requestConfig = {headers: {'Content-Type': 'application/json', 'Accept-Encoding': 'gzip'}};
        this._nextId = 1
    }

    async getLogs(params: GetLogsRequest): Promise<GetLogsReply> {
        return this.send<GetLogsReply>("ankr_getLogs", params)
    }

    async getBlocks(params: GetBlocksRequest): Promise<GetBlocksReply> {
        return this.send<GetBlocksReply>("ankr_getBlocks", params)
    }

    async getTransactionsByHash(params: GetTransactionsByHashRequest): Promise<GetTransactionsByHashReply> {
        return this.send<GetTransactionsByHashReply>("ankr_getTransactionsByHash", params)
    }

    async getTransactionsByAddress(params: GetTransactionsByAddressRequest): Promise<GetTransactionsByAddressReply> {
        return this.send<GetTransactionsByAddressReply>("ankr_getTransactionsByAddress", params)
    }

    async getTokenTransfers(params: GetTransfersRequest): Promise<GetTokenTransfersReply> {
        return this.send<GetTokenTransfersReply>("ankr_getTokenTransfers", params)
    }

    async getNftTransfers(params: GetNftTransfersRequest): Promise<GetNftTransfersReply> {
        return this.send<GetNftTransfersReply>("ankr_getNftTransfers", params)
    }

    async getAccountBalance(params: GetAccountBalanceRequest): Promise<GetAccountBalanceReply> {
        return this.send<GetAccountBalanceReply>("ankr_getAccountBalance", params)
    }

    async getNFTsByOwner(params: GetNFTsByOwnerRequest): Promise<GetNFTsByOwnerReply> {
        return this.send<GetNFTsByOwnerReply>("ankr_getNFTsByOwner", params)
    }

    /**
     * Returns NFT's contract metadata.
     * @param params A GetNFTMetadataRequest object.
     * @returns Promise<GetNFTMetadataReply>
     */
    async getNFTMetadata(params: GetNFTMetadataRequest): Promise<GetNFTMetadataReply> {
        return await this.send<GetNFTMetadataReply>("ankr_getNFTMetadata", params)
    }

    /**
     * Returns NFT's holders.
     * @param params A GetNFTHoldersRequest object.
     * @returns Promise<GetNFTHoldersReply>
     */
    async getNFTHolders(params: GetNFTHoldersRequest): Promise<GetNFTHoldersReply> {
        return await this.send<GetNFTHoldersReply>("ankr_getNFTHolders", params)
    }

    async getTokenHolders(params: GetTokenHoldersRequest): Promise<GetTokenHoldersReply> {
        return this.send<GetTokenHoldersReply>("ankr_getTokenHolders", params)
    }

    async getTokenHoldersCount(params: GetTokenHoldersCountRequest): Promise<GetTokenHoldersCountReply> {
        return this.send<GetTokenHoldersCountReply>("ankr_getTokenHoldersCount", params)
    }

    async getTokenPrice(params: GetTokenPriceRequest): Promise<GetTokenPriceReply> {
        return this.send<GetTokenPriceReply>("ankr_getTokenPrice", params)
    }

    async getCurrencies(params: GetCurrenciesRequest): Promise<GetCurrenciesReply> {
        return this.send<GetCurrenciesReply>("ankr_getCurrencies", params)
    }

    async getTokenPriceHistory(params: GetTokenPriceHistoryRequest): Promise<GetTokenPriceHistoryReply> {
        return this.send<GetTokenPriceHistoryReply>("ankr_getTokenPriceHistory", params)
    }

    async explainTokenPrice(params: ExplainTokenPriceRequest): Promise<ExplainTokenPriceReply> {
        return this.send<ExplainTokenPriceReply>("ankr_explainTokenPrice", params)
    }

    async getBlockchainStats(params: GetBlockchainStatsRequest): Promise<GetBlockchainStatsReply> {
        return this.send<GetBlockchainStatsReply>("ankr_getBlockchainStats", params)
    }

    async getInteractions(params: GetInteractionsRequest): Promise<GetInteractionsReply> {
        return this.send<GetInteractionsReply>("ankr_getInteractions", params)
    }

    private async send<TReply>(method: string, params: any): Promise<TReply> {
        const request = {method, params, id: (this._nextId++), jsonrpc: "2.0"};
        const response = await axios.post<JsonRPCPayload>(this.url, JSON.stringify(request), this.requestConfig);
        return AnkrProvider.getResult(response.data) as TReply
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
