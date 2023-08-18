import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal";
import DropdownMenu from './DropdownMenu';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="navigation-container">
			<ul className='navigation-ul'>
				<div className='left-nav'>
					<li>
						<NavLink exact to="/">IMCritic</NavLink>
					</li>
					<li>
						<DropdownMenu />
					</li>
				</div>
				<li>
					{sessionUser ? (
						<ProfileButton user={sessionUser} />
					) : (
						<OpenModalButton
							className="signin-bttn"
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
