const generateHash = (name: string) => {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash += name.charCodeAt(i);
	}
	return hash;
};

const getFileNumber = (name: string) => {
	const hash = generateHash(name);
	const fileNumber = (hash.toString().charCodeAt(0)) % 5;
	return { fileNumber, hash };
};

export { getFileNumber };
