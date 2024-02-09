import React from 'react';
import 'bootstrap';
import { IonPage, IonContent } from '@ionic/react';
import Voiture from '../../components/Annonce/Voiture';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';

const CreateCar = () => {
	return (
		<IonPage>
			<Menu menu="Ajout Voiture" isActive={true} />
			<IonContent>
				<Voiture />
			</IonContent>
			<Footer />
		</IonPage>
	)
};

export default CreateCar;