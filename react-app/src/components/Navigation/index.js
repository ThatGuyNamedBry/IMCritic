import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="navigation-container">
			<ul className='navigation-ul'>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				<li>
					{sessionUser && (
						<NavLink to="/movies/new" >
							Add a Movie
						</NavLink>
					)}
				</li>
				<li>
					{sessionUser ? (
						<ProfileButton user={sessionUser} />
					) : (
						<OpenModalButton
						buttonText="Sign In"
						modalComponent={<LoginFormModal />}
					  />
					)}
				</li>
			</ul>
		</div>
	);
}

export default Navigation;
