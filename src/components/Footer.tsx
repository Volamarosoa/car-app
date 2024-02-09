import React from 'react';
import { IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/react';
import { logOutOutline, carOutline, newspaperOutline, addOutline } from 'ionicons/icons'; 
import { useHistory } from 'react-router-dom';

const Footer: React.FC = () => {
    const history = useHistory();

    const handleLogout = () => {
        console.log('Déconnexion...');
        sessionStorage.removeItem('token');
        history.push('/login');
        window.location.reload();
    };

    return (
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
                <IonIcon aria-hidden="true" icon={addOutline} /> 
                <IonLabel> Ajout Annonce </IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab6" onClick={handleLogout}>
                <IonIcon aria-hidden="true" icon={logOutOutline} />
                <IonLabel>Déconnexion</IonLabel>
            </IonTabButton>
        </IonTabBar>
    );
};

export default Footer;
