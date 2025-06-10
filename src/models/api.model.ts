// Generic API response schema type
export interface ApiResponse<T> {
    result: boolean;
    matches: T;
}

// Match detail structure
export interface MatchDetail {
    platform: string;
    value: string;
}

// Account match structure
export interface AccountMatch {
    accountId: string;
    matches: MatchDetail[];
    matchType: string;
}

export type UserLookupResponse = ApiResponse<AccountMatch[]>;