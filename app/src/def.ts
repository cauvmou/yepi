
export interface QuoteData {
    quote: string,
    date: string,
    source: "Twitter" | "Live" | "Interview" | "Other" | "Song",

    metadata: undefined | Metadata
}

export interface QuoteDataDate {
    quote: string,
    date: Date,
    source: "Twitter" | "Live" | "Interview" | "Other" | "Song",

    metadata: undefined | Metadata
}

export interface Metadata {
    songName: string,
    timing: string,
}

export interface HealthzObject {
    TimeSpend: string,
    InstanceOfRequests: number,
    AverageTime: string,
}