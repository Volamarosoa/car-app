import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import  Menu from '../components/Menu';
import  Footer from '../components/Footer';
import FicheAnnonce from '../components/Annonce/FicheAnnonce';
import annonceService from '../service-api/annonceService';
import { useEffect, useState } from 'react';

const Tab3: React.FC = () => {
  
  const[liste, setListe] = useState([]);  
  useEffect( () =>{
    var response = annonceService('GET', 'byUser', null);
    // console.log("121212121");
    // console.log(response);
    response.then( responses => {
      if(responses.data){
        // console.log(response;
        setListe(responses.data);
      }
    } );
  }, [] );

  return (
    <IonPage>
      <Menu menu="Listes des Annonces" isActive={true} />
      <IonContent fullscreen>
        {
          (liste.length > 0 ) && liste.map((_annonce) => { 
            console.log(_annonce);
            return(
              <FicheAnnonce annonce={_annonce} />
            )  
          })
        }
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default Tab3;
