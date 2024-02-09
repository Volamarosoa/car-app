import React, { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonModal, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { IonIcon, IonAlert, IonText } from '@ionic/react';
import { chevronBackOutline, chevronForwardOutline, closeCircleOutline, settingsOutline } from 'ionicons/icons';
import './FicheAnnonce.css'; 
import annonceService from '../../service-api/annonceService';
import { async } from '@firebase/util';


interface FicheProps {
    annonce: object;
}
const FicheAnnonce: React.FC<FicheProps> = ({ annonce }) => {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false); // Affichage du modal

  const [status, setAlertStatus] = useState({ show: false, message: '', selectedValue: annonce.valeur, idAnnonce: annonce.id});

  const handleSettingsClick = (idAnnonce : String, status : number) => {
    setAlertStatus({ show: true, message: 'Modifier le statut de l\'annonce', selectedValue: status, idAnnonce: ""+idAnnonce});
  };

  const handleRadioChange = (value: number) => {
    setAlertStatus({ ...status, selectedValue: value });
  };  

  const handleAlertConfirm = async () => {
    const dateHeureEnvoye = new Date(); 
    const annee = dateHeureEnvoye.getFullYear();
    const mois = ('0' + (dateHeureEnvoye.getMonth() + 1)).slice(-2); 
    const jour = ('0' + dateHeureEnvoye.getDate()).slice(-2);
    const date = `${annee}-${mois}-${jour}`;
    var requestData = {date: date};
    console.log("Zay sa " + status.idAnnonce + " et h: " + date);
    console.log(status.idAnnonce + ' : La valeur sélectionnée est :' + status.selectedValue);
    try {
      const response = await annonceService('PUT', 'vendu/'+status.idAnnonce, requestData);
      console.log(response.data);
    } catch(error) {
      console.log(error);
    }
  };

  const handleAlertCancel = () => {
    // Annuler et fermer l'alerte
    setAlertStatus({ ...status, show: false });
  };

//   const images = [
//     "https://ionicframework.com/docs/img/demos/card-media.png",
//     "https://th.bing.com/th/id/OIP.QpttgWRGTztGIfz8LR5EOgAAAA?rs=1&pid=ImgDetMain",
//     "https://th.bing.com/th/id/OIP.mX0mgSKHh2BOciUtx4iAHwHaE1?pid=ImgDet&w=179&h=117&c=7&dpr=1.3"
//   ];

  var photosExist = true;
  var images = annonce.photos;
  if(images.length == 0) {
    photosExist = false;
    images = ["https://ionicframework.com/docs/img/demos/card-media.png"]
  }

  var details = [];
  if(annonce.details.length > 0) {
    details = annonce.details;
  }

  const nextImage = () => {
    setIndex(prevIndex => (prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const prevImage = () => {
    setIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  function formatDate(dateString : string) {
    const date = new Date(dateString );
    
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    
    return `${year}/${month}/${day} ${hours}h${minutes}`;
  }

  function getStatus() {
    if(status.selectedValue == 10) {
        return "Non Valide";
    } else if(status.selectedValue == 20) {
        return "Non Vendu";
    } else {
        return "Vendu";
    }
  }

  return (
    <div className={showModal ? 'blur-background' : ''}> {/* Ajoutez la classe blur-background si le modal est ouvert */}
    <IonCard className="image-scroll-card">
      <div className="image-container">
        <img

            src={ (photosExist) ? "data:image/png;base64,"+images[index].bytes : images[index]}
            alt={`Image ${index + 1}`}
        />
      </div>
      <IonIcon icon={chevronBackOutline} onClick={prevImage} className={`prev-arrow ${index === 0 ? 'hidden' : ''}`} />
      <IonIcon icon={chevronForwardOutline} onClick={nextImage} className={`next-arrow ${index === images.length - 1 ? 'hidden' : ''}`} />
      <IonCardHeader>
        <IonCardTitle>{getStatus()}</IonCardTitle>
        <IonCardSubtitle>
            <span>
                { (status.selectedValue == 20) ? <IonIcon className="parametre" icon={settingsOutline} size="large" onClick={() => handleSettingsClick(annonce.id, status.selectedValue)} /> : null} 
                { formatDate(annonce.date) }
            </span>
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText>Description: {annonce.description}</IonText>
        <p><strong>Modele :</strong>  { annonce.voiture && annonce.voiture.modele && annonce.voiture.modele.nom}</p>
        <p><strong>Prix :</strong> {annonce.prix} Ar</p>
      </IonCardContent>
      <IonButton className="consulter" expand="full" color="warning" onClick={() => setShowModal(true)}>Consulter</IonButton>

      <IonAlert
        isOpen={status.show}
        onDidDismiss={() => setAlertStatus({ ...status, show: false })}
        header={status.message}
        inputs={[
            {
                name: 'status',
                type: 'radio',
                label: 'Non Vendu',
                value: '20',
                checked: status.selectedValue === 20,
                handler: () => handleRadioChange(20),
                },
                {
                name: 'status',
                type: 'radio',
                label: 'Vendu',
                value: '40',
                checked: status.selectedValue === 40,
                handler: () => handleRadioChange(40),
            },
        ]}
        buttons={[
            { text: 'Annuler', role: 'cancel', handler: handleAlertCancel },
            { text: 'Modifier', handler: handleAlertConfirm },
        ]}
      />


      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} className="details">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Information</IonTitle>
            <IonIcon icon={closeCircleOutline} slot="end" onClick={() => setShowModal(false)} />
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <div className="table-container">
                <table>
                <thead>
                    <tr>
                        <th>Information</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Lieu</th>
                        <td>{ annonce.lieu && annonce.lieu.nom} </td>
                    </tr>
                    <tr>
                        <th>Categorie</th>
                        <td>{ annonce.voiture && annonce.voiture.categorie && annonce.voiture.categorie.nom}</td>
                    </tr>
                    <tr>
                        <th>Moteur</th>
                        <td>{ annonce.voiture && annonce.voiture.moteur && annonce.voiture.moteur.nom}</td>
                    </tr>
                    <tr>
                        <th>Type Moteur</th>
                        <td>{ annonce.voiture && annonce.voiture.moteur && annonce.voiture.moteur.type && annonce.voiture.moteur.type.nom}</td>
                    </tr>
                    <tr>
                        <th>Carburant</th>
                        <td>{ annonce.voiture && annonce.voiture.moteur && annonce.voiture.moteur.carburant && annonce.voiture.moteur.carburant.nom}</td>
                    </tr>
                    {(details.length > 0) && details.map((detail) => { 
                    <tr>
                        <th>{detail.caracteristique.nom}</th>
                        <td>{detail.valeur}</td>
                    </tr>
                    })}
                </tbody>
                </table>
            </div>
        </IonContent>

      </IonModal>
    </IonCard>
    </div>
  );
}

export default FicheAnnonce;
