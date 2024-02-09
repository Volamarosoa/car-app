import React from 'react';
import { IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/react';
import { chatbubblesOutline, peopleOutline, carOutline, newspaperOutline, addOutline } from 'ionicons/icons'; // Importez l'icône d'ajout d'annonce

const Footer: React.FC = () => (
    <IonTabBar slot="bottom">
        <IonTabButton tab="listeAnnonce" href="/listeAnnonce">
            <IonIcon aria-hidden="true" icon={newspaperOutline} />
            <IonLabel>Liste Annonces</IonLabel>
        </IonTabButton>
        <IonTabButton tab='tab4' href='/test/voiture'>
            <IonIcon aria-hidden="true" icon={carOutline} />
            <IonLabel> Ajout Voiture </IonLabel>
        </IonTabButton>
        <IonTabButton tab='tab5' href='/test/annonce'>
            <IonIcon aria-hidden="true" icon={addOutline} /> {/* Utilisez l'icône d'ajout d'annonce */}
            <IonLabel> Ajout Annonce </IonLabel>
        </IonTabButton>
    </IonTabBar>
);

export default Footer;
