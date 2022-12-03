import { useAuth } from "@contexts/AuthContext";
import { Menu, Transition } from "@headlessui/react";

import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const { auth, logout } = useAuth();
  if (!auth.isAuthenticated) {
    return null;
  }
  return (
    <Menu as="div" className="inline-block text-left relative">
      <Menu.Button className="">
        <div className="px-4 h-12 border border-white/10 rounded-lg flex justify-center items-center space-x-2">
          <img
            src={`https://avatars.dicebear.com/api/identicon/${auth?.user?.address}.svg`}
            alt="avatar"
            className="rounded-full w-6 h-6"
          />
          <p className="text-white">
            {auth.user?.address?.substring(0, 6) + ".."}
          </p>
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute px-1 py-1 right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/"
                className={`${
                  active ? "bg-gray-500 text-white" : "text-gray-900"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                Profile
              </Link>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => logout()}
                className={`${
                  active ? "bg-gray-500 text-white" : "text-gray-900"
                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                Logout
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileMenu;
