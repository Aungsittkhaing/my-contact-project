import axios from "axios";
import React, { useState } from "react";
import { BsFillPhoneFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  //sweetalert
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  //post to the server
  const apiCreateContact = async (contact) => {
    const { data } = await axios.post("http://localhost:3000/contact", contact);
    console.log(data);
    Toast.fire({
      icon: "success",
      title: "created successfully",
    });
    navigate("/");
  };

  //when you click create btn
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(name, email, phone);
    const contact = { id: Date.now(), name, email, phone };
    apiCreateContact(contact);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-96 border p-5 rounded mx-auto shadow-lg mt-20"
    >
      <h1 className="text-2xl font-bold text-gray-800">Create New Contact</h1>
      <div>
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            @
          </span>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            id="website-admin"
            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="please type your name"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="input-group-1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
            </svg>
          </div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            id="input-group-1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@gmail.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="input-group-1"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BsFillPhoneFill className="text-gray-400" />
          </div>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="number"
            id="input-group-1"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="09......"
          />
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-gray-700 px-4 py-2 rounded my-5 uppercase shadow-lg text-sm"
      >
        Create
      </button>
      <Link to="/">
        <button className="text-white bg-blue-500 px-4 py-2 ml-4 rounded my-5 uppercase shadow-lg text-sm">
          Cancel
        </button>
      </Link>
    </form>
  );
};

export default Create;
