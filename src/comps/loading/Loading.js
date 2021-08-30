import React from 'react' ;

import './loading.css';

const Loading = () => {
	return (
		<div className="loading">
			<div className="lds-spinner">
				<div></div>	<div></div>
				<div></div>	<div></div>
				<div></div>	<div></div>
				<div></div>	<div></div>
				<div></div>	<div></div>
				<div></div>	<div></div>
			</div>
			<h4> Loading ... </h4>
		</div>
	) ;
} 

export default Loading ;