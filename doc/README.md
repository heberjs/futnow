# FutNow App

## Intro

"FutNow simplifies the search and booking of football matches near to your city, connecting users who want to play but don't have teams, friends, or available fields. Easily find or create matches and join other football enthusiasts in a hassle-free experience."

![](https://media.giphy.com/media/usjtDKDAmOuPu/giphy.gif?cid=ecf05e47wwc0o5yu6k46s73lf3azc4qitkcg5zfzu0d3dv6e&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional Description

### Use Cases

- Create events (field reservation)
- Update events
- Delete events
- Join events (football matches)
- Search for football fields
- Show matches and fields in map
- Filter by proximity

v.0.1

- Create tournaments: Users will be able to create tournaments, allowing them to organize and manage competitive events.
- Chat: Users can communicate with each other through a built-in chat feature, facilitating coordination and discussion among participants.
- i can register in special url for managers (and wait for acceptance from root)
- once accepted, i can register the field (only once)
- i can leave of a match 12hs before start without penalization
- As root:
- i can create matches with calendar
- i can list matches with calendar in field

### User Stories

As manager

- i can register in special url for manager
- i can register fields
- i can update fields
- i can delete fields
- i can create matches
- i can edit matches
- i can delete matches

As player

- i can register
- i can login
- i can scroll matches
- i can enroll a match (if not full)
- i can leave a match

### UI Design

[Figma](https://www.figma.com/file/cw8K38zpv36iQkjQA5fVXC/App?type=design&node-id=0-1&mode=design&t=RHFOp1rBhBeRDwEs-0).

## Technical Description

### Modules

- api (server logic)
- app (client interface)
- com (common utils, tools, ...)

### Technologies

- TypeScript
- React
- Express
- Node
- Tailwind
- Mongo
- ...

### Data Model

User

- id (required)
- fullname(string, required)
- email (string, required)
- password (string, required)
- role (string, required, enum: player|manager)
- status(number, required,  enum: 0|1)

Field

- id (required)
- manager(User.id, required)
- title (string, required)
- address (string, required)
- coords ([number, number])

Match

- id (required)
- field (Field.id, required)
- date (date, required)
- title(string, required)
- description(string, optional)
- players([User.id])
