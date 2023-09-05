import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const UpdateProduct = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: productInfo = [], refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/products/${id}`);
      return res.json();
    },
  });

  const onSubmit = (data) => {
    // console.log(data);
    const updateProductData = {
      pictureUrl: data.pictureUrl,
      price: data.price,
      ram: data.ram,
      rom: data.rom,
      additionalInfo: data.additionalInfo,
    };
    console.log(data);
    fetch(`http://localhost:5000/product/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateProductData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.modifiedCount > 0) {
          refetch();
          reset();
          swal("Product Updated Successfully");
        }
      });
  };
  return (
    <>
      <div className="text-3xl text-center  mt-20">
        <span>Update Product</span>
      </div>
      <div className="card-body w-[95%] lg:w-2/3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price", { required: true })}
                defaultValue={productInfo.price}
                type="number"
                name="price"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Picture URL</span>
              </label>
              <input
                {...register("pictureUrl", { required: true })}
                defaultValue={productInfo.pictureUrl}
                type="text"
                name="pictureUrl"
                placeholder="Picture URL"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">RAM</span>
              </label>
              <input
                {...register("ram", { required: true })}
                defaultValue={productInfo.ram}
                type="number"
                name="ram"
                placeholder="RAM"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">ROM</span>
              </label>
              <input
                {...register("rom", { required: true })}
                defaultValue={productInfo.rom}
                type="number"
                name="rom"
                placeholder="ROM"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <label className="label">
              <span className="label-text">Any Additional Info?</span>
            </label>
            <textarea
              {...register("additionalInfo", { required: true })}
              defaultValue={productInfo.additionalInfo}
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
              value="Update product"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
