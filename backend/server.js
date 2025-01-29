import express from "express";
import dotenv from 'dotenv';
import prisma from "./db/prisma.js";
import argon2 from 'argon2';




dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    );
    next();
});



//for getting the products
app.get('/products', async (req, res) => {

    const products = await prisma.products.findMany();

    return res.json(products);
})

//for getting one product details
app.get('/products/:id', async (req, res) => {
    const productId = Number(req.params.id);

    const product = await prisma.products.findUnique({
        where: {
            id: productId
        }
    })

    if (!product) {
        return res.json({ status: 404, message: "Error finding product" })
    }

    return res.json(product);
})

//for adding a product
app.post('/products/new', async (req, res) => {
    const userId = req.user.email;
    const { title, description, price, imageUrl } = req.body;

    const newProduct = prisma.products.create({
        data: {
            user_id: userId,
            title,
            description,
            price,
            imageUrl,
        }
    })
})

app.listen(port, () => console.log(`App listening on port ${port}`));



//for registering users
app.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }

    try {
        const existingUser = await prisma.users.findUnique({
            where: {
                email: email
            }
        });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use. Please use another email." })
        }

        let hashedPassword;
        try {
            hashedPassword = await argon2.hash(password);
        } catch (error) {
            console.error("hashing failed", error);
            return res.status(500).json({message: "An error occured while processing your request"})
        }
    
        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return res.status(201).json({ message: "User Creaeted Successfully", data: newUser })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An unexcpected error occurred." })

    }

})