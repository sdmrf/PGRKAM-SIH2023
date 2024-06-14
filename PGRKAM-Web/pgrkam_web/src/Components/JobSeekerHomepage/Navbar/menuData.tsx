import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Find work",
    newTab: false,
    path: "/#features",
    submenu: [
      {
        id: 21,
        title: "Find Jobs",
        newTab: false,
        path: "/blog",
      },
      {
        id: 24,
        title: "Sign In",
        newTab: false,
        path: "/auth/signin",
      },
      {
        id: 25,
        title: "Sign Up",
        newTab: false,
        path: "/auth/signup",
      },
      {
        id: 25,
        title: "Explore Companies",
        newTab: false,
        path: "/docs",
      },
    ],
  },
  {
    id: 3,
    title: "My Jobs",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Hire Talent",
        newTab: false,
        path: "/blog",
      },
      {
        id: 34,
        title: "Sign In",
        newTab: false,
        path: "/auth/signin",
      },
      {
        id: 35,
        title: "Sign Up",
        newTab: false,
        path: "/auth/signup",
      },
      {
        id: 35,
        title: "Pgrkam Pro",
        newTab: false,
        path: "/#Pro",
      },
    ],
  },

  {
    id: 4,
    title: "Messages",
    newTab: false,
    path: "/support",
  },
];

export default menuData;
