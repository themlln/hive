# Hive
##### A real-time, interactive collaboration platform to share ideas visually and verbally.
Hive utilizes Fabric.js to build a manipulatable whiteboard object that allows users to easily create and update their ideas, alongside a chat box to discuss the changes.
## The Team
[ ] Ming Chen
[ ] Laura Barger
[ ] Liz Einstein
[ ] Nuri Park
## Technologies Used
Front-end: Typescript, React, Redux, React-Redux, Fabric.js, Material-UI
Back-end: TypeORM/PostgreSQL, Node.js, Express
## Getting Started
1.  `git clone` this repository to your local computer.__
2.  In your computer's terminal, run `npm install`
3.  Run `npm run start-dev`
## Database Schema
## User Flow
![Image of User Flow]
(public/user-flow.png)
### Draw
The Draw tools can be found in the top panel of the whiteboard. Set the color before clicking on the shapes, text and line. There are two color options for stroke and fill. Stroke refers to text, lines and shape borders. Fill refers to the shape's body.
### Room Key
Users can share their individual Hiveboard with others by copying the room key and sending the key to another user. The other user can enter the room key in the welcome form at hivebymlln.herokuapp.com.
### Download
Users have the option to download their Hiveboard locally to their machines via the download tool.
### Chat
Users can chat with each other via the chat box on the right panel.
