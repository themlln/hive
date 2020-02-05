import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Canvas} from "./entity/Canvas"
import {Collaborators} from "./entity/Collaborator"
import '../../secrets'

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.email = "cody@email.com";
    user.password = "123";
    user.salt = "123";
    user.sessionId = '1';
    user.googleId = '1';
    await connection.manager.save(user);
    const user2 = new User();
    user2.email = "ming@email.com";
    user2.password = "123";
    user2.salt = "123";
    user2.sessionId = '2';
    user2.googleId = '2';
    await connection.manager.save(user2)

    console.log("Saved a new user with id: " + user.id + user2.id);

    console.log("Inserting a new canvas into the database...");
    const canvas = new Canvas()
    canvas.canvasObj = 'This is a canvas!'
    canvas.owner = user
    await connection.manager.save(canvas);

    console.log("Saved a new canvas with id: " + canvas.id);

    console.log("Inserting a new shared canvas into the database...");
    const collaborator = new Collaborators()
    collaborator.canvas = canvas
    collaborator.user = user2
    await connection.manager.save(collaborator);

    console.log("Saved a new shared canvas with id: " + collaborator.sharedId);

    console.log("Loading users and canvas from the database...");
    const users = await connection.manager.find(User);
    const canvases = await connection.manager.find(Canvas);
    console.log("Loaded users: ", users);
    console.log("Loaded canvases: ", canvases);

    console.log("Connection has been established gloriously by Mizzo.");

}).catch(error => console.log("Unable to connect Mingo to the database:", error));
