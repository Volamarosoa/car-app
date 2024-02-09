import React from 'react';
import Annonce from '../../components/Annonce/Annonce'
import { IonContent, IonPage } from '@ionic/react';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';

const ListeAnnonce = () => {

	return(
		<IonPage>
			<Menu menu="Ajout Annonce" isActive={true} />
			<IonContent>
				<Annonce />
			</IonContent>
			<Footer />
		</IonPage>
	)

};

export default ListeAnnonce;