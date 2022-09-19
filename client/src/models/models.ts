export interface IUserData {
    _id: string;
    email: string;
    notes: INoteData[];
    token: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface INoteData {
    _id: string;
    title: string;
    text: string;
    user: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
