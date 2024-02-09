import React, { useState, useRef } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonItem, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import { closeOutline, logOutOutline, chatbubblesOutline, peopleOutline, newspaperOutline } from 'ionicons/icons';
import './Menu.css';

interface MenuProps {
    menu: string;
    isActive: boolean;
}
const Menu: React.FC<MenuProps> = ({ menu, isActive = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

  return (
    <>
        <IonHeader id="main-content">
            <IonToolbar>
                <IonTitle>{ menu }</IonTitle>
            </IonToolbar>
        </IonHeader>
    </>
  );
};

export default Menu;
