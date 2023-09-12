import React, { useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import "./Navigation.css";

function DropdownMenu() {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const user = useSelector(state => state.session.user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "movies-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button className='menu-bttn' onClick={openMenu}>
                <i className="fas fa-bars" />
                <span>Menu</span>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <div className="movies-menu-section">
                    <i className="fas fa-film" />
                    <p>Movies</p>
                </div>
                {user && (
                    <li>
                        <NavLink to="/movies/new" onClick={closeMenu} className="dropdown-link">
                            Add a Movie
                        </NavLink>
                    </li>
                )}
                <li>
                    <NavLink to="/movies" onClick={closeMenu} className="dropdown-link">
                        All Movies
                    </NavLink>
                </li>
                <div className="actors-menu-section">
                    <i className="fas fa-users" />
                    <p>Actors</p>
                </div>
                {user && (
                    <li>
                        <NavLink to="/actors/new" onClick={closeMenu} className="dropdown-link">
                            Create New Actor
                        </NavLink>
                    </li>
                )}
            </ul>
        </>
    );
}

export default DropdownMenu;
