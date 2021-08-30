import React, {useState} from 'react';

import { isBlank } from '../valid.js' ;
import { addNotif } from '../notif.js' ;
import LoginForm from '../forms/LoginForm.js' ;
import Text from '../text/Text.js' ;
import './login.css' ;

const Login = ({loadUser, changeMode}) => {
	//eslint-disable-next-line
	const [mode, setMode] = useState('normal') ;
	const [email, setEmail] = useState('') ;
	const [error, setError] = useState('') ;
	const [password, setPassword] = useState('') ;

	const sendLoginRequest = () => {
		addNotif('Please Wait...') ;
		
		fetch('https://studym-api.herokuapp.com/login',{
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json'} ,
			body :JSON.stringify({password, email}) ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data =>{	
			setEmail('') ;
			setPassword('');
			addNotif('Successfully Logged In', 'success') ;
			loadUser(data) ;
		})  
		.catch( err  => {
			console.log(err) ;
			addNotif('Error Logging in', 'error') ;	
			setError('Incorrect Username OR Password');
		}) ;
	}

	// const onForgotClick = () => {
	// 	addNotif('Please Wait...') ;

	// 	fetch('https://study-api.herokuapp.com/forgot',{
	// 		method : 'post' ,
	// 		headers : { 'Content-Type' : 'application/json'} ,
	// 		body : JSON.stringify({email}) ,
	// 	})
	// 	.then(res => {
	// 		if(res.ok)
	// 			return res.json() ;
	// 		else
	// 			throw Error(res.statusText) ;
	// 	})
	// 	.then(data =>{	
	// 		addNotif('Request sent for password reset', 'success') ;
	// 	})  
	// 	.catch( err  => {
	// 		console.log(err) ;
	// 		addNotif('Username invalid', 'error') ;	
	// 		setError('Username doesn\'t exist in database');
	// 	}) ;
	// }

	const onLoginClick = () => {
		if(error !== '')
			setError('You must fix all errors before proceeding');
		else
		{
			if( isBlank(email, 'E-Mail') )
				setError(isBlank(email, 'E-Mail') )
			else if ( isBlank(password, 'Password') )
				setError(isBlank(password, 'Password') )
			else
			  	sendLoginRequest() ;
		}
	}

	const createLogin = () => {
		return (
			<div>	
				<LoginForm title=" Login " error={error}
					b1="Register" onb1Click={()=>changeMode('register')} near="near"
					b2="Login" onb2Click={onLoginClick} >
					<Text label="E-Mail" name="email" value={email} onChange={event=>{
						setEmail(event.target.value) ;
						setError('') ;
					}}/>
					<Text label="Password" name="password" value={password} type="pw" onChange={event=>{
						setPassword(event.target.value) ;
						setError('') ;
					}}/>
					{/*<p className="fp" onClick={()=> setMode('fp') }> Forgot Password ? </p>*/}
				</LoginForm>
			</div>
			) ;
	}

	const resetPassword = () => {
	// 	return (
	// 		<div>	
	// 			<LoginForm heading=" Reset Password " error={error} b1="Go Back" onb1Click={()=> setMode('normal')} near="near" b2="Send Request" onb2Click={onForgotClick} >
	// 				<Text label="EMail" name="email" value={email} onChange={event=>{
	// 					setEmail(event.target.value) ;
	// 					setError('') ;
	// 				}}/>
	// 			</LoginForm>
	// 			<p className="nfp"> <strong>*Note: </strong>If you enter an E-Mail that exists in our database then you will recieve a mail containing your new password. You can re-change your password once you log back in. </p>
	// 		</div>
	// 		) ;
	}

	const checkMode = () => {
		switch(mode)
		{	case 'normal': return createLogin() ;
			case 'fp' : return resetPassword() ;
			default : return 'You probably encountered a problem' ;
		}
	}

	return <div className="su-blue-bg"> {checkMode()} </div> ;

}

export default Login ;
