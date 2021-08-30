import React, { useState, useEffect } from 'react';

import { addNotif } from '../notif.js' ;
import { invalidEmail, invalidPass, invalidName } from '../valid.js' ;
import LoginForm from '../forms/LoginForm.js' ;
import Text from '../text/Text.js' ;
import './register.css' ;

const initPerson = {
	name: '' ,		email: '' ,		password: '',	repass: '',	 		
} ;

const Register = ({token, loadUser, changeMode}) => {	
	const [data, setData] = useState({}) ;
	const [error, setError] = useState('') ;

	useEffect(() => {
		setData(initPerson);
	}, []) ;

	const sendRegisterRequest = () => {
		addNotif('Please Wait...') ;
		
		fetch('https://studym-api.herokuapp.com/users' ,{
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json'} ,
			body :JSON.stringify({...data, username:data.username.toLowerCase()}) ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(resp => {	
			addNotif('Successfully Registered', 'success') ;
			setData(initPerson);
			loadUser(resp) ;
		}) 
		.catch( err  => {
			console.log(err) ;
			addNotif('Error while registration' , 'error') ;
		}) ;
	}

	const onNextClick = () => {
		const {name, password, repass, email} = data ;
		if(error !== '')
			setError('You must fix all errors before proceeding');
		else
		{
			if( invalidEmail(email) )
				setError( invalidEmail(email) ) ;
			else if(invalidName(name) )
				setError( invalidName(name) ) ;
			else if (invalidPass(password, repass) )
				setError( invalidPass(password, repass) ) ;
			else
			  	sendRegisterRequest() ;
		}
	}

	const onInputChange = (event) => {
		setData({...data, [event.target.name] : event.target.value}) ;
		setError('') ;
	}

	// 4 :  register ka form create ho raha hai
	const personForm1 = () => {
		const {name, email } = data ;
		return (
			<div>	
				<LoginForm title="Enter Details " error={error}
					b1="Go Back" onb1Click={()=>changeMode('login')}
					b2="Register" onb2Click={onNextClick} >
					<Text label="Name" name="name" value={name} onChange={onInputChange}/>
					<Text label="E-Mail" name="email" value={email} onChange={onInputChange}/>
					<Text label="Password" name="password" value={data.password}
						 type="pw" onChange={onInputChange}/>
					<Text label="Retype Password" name="repass" value={data.repass} 
						type="pw" onChange={onInputChange}/>
				</LoginForm>
			</div>
		) ;
	}
	
	return <div className="su-blue-bg register"> {personForm1()} </div> ;
}

export default Register ;