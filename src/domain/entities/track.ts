export interface Track {
    name: string;
    artist: string | { name: string };
    url: string;
    streamable: string | { fulltrack: string };
    listeners?: string;
    playcount?: string;
    image?: Array<{ '#text': string; size: string }>;
}