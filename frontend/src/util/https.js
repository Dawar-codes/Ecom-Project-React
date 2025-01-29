import axios from 'axios';


// fetch all products
export async function fetchProducts() {
    try {
        const response = await axios.get("http://localhost:3000/products");
        const products = response.data;

        return products;
    } catch (error) {
        console.error("error fetching products", error.message);
        return [];

    }

}


// fetch single product
export async function fetchProduct({ id, signal }) {
    try {
        const response = await axios.get(`http://localhost:3000/products/${id}`, { signal });
        const product = response.data;
        return product;

    } catch (error) {
        if (axios.isCancel(error)) {     //added this because in-flight request canceled and was showing error
            console.log("request canceled");

        } else {
            console.error("error fetching product,", error.message);
            throw error;
        }

        return {};
    }
}


//create new user
export async function createUser({ name, email, password }) {
    console.log({ name, email, password });
    
    // try {
    //     const response = await axios.post("http://localhost:3000/auth/register", { name, email, password }, {headers: {'Content-Type': 'application/json'}})
    //     return response.data;
    // } catch (error) {
    //     console.error("Error during Registration:", error.response?.data || error.message);
    //     throw error;
        
    // }

    fetch("http://localhost:3000/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {'Content-Type': 'application/json'} 
    })
}

