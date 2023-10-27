const generateHash = (userId:string)=>{
	let hash = 0;
	for(let i=0; i < userId.length; i++){
		hash+=userId.charCodeAt(i);
	}
	return hash;
}

const getFileNumber=(userId:string)=>{
	const hash = generateHash(userId);
	const fileNumber = hash.toString().charCodeAt(0) % 5;
	return {fileNumber, hash};
}

export {getFileNumber}
