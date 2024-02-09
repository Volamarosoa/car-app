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
  onDismiss: (data?: any| string | null | undefined | number, role?: string) => void;
  caracteristiques: any[];
  detailsFunction: ( caractere: string, valeur?: string | null | undefined | number ) => void;
} ) => {

  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const[ caracs, setCaracs ] = useState( Array(caracteristiques.length).fill(undefined) );
  const[ datas, setDatas ] = useState( Array(caracteristiques.length).fill(undefined) );


  let[rows, setRows] = useState([]);
  let[canBeDisplayed, setCanBeDisplayed] = useState(false);

  let[data, setData] = useState([]);


  useEffect( () => {
    // console.log(caracteristiques);
    setData(caracteristiques);
    // console.log(data);
  },[data] );

  const createIonSelectOption = ( row : any ) => {
    // console.log(row);
    return (
      <IonSelectOption key={row.id} value={row.id}>
          {row.nom}
      </IonSelectOption>
    );
  };

  function confirm() {

    let rowss = rows;
    let response = [];

    for( let i = 0; i < caracteristiques.length ; i++ ){
      if( caracs[i] ){
        let objet = {
          caracteristique: caracs[i],
          valeur: (datas[i] ) ? datas[i] : ''
        };
        response.push(objet);
      }
    }

    onDismiss( response , 'confirm');
  };

  const handleSelectChange = async ( event, key ) => {
    const newValues = [...caracs];
    newValues[key] = event.target.value;
    setCaracs(newValues);
  };

  const handleDatasChange = async ( event, key ) => {
    const newValues = [...datas];
    newValues[key] = event.target.value;
    setDatas(newValues)
  };

  const addIonRowInput = async ( key ) => {
    console.log(caracteristiques);
    // console.log(data.length);
    let row = 
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonSelect label='Caracteristiques' labelPlacement='floating' onIonChange={ (event) => handleSelectChange(event, key) }>
              {
                caracteristiques.map( ( row ) => createIonSelectOption(row) )
              }
            </IonSelect>
          </IonCol>
          <IonCol >
            <IonInput fill='outline' label='Description' onIonChange={ async (event) => handleDatasChange(event, key) } labelPlacement='floating' />
          </IonCol>

        </IonRow>
      </IonGrid>
  ;
    // console.log(row);
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
        <IonButton expand="block" onClick={() => addIonRowInput( rows.length )}>
          Ajouter
        </IonButton>
        <IonButton expand="block" onClick={() => confirm()}>
          Fait
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Example;