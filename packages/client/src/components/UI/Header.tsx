import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../utils/router/routes";

interface HeaderProps {
  title: string;
  currentTab: string;
}

const Header: React.FC<HeaderProps> = ({ title, currentTab }) => {
  return (
    <div className="fixed top-0 w-full bg-blue-200 h-fit py-10 px-20 flex items-center justify-between">
      <h1 className="text-2xl">{title}</h1>

      <div className="flex gap-5">
        {routes.map((item) => (
          <Link key={item.path} to={item.path}>
            <div
              className={item.name === currentTab ? "text-blue-700" : "black"}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
