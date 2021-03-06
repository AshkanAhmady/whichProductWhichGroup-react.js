import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GlobalStateInterface } from "../../../Interfaces";
import {
  addProduct,
  setShowForm,
  addOptions,
} from "../../Redux/Product/productActions";
import styles from "./AddProductForm.module.css";

const AddProductForm = () => {
  const [showGroup, setShowGroup] = useState(false);
  const [product, setProduct] = useState({
    id: 0,
    title: "",
    number: 0,
    group: "",
    created_at: 0,
    updated_at: 0,
  });

  const dispatch = useDispatch();
  const group = useSelector((state: GlobalStateInterface) => state.group);
  const showForm = useSelector((state: GlobalStateInterface) => state.showForm);

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.currentTarget.name]: e.currentTarget.value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addOptions(product));
    dispatch(addProduct(product));
    // notification
    toast.success("محصول شما ثبت شد");
    dispatch(setShowForm());
    setProduct({
      id: 0,
      title: "",
      number: 0,
      group: "",
      created_at: 0,
      updated_at: 0,
    });
  };

  return (
    <div className={styles.formBox}>
      {showForm && (
        <form onSubmit={submitHandler} className={styles.productForm}>
          <input
            required
            name="title"
            placeholder="نام محصول ..."
            onChange={changeHandler}
            type="text"
            value={product.title}
          />
          <input
            required
            name="number"
            placeholder="تعداد محصول ..."
            onChange={changeHandler}
            type="number"
            value={product.number}
          />
          <div className={styles.groupBox}>
            <h2>دسته بندی</h2>
            {showGroup === true ? (
              <input
                required
                name="group"
                placeholder="دسته بندی ..."
                onChange={changeHandler}
                type="text"
                value={product.group}
              />
            ) : group.length === 0 ? (
              <input
                required
                name="group"
                placeholder="دسته بندی ..."
                onChange={changeHandler}
                type="text"
                value={product.group}
              />
            ) : (
              group.map((item, index: number) => {
                return (
                  <div className={styles.singleGroup} key={index}>
                    <label htmlFor={item}>{item}</label>
                    <input
                      checked={product.group === item}
                      onChange={changeHandler}
                      type="radio"
                      id={item}
                      value={item}
                      name="group"
                    />
                  </div>
                );
              })
            )}
            {group.length !== 0 && (
              <a
                className={`${styles.newGroupBtn} ${
                  showGroup === false ? styles.Registered : ""
                }`}
                onClick={() => setShowGroup(!showGroup)}
              >
                {showGroup === false
                  ? "دسته بندی جدید"
                  : "دسته بندی های ثبت شده"}
              </a>
            )}
          </div>
          <button type="submit">ذخیره</button>
        </form>
      )}
    </div>
  );
};

export default AddProductForm;
