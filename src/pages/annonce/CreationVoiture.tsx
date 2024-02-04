import React from 'react';
import 'bootstrap';
import { IonPage, IonContent } from '@ionic/react';
import Voiture from '../../components/Annonce/Voiture';
import Footer from '../../components/Footer';

const CreateCar = () => {
	return (
		<IonPage>
			<IonContent>
				<Voiture />
			</IonContent>
			<Footer />
		</IonPage>
	)
};

export default CreateCar;