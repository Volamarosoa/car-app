import { Redirect, Route, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonNavLink
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { chatbubblesOutline, peopleOutline, newspaperOutline } from 'ionicons/icons';
import ListeAnnonce from './pages/ListeAnnonce';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Annonce from './pages/annonce/Annonce';

import './App.css';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import 'bootstrap';

/* Theme variables */
import './theme/variables.css';

import { AuthentificationProvider } from './controller/Authentification'
import CreateCar from './pages/annonce/CreationVoiture';
import Footer from './components/Footer';
import PushNotificationsContainer from './pages/TestNotification';

setupIonicReact();

const App: React.FC = () => { 
  // const location = useLocation();
  // const shouldShowFooter = !location.pathname.startsWith('/login');

  return (
  <AuthentificationProvider>
    <IonApp>
      <IonReactRouter>
        <AuthentificationProvider>
          <IonRouterOutlet>
              <Route path="/listeAnnonce">
                <ListeAnnonce />
              </Route>
              <Route path="/test/voiture">
                <CreateCar />
              </Route>
              <Route path="/test/annonce">
                <Annonce />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
                {/* <Redirect to="/test/notif" /> */}
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/test/notif" >
                <PushNotificationsContainer />
              </Route>
            </IonRouterOutlet>
              
          </AuthentificationProvider>
      </IonReactRouter>
    </IonApp>
  </AuthentificationProvider>
)};

export default App;
