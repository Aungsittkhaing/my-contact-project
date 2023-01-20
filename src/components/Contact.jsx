import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  const swalWithButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-green-500 py-2 px-3 shadow-lg",
      cancelButton: "bg-red-500 py-2 px-3 shadow-lg mr-4",
    },
    buttonsStyling: false,
  });

  const getContacts = async () => {
    const { data } = await axios.get("http://localhost:3000/contact");
    setContacts(data);
  };
  const apiDetelteContact = async (id) => {
    // const { data } = await axios.delete(`http://localhost:3000/contact/${id}`);
    // console.log(data);
    // getContacts();

    //sweet with delete btn
    swalWithButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          swalWithButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          const { data } = await axios.delete(
            `http://localhost:3000/contact/${id}`
          );
          console.log(data);
          getContacts();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  useEffect(() => {
    getContacts();
  }, []);
  return (
    <>
      <Link to="/create">
        <div className="flex justify-end">
          <button className="text-white bg-gray-800 py-2 px-2 my-5 rounded shadow-sm">
            Create New Contact
          </button>
        </div>
      </Link>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((contact) => (
              <tr
                key={contact.id}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                >
                  {contact.name}
                </th>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {contact.phone}
                </td>

                <td className="px-6 py-4 flex gap-4">
                  <BsFillTrashFill
                    className="text-xl text-red-500 cursor-pointer"
                    onClick={() => apiDetelteContact(contact.id)}
                  />
                  <Link to={`/edit/${contact.id}`}>
                    <BsPencilSquare className="text-xl text-blue-300 cursor-pointer" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Contact;
