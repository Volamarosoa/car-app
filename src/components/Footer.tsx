import React from 'react';
import { IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/react';
import { chatbubblesOutline, peopleOutline, newspaperOutline } from 'ionicons/icons';
// import './Footer.css';

const Footer: React.FC = () => (
    <>
    <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
        <IonIcon aria-hidden="true" icon={chatbubblesOutline} />
        <IonLabel>Discussions</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
        <IonIcon aria-hidden="true" icon={peopleOutline} />
        <IonLabel>Groupe</IonLabel>
        </IonTabButton>
        <IonTabButton tab="listeAnnonce" href="/listeAnnonce">
            <IonIcon aria-hidden="true" icon={newspaperOutline} />
            <IonLabel>Liste Annonces</IonLabel>
        </IonTabButton>
        <IonTabButton tab='tab4' href='/test/voiture'>
            <IonIcon aria-hidden="true" icon={newspaperOutline} />
            <IonLabel> Test Voiture </IonLabel>
        </IonTabButton>
        <IonTabButton tab='tab5' href='/test/annonce'>
            <IonIcon aria-hidden="true" icon={newspaperOutline} />
            <IonLabel> Test Annonce </IonLabel>
        </IonTabButton>
    </IonTabBar>
    </>
);
export default Footer;