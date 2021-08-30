import React from 'react' ;
import {Link} from'react-router-dom' ;

import './menu.css' ;

const Menu = ({closeCallback}) => {	
	return(
		<div className="menu">
			<div className="burger">
				<div className="innerburger" onClick={closeCallback}>
					<Link className="menu-item" to='/'> Home </Link>
					<Link className="menu-item" to='/category'> Categories </Link>
					<Link className="menu-item" to='/build'> Build PC </Link>
					{/*<Link className="menu-item" to='/track'> Track Status </Link>*/}
					<Link className="menu-item" to='/contact'> Contact Us </Link>
					<p className="menu-item contact-num"> 
						<a href="tel:+919625162446">+91-96251-62446</a>
						<br/> <a href="tel:+919625104067">+91-96251-04067</a> 
					</p>
				</div>
			</div>
		</div>
	) ;
}

export default Menu ;