
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
    songName: undefined | string,
    album: undefined | string,
    specificSource: undefined | string,
}

export interface HealthzObject {
    TimeSpend: string,
    InstanceOfRequests: number,
    AverageTime: string,
}