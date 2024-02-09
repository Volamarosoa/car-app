import React from 'react';
import Annonce from '../../components/Annonce/Annonce'
import { IonContent, IonPage } from '@ionic/react';
const ListeAnnonce = () => {

	return(
		<IonPage>
			<IonContent>
				<Annonce />
			</IonContent>
		</IonPage>
	)

};

export default ListeAnnonce;