import { Group } from './group';

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    groups: Group[];
}
