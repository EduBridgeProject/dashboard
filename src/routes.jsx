import {
  HomeIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  ArrowRightOnRectangleIcon,
  ServerStackIcon,
  UserGroupIcon, // New icon for "Beneficiary"
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import Users from "./pages/dashboard/users";
import Message from "./pages/dashboard/message";
import Beneficiary from "./pages/dashboard/Beneficiary";
import { SignIn } from "@/pages/auth";

const icon = { className: "w-5 h-5 text-inherit" };

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "الصفحة الرئيسية",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "المستخدمون",
        path: "/users",
        element: <Users />,
      },
      {
        icon: <UserGroupIcon {...icon} />, // Updated icon for "المستفيدين"
        name: "المستفيدين",
        path: "/beneficiary",
        element: <Beneficiary />,
      },
      {
        icon: <ChatBubbleLeftIcon {...icon} />,
        name: "الرسائل",
        path: "/message",
        element: <Message />,
      },
    ],
  },
  {
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "تسجيل الخروج",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
