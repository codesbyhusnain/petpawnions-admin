import React, { createContext } from "react";

export const AdminUserContext = createContext();

export const AdminUserProvider = (props) => {
  const adminUsers = [
    {
      id: 17,
      name: "Green",
      position: "Admin user",
      office: "San Francisco",
    },

    {
      id: 18,
      name: "Winters",
      position: "Accountant",
      office: "Tokyo",
    },

    {
      id: 19,
      name: "Cortez",
      position: "Team Leader",
      office: "San Francisco",
    },

    {
      id: 20,
      name: "Joyce",
      position: "Developer",
      office: "Edinburgh",
    },

    {
      id: 21,
      name: "Gloria Little",
      position: "Systems Administrator",
      office: "New York",
    },

    {
      id: 22,
      name: "Haley Kennedy",
      position: "Senior Marketing Desi,ner",
      office: "London",
    },

    {
      id: 23,
      name: "Hermione Butler",
      position: "Regional Director",
      office: "London",
    },

    {
      id: 24,
      name: "Herrod Chandler",
      position: "Sales Assistant",
      office: "San Francisco",
    },

    {
      id: 25,
      name: "Hope Fuentes",
      position: "Secretary",
      office: "San Francisco",
    },

    {
      id: 26,
      name: "Howard Hatfield",
      position: "Office Manager",
      office: "San Francisco",
    },

    {
      id: 27,
      name: "Jackson Bradshaw",
      position: "Director",
      office: "New York",
    },

    {
      id: 28,
      name: "Jena Gaines",
      position: "Office Manager",
      office: "London",
    },
  ];

  return (
    <AdminUserContext.Provider value={adminUsers}>
      {props.children}
    </AdminUserContext.Provider>
  );
};
