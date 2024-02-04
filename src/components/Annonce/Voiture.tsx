import React,{ useEffect, useState} from 'react';
import 'bootstrap';
import { IonButton, IonInput, IonItem, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import { fetchData as CarFetch, addCar } from '../../service-api/carService';
const Voiture = () => {

	const[ marque, setMarque ] = useState(null);
	const[ marques, setMarques ] = useState([]);
	const[ modele, setModele ] = useState(null);
	const[ vitesse, setVitesse ] = useState('');
	const[ moteur, setMoteur ] = useState(null);
	const[ type, setType ] = useState('');
	const[ categorie, setCategorie ] = useState('');
	const[ couleurs, setCouleurs ] = useState([]);
	const[ carburant, setCarburants ] = useState('');
	const[ details, setDetails ] = useState([]);
	const[ kilometrage, setKilometrage ] = useState(0);

	const handleForm = async ( event : any ) => {
		event.preventDefault();
		let data : any = {
			
			marque: marque.id,
			modele: modele.id,
			vitesse: vitesse,
			moteur: moteur.id,
			categorie:categorie,
			carburant: carburant,
			kilometrage: kilometrage,
			type:type
			

		};

		addCar( "voitures" , data )
		.then( response => console.log(response) )
		.catch(error => alert(error));

	};

	const handleBrandChange = async ( event: any ) => {
		let id = event?.target.value;
		let m = marques.find( marque =>  marque.id === id );
		setMarque(m);
	};

	const handleKilometrage = async (event) => {
		await setKilometrage(event.target.value);
		console.log(kilometrage);
	};


	const handleModelChange = async ( event: any ) => {
		let id = event?.target.value;
		let m = marque.modeles.find( modele =>  modele.id === id );
		setModele(m);
	};

	const handleEngineChange = async ( event: any ) => {
		let id = event?.target.value;
		let m = modele.moteurs.find( moteur =>  moteur.id === id );
		console.log(m);
		setMoteur(m);
		setCarburants( m.carburant.id );
		setType( m.type.id );
	};

	const fetchData = () => {
		let url = "marques";
		let response = CarFetch(url);
		response.then( (response) => {
			setMarques( response.data );
			console.log(response.data);
		} );
	};

	useEffect( () => {
		fetchData();
	}, [] );

	const checkButton = () => {
		
		console.log("Errreurrr");
	};


	return(
		<div className='form'>
			<form action="" onSubmit={(event) => handleForm(event)} className="form">
				<IonRow>
					<IonSelect fill='outline' label="Marque" labelPlacement='fixed' onIonChange={(event) => handleBrandChange(event)} placeholder='Marque'>
						{
							marques.map( (marque , index) => {
								return (
									<IonSelectOption value={marque.id} key={index}> {marque.nom} </IonSelectOption>
								)
							} )
						}
					</IonSelect>
				</IonRow>
				<IonRow>
					<IonSelect label="Modele" fill='outline' labelPlacement='fixed' placeholder='Modele' onIonChange={(event) => handleModelChange(event)}>
						{
							marque && marque.modeles.map( (modele, index) => {
								return(
									<IonSelectOption value={modele.id} key={index} > { modele.nom } </IonSelectOption>
								)
							} )
						}
						{/* <IonSelectOption value="Mercedes"> Mercedes </IonSelectOption> */}
					</IonSelect>
				</IonRow>
				<IonRow>	
					<IonSelect label="Categorie" fill='outline' labelPlacement='fixed' placeholder='Categorie' onIonChange={(event) => setCategorie(event.target.value)}>
						{
							modele && modele.categories && modele.categories.map( (category , index) => {
								return(
									<IonSelectOption value={ category.id } key={index} >
										{ category.nom }
									</IonSelectOption>
								)
							} )
						}
					</IonSelect>
				</IonRow>

				<IonRow>
					<IonItem >
						<IonSelect label="Moteur"  labelPlacement='fixed' placeholder='Moteur' onIonChange={(event) => handleEngineChange(event)}>
							{
								modele && modele.moteurs && modele.moteurs.map( (moteur , index) => {
									return(
										<IonSelectOption value={moteur.id} key = {index}>
											{moteur.nom}
										</IonSelectOption>
									)
								} )
							}
						</IonSelect>
						<IonInput label={"Carburant"}  name="carburant" disabled value={ moteur && moteur.carburant && moteur.carburant.nom }  />
						<IonInput label="Type de moteur" name="type" disabled value={ moteur && moteur.type && moteur.type.nom } />
						<IonSelect label="Boite de vitesses" labelPlacement='fixed' placeholder='Vitesse' onIonChange={(event) =>setVitesse( event.target.value )}>
							{
								moteur && moteur.vitesses && moteur.vitesses.map( (vitesse , index) => {
									return(
										<IonSelectOption value={vitesse.id} key = {index}>
											{vitesse.nom}
										</IonSelectOption>
									)
								} )
							}
						</IonSelect>
					</IonItem>
				</IonRow>

				<IonRow>
					<IonInput label="Kilometrage" name="kilometrage" onIonChange={(event) => handleKilometrage(event)} fill='outline'/>
				</IonRow>
				{/* <IonRow>
					<IonSelect label="Couleurs" labelPlacement='fixed' placeholder='Couleur'>
						<IonSelectOption value="Mercedes"> Mercedes </IonSelectOption>
					</IonSelect>
				</IonRow> */}
				<IonButton type='submit' fill='outline' onIonChange={checkButton}> Boutton </IonButton>
			</form>
		</div>
	)

};

export default Voiture;