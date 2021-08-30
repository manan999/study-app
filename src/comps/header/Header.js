import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom' ;
import CheeseburgerMenu from 'cheeseburger-menu' ;
import HamburgerMenu from 'react-hamburger-menu' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faPowerOff } from '@fortawesome/free-solid-svg-icons' ;

import Menu from './Menu.js' ;

import './header.css' ;

const UserShow = ({name}) => {
	return (
		<div className="usershow">
			{name? <Link to='/logout'> <FontAwesomeIcon icon={faPowerOff}/></Link>:null}
 		</div>
	) ;
}

const Header = ({user, token, loadUser}) => {
	const [menuOpen, setMenuOpen] = useState(false) ; 

	const openMenu = () => setMenuOpen(true) 
	const closeMenu = () => setMenuOpen(false) 

	// 2: check kar rahe hai mobile hai ya nahi
	// eslint-disable-next-line
	const checkMobile = () => {
		if(window.screen.availWidth > 923)
		{	return (
				<div className="right-header">
					<p className="header-item contact-num"> 
						<a href="tel:+919625162446">+91-96251-62446</a>
						<br/> <a href="tel:+919625104067">+91-96251-04067</a> 
					</p> 
				</div>
			) ;
		}
		else
		{
			return (
				<div className="right-header">
					<CheeseburgerMenu isOpen={menuOpen} closeCallback={closeMenu}>
							<Menu closeCallback={closeMenu} user={user}/>
					</CheeseburgerMenu>
					<HamburgerMenu isOpen={menuOpen} menuClicked={openMenu} width={32} height={24} strokeWidth={8} color='white' borderRadius={1} animationDuration={0.5} />
				</div>
			) ;
		}
	}

	return (
		<div className="header"> 
			<Link to="/"><div className="logo">
				<p> Study </p>
			</div></Link>

			<div className="right-header">
				<UserShow name={user.name}/>
			</div>
		</div>
	);
}

export default withRouter(Header) ;
