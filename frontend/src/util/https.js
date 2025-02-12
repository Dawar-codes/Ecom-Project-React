import axios from 'axios';


// fetch all products
export async function fetchProducts(searchTerm = "") {
    try {
        const url = searchTerm ? `http://localhost:3000/products?search=${encodeURIComponent(searchTerm)}` : "http://localhost:3000/products";
        const response = await axios.get(url);
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


//add new product
export async function addProduct({ name, description, price, image }) {

    try {
        const response = await axios.post('http://localhost:3000/products/new', { name, description, price, image }, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response.message);

        return response.data;

    } catch (error) {
        console.error("Error adding product", error.response?.data || error.message);
        throw error;
    }
}


//create new user
export async function createUser({ name, email, password }) {


    try {
        const response = await axios.post("http://localhost:3000/auth/register", { name, email, password }, { headers: { 'Content-Type': 'application/json' } })
        return response.data;
    } catch (error) {
        console.error("Error during Registration:", error.response?.data || error.message);
        throw error;

    }

}

//login user
export async function loginUser({ email, password }) {

    try {
        const response = await axios.post("http://localhost:3000/auth/login", { email, password }, {
            withCredentials: true  // Include credentials in this request
        }, { headers: { 'Content-Type': 'application/json' } })
        return response.data;
    } catch (error) {
        console.error("Error during logging in:", error.response?.data || error.message);
        throw error;

    }
}


export async function checkoutOrder(payload) {
    try {
      const response = await axios.post(
        "http://localhost:3000/checkout",
        payload,{
            withCredentials: true  // Include credentials in this request
        },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error during checkout:", error.response?.data || error.message);
      throw error;
    }
  }

export async function logout() {
    try {
        await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
        localStorage.removeItem("userRole"); // Remove role from local storage
        window.location.reload(); // Force UI update
    } catch (error) {
        console.error("Logout error:", error);
    }
}