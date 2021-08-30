import React, {useState } from 'react' ;
import {Redirect} from'react-router-dom' ;

import { invalidEmail, invalidMobile, invalidPass, isBlank, invalidName } from '../valid.js' ;
import { addNotif } from '../notif.js' ;
import { formatDate } from '../format.js' ;
import LoginForm from '../forms/LoginForm.js' ;
import Text from '../text/Text.js' ;

import {formatSize} from '../format.js' ;
import './UserProfile.css' ;
import './Data.css' ;

// 1 : Single Data Item
const Data = ({item, value}) => {	
	return(
		<div className ="data-flex">
			<p className ="data-bold" >{item}</p>
			<p className ="data-right" >{value}</p>
		</div>
	) ;
}

const keyObject = {
	name :"Name",
	email :"E-Mail",
	mobile :"Mobile ",
} ;

const initPassword = { 
	oldpass: '',
	repass: '' ,
	newpass: ''
} ;

const UserProfile = ({token, loadUser, user, loadNotif}) => {
	const initData = {
		name: user.name ,
		mobile: user.mobile ,
		email: user.email
	} ;

	const [mode, setMode] = useState('normal') ;
	const [error, setError] = useState('') ;	
	const [pass, setPass] = useState(initPassword) ;	
	const [data, setData] = useState(initData) ;
	
	// 2 : Ye bhi logout kar raha hai
	const onLogoutClick = (str = null) => {
		const url = (str?'logoutAll':'logout') ;
		fetch(`https://onekaoneapi.herokuapp.com/${url}` ,{
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
			}) 
			.catch( err  => {
				addNotif('There was a problem with logout', 'error') ;	
				console.log(err) ; 
			}) ;
	}

	// 3 : User ki profile delete kar raha hai
	const onDeleteClick = () => {
		console.log('delete sahi se kaam kar raha hai') ;
		// fetch('https://onekaoneapi.herokuapp.com/users/me',{
		// 		method : 'delete' ,
		// 		headers : { 'Content-Type' : 'application/json', 
		// 					'Authorization' : 'Bearer ' + token} ,
		// })
		// .then(res => {
		// 	if(res.ok)
		// 		return res.json() ;
		// 	else
		// 		throw Error(res.statusText) ;
		// })
		// .then(data =>{	
		// 	addNotif('Successfully Deleted', 'success') ;
		// 	localStorage.clear() ;
		// 	loadUser({}) ;
		// }) 
		// .catch( err  => {
		// 	addNotif('Error Deleting Profile', 'error') ;	
		// 	console.log(err) ; 
		// }) ;
	}
	
	// 4 : Password change karne ki request bhejega agar koi error nahi hai and blank nahi hai password ka field
	const onChangeClick = () => {
		if(error !== '')
			setError('You must fix all errors before proceeding');
		else
		{
			if( isBlank(pass.oldpass, 'Old Password') )
				setError( isBlank(pass.oldpass, 'Old Password') ) ;
			else if( invalidPass(pass.newpass, pass.repass) )
				setError( invalidPass(pass.newpass, pass.repass)) ;
			else	{
				fetch('https://onekaoneapi.herokuapp.com/users/me/change',{
						method : 'post' ,
						headers : { 'Content-Type' : 'application/json', 
									'Authorization' : 'Bearer ' + token} ,
						body: JSON.stringify({oldpass: pass.oldpass, newpass: pass.newpass})
				})
				.then(res => {
					if(res.ok)	{	
						setError('') ;
						setPass(initPassword) ;
					} 
					else
						throw Error(res.statusText) ;
				})
				.then(data =>{	
					addNotif('Successfully changed the password', 'success') ;
					loadNotif() ;
					setMode('normal') ;
				})
				.catch( err  => {
					console.log(err) ;
					setError('Incorrect Old Password') ;
				}) ;
			}
		}
	}

	// 5 : Data (actual data) ko map kar raha hai Data component me
	const generateData = () => {
		return Object.keys(user).map( (one,i) => (keyObject[one]?<Data key={i} item={keyObject[one]} value={user[one]} />: null) ) ;
	}

	// 6 : User profile ko edit kar raha hai
	const sendEditRequest = () => {
		addNotif('Please Wait...') ;

		fetch('https://onekaoneapi.herokuapp.com/users/me',{
			method : 'PATCH' ,
			headers : { 'Content-Type' : 'application/json', 
						'Authorization' : 'Bearer ' + token} ,
			body :JSON.stringify({...data}) ,
		})
		.then(res => {
			if(res.ok)
				return res.json() ;
			else
				throw Error(res.statusText) ;
		})
		.then(resp => {	
			addNotif('Successfully Updated Profile', 'success') ;
			loadUser({user: resp, token }) ;
			loadNotif() ;
			setMode('normal') ;
		}) 
		.catch( err  => {
			console.log(err) ;
			addNotif('Error updating profile' , 'error') ;
		}) ;
	}

	// 7 : Edit profile ke submission ka process aage badha raha hai
	const onNextClick = () => {
		const {name, email, mobile} = data ;
		if(error !== '')
			setError('You must fix all errors before proceeding');
		else
		{
			if( invalidEmail(email) )
				setError( invalidEmail(email) ) ;
			else if(invalidName(name) )
				setError( invalidName(name) ) ;
			else if (invalidMobile(mobile) )
				setError( invalidMobile(mobile) ) ;
			else
			  	sendEditRequest() ;
		}
	}

	// 8 : Agar mode 'edit' hai to edit ka form dikhayega, 'change' pe change password ka form dikhayega nahi to user ki photo dikhayega
	const checkMode = () => {
		const {name, email, mobile} =  data ;
		switch(mode)
		{	
			case 'edit' : return(
								<LoginForm title="Edit Details " error={error} near="near"
									b1="Go Back" onb1Click={() => setMode('normal')} b2="Submit" onb2Click={onNextClick} css="up-form" >
									<Text label="Name" name="name" value={name} onChange={onDataChange}/>
									<Text label="E-Mail" name="email" value={email} onChange={onDataChange}/>
									<Text label="Mobile " name="mobile" value={mobile} onChange={onDataChange}/>
								</LoginForm>
							) ; 
			case 'change' : return(
								<LoginForm title=" Change Password " error={error} near="near"
									b1= "Back" onb1Click={() => setMode('normal')} b2="Change" onb2Click={onChangeClick} css="up-form">
									<Text label="Old Password" name="oldpass" type="pw" value={pass.oldpass} onChange={onInputChange}/>
									<Text label="New Password" name="newpass" type="pw" value={pass.newpass} onChange={onInputChange}/>
									<Text label="Retype Password" name="repass" type="pw" value={pass.repass} onChange={onInputChange}/>
								</LoginForm>
							) ;
			default : return <img className="up-image" src={User} alt="generic-user" /> ;
		}
	}

	const onInputChange = (event) => {
		setPass({	...pass, [event.target.name] : event.target.value}) ;
		setError('') ;
	}

	const onDataChange = (event) => {
		setData({ ...data, [event.target.name] : event.target.value}) ;
		setError('') ;
	}

	// 9 : Jo memory show karni hai usk round off kar raha hai 
	const calc = parseFloat(((user.quota.memory_used*100)/user.quota.memory).toFixed(2)) ;
	const roomcalc = parseFloat(((user.quota.rooms_used*100)/user.quota.rooms).toFixed(2)) ;

	if(user.name)
	{
		return (
			<div className="user-profile">
				<div className="up-left">
					<button className = "up-button" onClick={() => setMode('change')}> Change Password</button>
					<button className = "up-button" onClick={()=>onLogoutClick()}>Logout</button>
					<button className = "up-button" onClick={()=>onLogoutClick('al')}>Logout All</button>
					<button className = "up-button" onClick={() => setMode('edit')}>Edit profile</button>
					<button className = "up-button up-del" onClick={onDeleteClick} >Delete profile</button>
				</div>
				<div className="up-right">
					<div className="up-west">
						{checkMode()}
					</div>
					<div className="up-east">
						{generateData()}
						<Data item="Created at" value={formatDate(user.createdAt)} />
						<ProgressBar className="storage-progress" completed={calc}/>
						<p className="sidebar-sizes">
							{ formatSize(user.quota.memory_used) } used of { formatSize(user.quota.memory) }
						</p>
						<Data item="No. of Favourite Files" value={user.favourite.length} />
						<Data item="Files Shared with you" value={user.shared.read.length+user.shared.write.length} />
						<Data item="Files in your Bin" value={user.bin.length} />
						<p className="sidebar-sizes">
							{user.quota.rooms_used} rooms used of {user.quota.rooms} rooms
						</p>

					</div>
				</div>
			</div>
		) ;
	}
	else
		return <Redirect to = '/login' />
}

export default UserProfile ;