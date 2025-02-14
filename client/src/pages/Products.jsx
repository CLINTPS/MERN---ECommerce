import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Products = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        console.log("Response of all products:",response);
        
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          setProducts([]);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br h-screen from-gray-100 to-black">
    <h1 className="text-2xl font-bold mb-4 items-center">All Products</h1>

    {loading ? (
      <p>Loading products...</p>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : products.length === 0 ? (
      <p>No products available</p>
    ) : (
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 shadow-md rounded-md">
            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-2" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-900">{product.description}</p>
            <p className="text-lg font-bold">Price: ${product.price}</p>
            {product.stock === 0 ? (
                <p className="text-red-600 font-bold">Out of Stock</p>
              ) : product.stock <= 10 ? (
                <p className="text-yellow-500 font-semibold">Only {product.stock} left in stock!</p>
              ) : (
                <p className="text-green-600 font-semibold">In Stock: {product.stock}</p>
              )}
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default Products
