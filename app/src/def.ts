
export interface QuoteDataRaw {
    quote: string,
    date: string,
    source: "Twitter" | "Live" | "Interview" | "Other" | "Song",

    metadata: undefined | Metadata
}

export interface QuoteData {
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

// It's actually supposed to be called like this, don't ask me why
export interface HealthzObject {
    TimeSpent: string,
    InstanceOfRequests: number,
    AverageTime: string,
}