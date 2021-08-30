const formatSize = (size) => {
	if(size < 1000)
		return size + ' Bytes' ;
	else if (size >= 1000 && size < 1000000 )
		return (size/1000).toFixed(3) + ' KB' ;
	else if (size >= 1000000 && size < 1000000000 )
		return (size/1000000).toFixed(3) + ' MB' ;
	else if (size >= 1000000000 && size < 10000000000 )
		return (size/1000000000).toFixed(3) + ' GB' ;
	else 
		throw new Error('Value too big') ; 
}

const formatDate = (dt) => new Date(dt).toLocaleString("en-US", {timeZone: "Asia/Kolkata"}); 

export {formatSize, formatDate} ;