import React from 'react';

import './text.css' ;

const Text = ({label, value}) => {
	return (
		<div className="text-div non-edit">
			<label className="lbel">{label}&nbsp; : </label>
            <input className="inpu" type="text" name={label} value={value} readOnly/>
		</div>
	);
}

export default Text ;
