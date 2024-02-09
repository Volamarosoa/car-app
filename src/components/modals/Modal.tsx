import React, { useState, useRef, useEffect } from 'react';
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonInput,
  useIonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonCol,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';


const Example = ( {
  onDismiss,
  caracteristiques,
  detailsFunction
}: {
  onDismiss: (data?: string | null | undefined | number, role?: string) => void;
  caracteristiques: any[];
  detailsFunction: ( caractere: string, valeur?: string | null | undefined | number ) => void;
} ) => {

  let[rows, setRows] = useState([]);
  let[canBeDisplayed, setCanBeDisplayed] = useState(false);

  let[data, setData] = useState([]);


  useEffect( () => {
    console.log(caracteristiques);
    setData(caracteristiques);
    console.log(data);
  },[data] );

  const createIonSelectOption = ( row : any ) => {
    return (
      <IonSelectOption key={row.id_caracteristique} value={row.id_caracteristique}>
          {row.nom}
        </IonSelectOption>
    );
  }

  const addIonRowInput = async () => {
    console.log(caracteristiques);
    // console.log(data.length);
    let row = 
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonSelect label='Caracteristiques' labelPlacement='floating'>
              {
                caracteristiques.map( ( row ) => createIonSelectOption(row) )
              }
            </IonSelect>
          </IonCol>
          <IonCol >
            <IonInput fill='outline' label='Description' labelPlacement='floating' />
          </IonCol>

        </IonRow>
      </IonGrid>
  ;
    console.log(row);
    setRows([...rows, row]);
    setCanBeDisplayed(true);
  };

  useState( () => {

  }, [rows] )
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Controller Modal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {
          canBeDisplayed && rows.length > 0 && rows.map( (row, index) => {
            return(
              <IonRow key={index}>
                  {row}
              </IonRow>
            )
          } )
        }
        <IonButton expand="block" onClick={() => addIonRowInput( )}>
          Ajouter
        </IonButton>
        <IonButton expand="block" onClick={() => onDismiss( null, 'Cancel' )}>
          Fait
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Example;