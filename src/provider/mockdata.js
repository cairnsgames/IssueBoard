export const boardData = {
  id: 1,
  name: "Kanban Board",
  code: "WEB",
  defaultColumn: 10,
  includeEpics: true,
};

export const columnsData = [
  {
    id: 10,
    seq: 1,
    name: "To Do",
    backgroundcolor: "lightgrey",
    color: "black",
  },
  {
    id: 20,
    seq: 2,
    name: "Next up",
    backgroundcolor: "lightgrey",
    color: "black",
  },
  {
    id: 30,
    seq: 3,
    name: "In Progress",
    backgroundcolor: "lightgrey",
    color: "black",
  },
  {
    id: 40,
    seq: 4,
    name: "Ready to Release",
    backgroundcolor: "lightgrey",
    color: "black",
  },
  {
    id: 50,
    seq: 5,
    name: "Done",
    backgroundcolor: "lightgreen",
    color: "black",
  },
];

export const cardsData = [
  {
    id: 1,
    name: "Create Change Password Screen",
    col: 30,
    prefix: "Web",
    priority: 1,
    type: "bug",
    parent: 100,
  },
  {
    id: 2,
    name: "Card 2",
    col: 10,
    prefix: "Web",
    type: "task",
    backgroundcolor: "lightblue",
    color: "black",
  },
  {
    id: 100,
    name: "Example Epic",
    col: 20,
    prefix: "Web",
    type: "epic",
    backgroundcolor: "green",
    color: "white",
    start: new Date("2023-09-01"), // Updated start date
    end: new Date("2023-09-15"), // Updated end date
  },
  {
    id: 101,
    name: "Blue Epic",
    col: 10,
    prefix: "Web",
    type: "epic",
    backgroundcolor: "blue",
    color: "white",
    start: new Date("2023-09-10"), // Updated start date
    end: new Date("2023-09-25"), // Updated end date
  },
  {
    id: 3,
    name: "Card 3",
    col: 10,
    prefix: "Web",
    priority: 2,
    backgroundcolor: "lightgreen",
    color: "red",
    type: "story",
  },
  {
    id: 4,
    name: "Card 4",
    col: 10,
    prefix: "MBL",
    type: "bug",
    priority: 3,
    parent: 101,
    person: 10,
  },
  {
    id: 5,
    name: "Card Blue",
    parent: 101,
    col: 10,
    prefix: "MBL",
    type: "bug",
    priority: 3,
    person: 1,
  },
  // Merging new epics into cardsData
  {
    id: 102,
    name: "Red Epic",
    col: 10,
    prefix: "Web",
    backgroundcolor: "red",
    start: new Date("2023-10-05"),
    end: new Date("2023-10-20"),
    type: "epic",
  },
  {
    id: 103,
    name: "Yellow Epic",
    col: 10,
    prefix: "Web",
    backgroundcolor: "yellow",
    start: new Date("2023-10-15"),
    end: new Date("2023-10-30"),
    type: "epic",
  },
  {
    id: 104,
    name: "Purple Epic",
    col: 10,
    prefix: "Web",
    backgroundcolor: "purple",
    start: new Date("2023-11-01"),
    end: new Date("2023-11-15"),
    type: "epic",
  },
  {
    id: 105,
    name: "Orange Epic",
    col: 0,
    prefix: "Web",
    backgroundcolor: "orange",
    start: new Date("2023-11-05"),
    end: new Date("2023-11-20"),
    type: "epic",
  },
];

export const usersData = [
  { id: 1, username: "William", avatar: "person1.jpeg" },
  { id: 10, username: "Peter Cairns", avatar: undefined },
];
