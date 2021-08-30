import React, {useState} from 'react' ;

import Login from '../login/Login.js' ;
import Register from '../register/Register.js' ;
import Loading from '../loading/Loading.js' ;
import Panel from '../panel/Panel.js' ;

import './home.css' ;

const data = ['DBMS', 'Data Structures', 'Maths', 'Java', 'Networks', 'Cyber Ethics' ]

const Home = (props) => {
	const [mode, setMode] = useState('login') ;

	// useEffect( () => {
	// 	if(props.user.name)
	// 	{
	// 		fetch('https://study-api.herokuapp.com/data',{
	// 			method : 'get' ,
	// 			headers : { 'Authorization' : 'Bearer ' + props.token } ,
	// 		})
	// 		.then(res => {
	// 			if(res.ok)
	// 				return res.json() ;
	// 			else
	// 				throw Error(res.statusText) ;
	// 		})
	// 		.then(data =>	setData(data) ) 
	// 		.catch( err  => console.log(err) ) ;
	// 	}
	// }, [props.token , props.user.name, reload]) ;

	const returnContent = () => {
		if(mode === 'login')
			return <Login {...props} changeMode={setMode} /> ;
		else if(mode === 'register')
			return <Register {...props} changeMode={setMode} /> ;
	}

	const checkDataLoaded = () => {
		if(data.length>0)
			return (
				<div className="card-list">
					{	data.map( (one, i) => <Panel data={one} key={i} /> )	}
				</div>
			) ;
		else 
			return <Loading />
	}

	if(!props.user.name)
		return(
			<div className="home">
				{returnContent()}
			</div>
		) ;
	else
		return(
			<div className="home">
				<div>
				{	checkDataLoaded()	}
				</div>
			</div>
		) ;
}

export default Home ;