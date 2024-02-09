import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './ListeAnnonce.css';
import  Menu from '../components/Menu';
import  Footer from '../components/Footer';
import FicheAnnonce from '../components/Annonce/FicheAnnonce';
import annonceService from '../service-api/annonceService';
import { useEffect, useState } from 'react';

const ListeAnnonce: React.FC = () => {
  
  const [liste, setListe] = useState([]);  
  const [loading, setLoading] = useState(true); // État pour gérer l'affichage de la charge
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await annonceService('GET', 'byUser', null);
        if (response.data) {
          console.log(response.data);
          setListe(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      } finally {
        setLoading(false); // Mettre fin à la charge une fois la réponse reçue ou en cas d'erreur
      }
    };
    fetchData();
  }, []);

  return (
    <IonPage>
      <Menu menu="Listes des Annonces" isActive={true} />
      <IonContent fullscreen>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <IonSpinner name="dots" />
          </div>
            ) : liste.length > 0 ? (
              liste.map((_annonce) => ( 
                <FicheAnnonce key={_annonce.id} annonce={_annonce} />
              ))
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                <p>Vous n'avez aucune annonce.</p>
              </div>
        )}
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default ListeAnnonce;
