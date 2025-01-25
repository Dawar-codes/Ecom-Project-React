import express from "express";
import dotenv from 'dotenv';
import prisma from "./db/prisma.js";

dotenv.config();

const app = express();

const port = process.env.port || 3000;

app.get('/', async (req, res) => {
    // await prisma.users.create({
    //     data: {
    //         name: "max Payne",
    //         email: "maxpayne@gmail.com",
    //         password: "maxpayne786",
    //         role: "admin"
    //     }
    // })

    // get all users
    const users = await prisma.users.findMany();
    console.log(users);


    //get user names
    const names = users.map((user) => user.name)


    res.send(`there are ${names.length} users with the names of: ${names.join(", ")}`)
})

app.listen(port, () => console.log(`App listening on port ${port}`));
