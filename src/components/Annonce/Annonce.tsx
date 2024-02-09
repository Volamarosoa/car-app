import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, useIonModal } from '@ionic/react';
import React, { useState, useEffect} from 'react';
import { fetchData as fetcher } from '../../service-api/carService';
import {doRequest, addAnnonce as createAnnonce} from '../../service-api/general';
import 'ionicons/icons'
import Example from '../modals/Modal';

const Annonce = () => {

	
	
	
	const[ idAnnonce, setIdAnnonce ] = useState('');
	const[ heurePublication, setHeurePublication ] = useState(Date.now().timestamp);
	// const[ photos, setPhotos ] = useState([]);
	const[ description, setDescription ] = useState('');
	const[ lieu, setLieu ] = useState("");
	const[ prix, setPrix ] = useState(0);
	const[ voiture, setVoiture ] = useState('');
	const[files, setFiles] = useState([]);
	const[open, setOpen] = useState(false);
	const[caracteristiques, setCaracteristiques] = useState([]);

	const[cars, setCars] = useState([]);
	const[lieux, setLieux] = useState([]);


	const[details, setDetails] = useState([]);

	
	var [present, dismiss] = useIonModal(Example, {
		onDismiss: (data: string, role: string) => dismiss(data, role),
		caracteristiques: caracteristiques
	});;

	const addPhotos = async ( event ) => {
		let images = Array.from(event.target.files);
		images = await formatImage(images);
		if( files.length > 0 ){
			console.log("Nandalo teto");
			setFiles([...files, ...images]);
		}else
			setFiles( images );
	};

	const formatImage = async (images: any) => {
		for( let image = 0; image < images.length ; image++ ){
			let response = await toBase64(images[image]);
			images[image]['src'] = response;
		}
		return images;
	};

	const fetchData = () => {
		let car_endpoint = "voitures/user";
		let lieux_endpoint = "lieus";
		let caracteristiques_endpoint = "caracteristiques";
		
		fetcher(car_endpoint).then( response => setCars(response.data) );
		fetcher(lieux_endpoint).then( response => setLieux(response.data) );
		if( caracteristiques.length === 0 ){
			fetcher(caracteristiques_endpoint).then( response => setCaracteristiques(response.data) );
		}
		
	};

	const removeImagePrefix = ( image : string ) => {
		let prefix = ",";
		return image.substring( image.lastIndexOf(prefix) +1 );
	};

	const getPhotos = () => {
		let arrays = [];
		for( let i = 0 ; i < files.length ; i++ ){
			let pic = files[i].src;
			console.log( removeImagePrefix(pic) );
			let object = {
				photo: removeImagePrefix(pic)
			};
			// arrays.push(object);
			arrays.push(object.photo);
			// arrays.push("sarobidy");	
		}
		return arrays;
	};

	
	const addAnnonce = (event) => {
		event.preventDefault();
		let pics = getPhotos();
		let heure = heurePublication;
		let data = {
			photos: pics,
			annonce:{
				date: new Date().toJSON(),
				description: description,
				prix: prix,
				lieu:lieu,
				voiture:voiture
			},
			details: details
		};

		// Okey manantso api rest
		let endpoint = "annonces";
		let method = "POST";

		// console.log( JSON.stringify(data) );
		let annonces = "annonces/list";
		// fetcher(annonces).then( response => createAnnonce(endpoint, method, data).then( response => console.log(response) ) );
		createAnnonce( endpoint, method, data )
		.then( response => console.log(response) )
		.catch( error => alert(error) );

	};

	const openDetails = () => {
		present({
			onWillDismiss: (ev ) => {
				console.log(ev)
			},
			onDidDismiss: (ev) => {
				let data = ev.detail.data;
				let oldData = [...details];
				let newData = [...details, ...data];
				setDetails(newData);
				console.log(newData);
			}
			,
			caracteristiques : {...caracteristiques}
		  });
		// setOpen(true);	
	};

	

	useEffect( () => {
		fetchData();
		
	}, [] );

	const toBase64 = (file) => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
	});


	return (
		
			<form onSubmit={(event) => addAnnonce(event)} className="form">
				{/* <IonRow> */}
					<IonRow style={{
						marginTop: '20px',
						marginBottom: '20px',
						width: '200px'

					}} >
						<IonItem>
							<IonTitle> Photo(s) : </IonTitle>
							<IonGrid key={1}>
								<IonRow key={"test"}>
								{
										(files.length > 0) && files.map( ( file, index ) => {
											return(
												<IonCol size='6'>
													{/* <IonCardContent> */}
														<img  src={file.src}/>
													{/* </IonCardContent> */}
												</IonCol>
											)
										} )
									}
									<IonCol>
									
										{/* <IonCard> */}
											{/* <IonCardContent> */}
												<IonButton
												onClick={() => document.getElementById('fileInput').click()}
												> 
													Ajouter
												</IonButton>
												<input
													type="file"
													id="fileInput"
													style={{ display: 'none' }}
													multiple
													onChange={(e) => addPhotos(e)}
													accept='.jpg,.png'
													/>
											{/* </IonCardContent> */}
										{/* </IonCard> */}
									</IonCol>	
									
								</IonRow>
								

							</IonGrid>
						</IonItem>
					</IonRow>

					<IonRow style={{
						marginTop: '20px',
						marginBottom: '20px',

					}}>
						<IonSelect label='Voiture' fill='outline' onIonChange={ (event) => setVoiture( event.target.value ) } labelPlacement='floating'>
							{
								(cars.length > 0) && cars.map( (car, index) => {
									return(
										<IonSelectOption key={index} value={car.id}> { ( car.modele && car.modele.nom) + " " + (car.categorie && car.categorie.nom) } </IonSelectOption>
									)
								} )
							}
							
						</IonSelect>
					</IonRow>

					<IonRow>
						<IonInput fill='outline' label='Description' onIonChange={ (event) => setDescription(event.target.value) } labelPlacement='floating' />
					</IonRow>

					<IonRow style={{
						marginTop: '20px',
						marginBottom: '20px',
					}}>
						<IonSelect label='Lieu' fill='outline' onIonChange={(event) => setLieu(event.target.value)} labelPlacement='floating'  >
							{
								lieux.length > 0 && lieux.map( (lieu, index) => {
									return(
										<IonSelectOption value={lieu.id}> {lieu.nom} </IonSelectOption>
									)
								} )
							}
						</IonSelect>
					</IonRow>
							
							
					<IonRow>
						<IonButton onClick={openDetails} > Ajouter Détails </IonButton>
						<IonButton type='submit'> Ajouter annonce </IonButton>
					</IonRow>
				{/* </IonRow> */}
			</form>
	

	);

};

export default Annonce;