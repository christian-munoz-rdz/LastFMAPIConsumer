export interface ArtistList {
    artists: Artists;
}

export interface Artists {
    artist:  Artist[];
    "@attr": Attr;
}

export interface Attr {
    page:       string;
    perPage:    string;
    totalPages: string;
    total:      string;
}

export interface Artist {
    name:       string;
    playcount:  string;
    listeners:  string;
    mbid:       string;
    url:        string;
    streamable: string;
    image:      Image[];
}

export interface Image {
    "#text": string;
    size:    Size;
}

export enum Size {
    Extralarge = "extralarge",
    Large = "large",
    Medium = "medium",
    Mega = "mega",
    Small = "small",
}
