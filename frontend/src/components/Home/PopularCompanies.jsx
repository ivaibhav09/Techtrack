import React from "react";
import { FaMicrosoft, FaApple, FaAmazon } from "react-icons/fa";
import { SiNetflix, SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Noida, India",
      openPositions: 2,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Netflix",
      location: "Banglore, India",
      openPositions: 5,
      icon: <SiNetflix />,
    },
    {
      id: 3,
      title: "Amazon",
      location: "Gurugram, India",
      openPositions: 20,
      icon: <FaAmazon />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;