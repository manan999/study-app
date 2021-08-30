import React from 'react' ;
import { Link } from 'react-router-dom' ;


import './panel.css' ;

const Panel = ({data}) => {
	return(
		<div className="panel">
			<div className="inner-panel">
				<Link to={`/dashboard/${data}`} className="p-data">{data}</Link>
			</div>			
		</div>
	) ;
}

export default Panel ;