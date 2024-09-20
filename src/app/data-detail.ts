export class DataDetail {
    private static currentID = 0;
    ID!: number;
    Name!: string;
    Date!: number;
}

export let data: DataDetail[] = [
    {
        ID: 1,
        Name: "Chien",
        Date: 2003
    },
    {
        ID: 2,
        Name: "BOSS",
        Date: 1999
    }
];


