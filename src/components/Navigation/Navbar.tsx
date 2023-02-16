import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import './navbar.css';
import Button from '../Button/Button';
import { useNavigate, useLocation } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";
import Loader from '../Loader/Loader';

interface NavbarProps {
    links: { name: string; path: string }[];
}

const LOGOUT_MUTATION = gql`
  mutation {
    logout {
      status
      message
    }
  }
`;

const Navbar = ({ links }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const location = useLocation();
    const locPath = location.pathname;

    const [mobile, setMobile] = useState(false);

    const [logoutMutation, { data, loading, error }] = useMutation(
        LOGOUT_MUTATION,
        {
            context: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        }
    );

    useEffect(() => {
        if (data && data.logout) {
            console.log(data);
            localStorage.removeItem("token");
            navigate("/login", { replace: true });
        }
    }, [data]);

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        logoutMutation();

        if (data) {
            console.log(data);
        }
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            {loading ? <Loader /> : <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Logo
                </Link>
                <div className="menu-icon" onClick={toggleMenu}>
                    {isOpen ? <IoClose /> : <FaBars />}
                </div>
                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    {links.map(({ name, path }) => (
                        <li key={path} className={`nav-item ${locPath == path ? "active" : ""}`}>
                            <Link to={path} className="nav-links" onClick={toggleMenu}>
                                {name}
                            </Link>
                        </li>
                    ))}
                    <li className="nav-button">
                        <Button onclick={handleLogout} text="Logout" />
                    </li>
                </ul>
            </div>}
        </nav>
    );
};

export default Navbar;
