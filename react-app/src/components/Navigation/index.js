import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="navigation-container">
			<ul className='navigation-ul'>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				{sessionUser && (
				<NavLink to="/movies/new" className="nav-link">
					Add a Movie
				</NavLink>
			)}
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
		</div>
	);
}

export default Navigation;
