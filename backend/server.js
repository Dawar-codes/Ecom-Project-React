import express from "express";
import dotenv from 'dotenv';
import prisma from "./db/prisma.js";
import argon2 from 'argon2';
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";



dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://yak-leather.netlify.app');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});



//for getting the products
app.get('/products', async (req, res) => {
    try {
        const search = req.query.search || "";

        const products = await prisma.products.findMany({
            where: search
                ? {
                    title: {
                        contains: search,
                        mode: "insensitive", // Case-insensitive search
                    },
                }
                : undefined,
        });

        return res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products" });
    }
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




// for logout 
app.post("/auth/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ error: "Logout failed" });
        }
        req.session.destroy((err) => {
            if (err) {
                console.error("Session destruction error:", err);
                return res.status(500).json({ error: "Failed to destroy session" });
            }
            res.clearCookie("connect.sid"); // Clear the session cookie
            return res.status(200).json({ message: "Logged out successfully" });
        });
    });
});







// for login 
app.post("/auth/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error("Authentication error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (!user) {
            console.log("Invalid credentials:", info.message);
            return res.status(401).json({ error: info.message || "Invalid Credentials" });
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error("Login error:", err);
                return res.status(500).json({ error: "Login failed" });
            }

            return res.json({
                id: user.id,
                email: user.email,
                role: user.role,
            });
        });
    })(req, res, next);
});



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
            return res.status(500).json({ message: "An error occured while processing your request" })
        }

        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return res.status(201).json({ message: "User Creaeted Successfully", user: { name: newUser.name, email: newUser.email, role: newUser.role } })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An unexcpected error occurred." })

    }

})



//for adding a product
app.post('/products/new', async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const email = req.user.email;

    const user = await prisma.users.findUnique({
        where: {
            email: email
        }
    });

    const userId = user.id;


    const { name, description, price, image } = req.body;

    const newProduct = await prisma.products.create({
        data: {
            user_id: userId,
            title: name,
            description,
            price,
            image_url: image,
        }
    })
    return res.status(201).json({ message: "Product added Successfully" });
})



// checkout 
app.post("/checkout", async (req, res) => {
    const email = req.user?.email;

    // Find the user based on their email
    let userId;
    if (email) {
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        });
        userId = user?.id || null;
    }


    const { shippingInfo, cartItems, totalPrice } = req.body;

    // Ensure all required fields are present
    if (!shippingInfo || !cartItems || !totalPrice) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Start a database transaction to handle all writes in one go
        const result = await prisma.$transaction(async (prisma) => {

            // Create the order first
            const createdOrder = await prisma.orders.create({
                data: {
                    userId: userId,
                    price: totalPrice,
                    quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0), // Calculate total quantity
                },
            });

            // Create the shipping information and link it to the created order
            const createdShippingInfo = await prisma.shipping_info.create({
                data: {
                    name: shippingInfo.fullName,
                    email: shippingInfo.email,
                    address: shippingInfo.address,
                    city: shippingInfo.city,
                    zip_code: parseInt(shippingInfo.zip),
                    order: {
                        connect: { id: createdOrder.id },  // Link the shipping info to the created order
                    },
                },
            });

            // Create order items and link them to the created order
            const orderItems = cartItems.map((item) => ({
                orderId: createdOrder.id,
                productId: item.product.id,
                quantity: item.quantity,
                price: item.product.price * item.quantity, // Price for the item
            }));

            // Insert order items into the database
            await prisma.orderItem.createMany({
                data: orderItems,
            });

            return createdOrder;  // Return the created order details
        });

        // Send a success response
        res.status(200).json({
            message: "Order placed successfully!",
            order: result,
        });
    } catch (error) {
        console.error("Error during checkout:", error);
        res.status(500).json({ message: "An error occurred during checkout." });
    }
});





// passport local strategy
passport.use(
    "local",
    new Strategy(
        {
            usernameField: "email",    // Tell passport to use "email" instead of "username"
            passwordField: "password"  // This is the default, but it's good to be explicit
        },
        async function verify(email, password, cb) {
            console.log("Passport Strategy Triggered!"); // Should log on login attempt
            try {
                // Find user by email using Prisma
                const user = await prisma.users.findUnique({
                    where: {
                        email: email,
                    },
                });

                if (user) {
                    const storedHashedPassword = user.password;
                    try {
                        const valid = await argon2.verify(storedHashedPassword, password);
                        console.log("password match", valid);

                        if (!valid) {
                            return cb(null, false, { message: "Invalid password" });
                        } else {
                            // Password is valid, so pass the user to the callback
                            return cb(null, user);
                        }
                    } catch (err) {
                        console.error("Error comparing passwords:", err);
                        return cb(err);
                    }
                } else {
                    return cb(null, false, { message: "User not found" });
                }
            } catch (err) {
                console.error(err);
                return cb(err);
            }
        })
);

passport.serializeUser((user, done) => {
    done(null, user.id); // Store only the user ID
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.users.findUnique({ where: { id } });
        done(null, user);
    } catch (err) {
        done(err);
    }
});



app.listen(port, () => console.log(`App listening on port ${port}`));