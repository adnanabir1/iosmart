import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../providers/AuthProvider";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    const productData = {
      productName: data.productName,
      pictureUrl: data.pictureUrl,
      price: parseFloat(data.price),
      processor: data.processor,
      ram: parseInt(data.ram),
      rom: parseInt(data.rom),
      battery: parseInt(data.battery),
      additionalInfo: data.additionalInfo,
    };
    fetch("http://localhost:5000/product", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(productData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          swal("Product Added Successfully");
          reset();
        }
      });
  };

  return (
    <>
      <div className="text-3xl text-center  mt-20">
        <span>Add Product</span>
      </div>
      <div className="card-body w-[95%] lg:w-2/3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                {...register("productName", { required: true })}
                type="text"
                name="productName"
                placeholder="Product Name"
                className="input input-bordered"
              />
              {errors.productName && (
                <span className="text-red-500">Product Name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                name="price"
                className="input input-bordered"
              />
              {errors.price && (
                <span className="text-red-500">Price is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Picture URL</span>
              </label>
              <input
                {...register("pictureUrl", { required: true })}
                type="text"
                name="pictureUrl"
                placeholder="Picture URL"
                className="input input-bordered"
              />
              {errors.pictureUrl && (
                <span className="text-red-500">Picture URL is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">RAM</span>
              </label>
              <input
                {...register("ram", { required: true })}
                type="number"
                name="ram"
                placeholder="RAM"
                className="input input-bordered"
              />
              {errors.ram && (
                <span className="text-red-500">RAM is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">ROM</span>
              </label>
              <input
                {...register("rom", { required: true })}
                type="number"
                name="rom"
                placeholder="ROM"
                className="input input-bordered"
              />
              {errors.rom && (
                <span className="text-red-500">ROM is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Battery</span>
              </label>
              <input
                {...register("battery", { required: true })}
                type="number"
                name="battery"
                placeholder="Available Quantity"
                className="input input-bordered flex-grow-1"
              />
              {errors.battery && (
                <span className="text-red-500">Battery is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Processor</span>
              </label>
              <input
                type="text"
                name="processor"
                placeholder="Processor"
                className="input input-bordered"
              />
              {errors.processor && (
                <span className="text-red-500">Processor is required</span>
              )}
            </div>
          </div>
          <div className="form-control mt-6">
            <label className="label">
              <span className="label-text">Any Additional Info?</span>
            </label>
            <textarea
              {...register("additionalInfo")}
              type="text"
              name="additionalInfo"
              placeholder="If Needed"
              className="input input-bordered pt-3"
            />
          </div>
          <div className="form-control mt-10">
            <input
              className="btn btn-neutral"
              type="submit"
              value="Add product"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
