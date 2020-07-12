export interface ToutsState {
    tours: Tour[],
    filter: {
        tags: string;
        date_from: string;
        date_to: string;
        region: string;
    }
}

export interface Tour {
    id: number;
}