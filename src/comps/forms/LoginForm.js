import React from 'react';
import {Link} from 'react-router-dom' ;

import './loginform.css' ;

// form create kar raha hai, jo 2 function hai voh button(ya link) create kar rahe hai.
const LoginForm = ({b1, b1type, to, onb1Click, b2, onb2Click, b2type, near, css, error, children, heading, title}) => {

	const checkB1 = () => {
		if(b1)
		{
			if(b1type === 'link')
				return <Link className="btn2" to={to}>{b1}</Link>
			else
				return <button onClick={onb1Click}>{b1} </button> 	
		}
		else
			return <button className="inv"> &lt;&nbsp; Prev </button> ;
	}

	const checkB2 = () => {
		if(b2)
		{
			if(b2type === 'link')
				return <Link className="btn2" to={to}>{b2}</Link>
			else
				return <button onClick={onb2Click}>{b2} </button> 	
		}
		else
			return <button className="inv" disabled={true}> Next &gt;&nbsp; </button> ;
	}

	return (
		<div className = {"login-form "+(css?css:'')}>
			<div>
				<fieldset className="box">
					<legend className="box-title"> &nbsp;{title}&nbsp;</legend>
					<h3 className="heading">{heading}</h3>
					{children}
					<h5 className={error?"error":''}>{error}</h5>
					<div className={"buttons " + near}>
						{checkB1()}
						{checkB2()}
					</div>
				</fieldset>
			</div>
		</div>
	);
}

export default LoginForm ;
