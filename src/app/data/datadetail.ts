//Data

export class Datadetail {
    private static currentID = 9;
    id: number;
    Name: string;
    Date: number;
    Salary: number;
    Location: string;
    Remote: string;
    Favorite: boolean;

    constructor(Name: string, Date: number, Salary: number, Location: string, Remote: string, Favorite: boolean) {
        this.id = Datadetail.currentID++;
        this.Name = Name;
        this.Date = Date;
        this.Salary = Salary;
        this.Location = Location; 
        this.Remote = Remote;
        this.Favorite = Favorite;
    }
}

export let elementData: Datadetail = {
        id: 0,
        Name: "",
        Date: 0,
        Salary: 0,
        Location: "",
        Remote: "",
        Favorite: false
    };

export let data: Datadetail[] = [
    {
        id: 1,
        Name: "Tran Dai Dung",
        Date: 2003,
        Salary: 1500000,
        Location: "hanoi",
        Remote: "true",
        Favorite: true
    },
    {
        id: 2,
        Name: "Mai Tien Dung",
        Date: 2000,
        Salary: 2000000,
        Location: "danang",
        Remote: "false",
        Favorite: true
    },
    {
        id: 3,
        Name: "Nguyen Phu Trong",
        Date: 1944,
        Salary: 8000000,
        Location: "tphcm",
        Remote: "false",
        Favorite: false
    },
    {
        id: 4,
        Name: "Truong Tan Sang",
        Date: 1950,
        Salary: 13000000,
        Location: "hanoi",
        Remote: "true",
        Favorite: false
    },
    {
        id: 5,
        Name: "Tran Hong Quan",
        Date: 1980,
        Salary: 5000000,
        Location: "danang",
        Remote: "true",
        Favorite: false
    },
    {
        id: 6,
        Name: "Dang Hoang Hanh",
        Date: 2005,
        Salary: 9000000,
        Location: "tphcm",
        Remote: "false",
        Favorite: false
    },
    {
        id: 7,
        Name: "Trinh Van Quyen",
        Date: 2022,
        Salary: 3000000,
        Location: "hanoi",
        Remote: "false",
        Favorite: false
    },
    {
        id: 8,
        Name: "Nguyen Ai Quoc",
        Date: 1890,
        Salary: 4500000,
        Location: "danang",
        Remote: "false",
        Favorite: true
    },
];
