import React, { useEffect, useState } from "react";

import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  // const [products] = useProducts();
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [products]);
  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          swal("Product Deleted Successfully");
          const restProducts = products.filter((product) => product._id !== id);
          setProducts(restProducts);
        }
      });
  };

  return (
    <div className="w-[90%] flex flex-wrap gap-5 mx-auto justify-center my-20  md:my-0">
      {products.map((product) => (
        <div
          key={product._id}
          className="card card-compact w-96 bg-base-100 shadow-xl"
        >
          <figure>
            <img src={product.pictureUrl} />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl">{product.productName}</h2>
            <p className="text-xl">
              <span className="font-semibold">Price: </span>${product.price}
            </p>
            <p className="text-xl">
              <span className="font-semibold">RAM: </span>
              {product.ram}
            </p>
            <p className="text-xl">
              <span className="font-semibold">ROM: </span>
              {product.rom}
            </p>

            <div className="card-actions justify-end">
              <Link
                to={`update/product/${product._id}`}
                className="btn btn-neutral"
              >
                <FaEdit />
              </Link>
              <button
                onClick={() => handleDelete(`${product._id}`)}
                className="btn btn-neutral"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageProducts;
