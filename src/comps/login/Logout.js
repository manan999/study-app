import React, {useState, useEffect} from 'react' ;
import {Redirect} from'react-router-dom' ;

import Loading from '../loading/Loading.js' ;
import { addNotif } from '../notif.js' ;

const Logout = ({token, loadUser}) => {
	const [loggedOut, setLoggedOut] = useState(false) ;

	useEffect( ()=>{
		fetch('https://studym-api.herokuapp.com/logout' ,{
			method : 'post' ,
			headers : { 'Content-Type' : 'application/json', 
						'Authorization' : 'Bearer ' + token} ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(data =>{	
			addNotif('Successfully Logged Out', 'success') ;	
			localStorage.clear() ;
			loadUser({}) ;
			setLoggedOut(true) ;
		}) 
		.catch( err  => {
			addNotif('There was a problem with logout', 'error') ;	
			console.log(err) ; 
		}) ;
	//eslint-disable-next-line
	}, []) ;

	if(loggedOut)
		return <Redirect to='/'/>
	else
		return <Loading /> ;
}

export default Logout ;