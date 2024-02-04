import {React, useState, useEffect} from 'react';

const Annonce = () => {
	const[ idAnnonce, setIdAnnonce ] = useState('');
	const[ heurePublication, setHeurePublication ] = useState(Date.now().timestamp);
	const[ photos, setPhotos ] = useState([]);
	const[ description, setDescription ] = useState('');
	const[ lieu, setLieu ] = useState("");
	const[ prix, setPrix ] = useState(0);
	const[ voiture, setVoiture ] = useState(0);

	return (
		<>
			HEHEHE
		</>

	);

};

export default Annonce;