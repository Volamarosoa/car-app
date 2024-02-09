import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonNavLink, IonButton } from '@ionic/react';
import Tab2 from './Tab2';
import './Tab1.css';
import  Menu from '../components/Menu';
import  Footer from '../components/Footer';
import apiRequest from '../service-api/usersService';
import annonceRequest from '../service-api/annonceService';

const checkToken = async () => {
  var token = sessionStorage.getItem('token');
  const dateHeureEnvoye = new Date(); 
  console.log(token + " : " + dateHeureEnvoye);
  // var requestData = {idEnvoyeur: token, idReceveur: "aRU7yww5lgZ6eDev3iJ95SKgmAA3", message: "Coucou!!!"};
  var response = await annonceRequest('GET', 'byUser', null);
  // var response = await apiRequest('POST', 'listeDiscussions', null);
  console.log(response);
}

const Tab1: React.FC = () => {
  return (
    <IonPage className="page">
      <Menu menu="Discussion" isActive={true} />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <IonNavLink routerDirection="forward" component={() => <Tab2 />}> */}
          <IonButton onClick={checkToken}>Go to Page Two</IonButton>
        {/* </IonNavLink> */}
        <IonItem>
            <code>Ravaka❤️</code>
        </IonItem>
        <IonItem >
            <code>Malalako🥰</code>
        </IonItem>
        <IonItem>
            <code>Ravady😍</code>
        </IonItem>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Tab1;
