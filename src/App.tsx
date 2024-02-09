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
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ListeAnnonce from './pages/annonce/Annonce';

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

setupIonicReact();

const App: React.FC = () => { 
  // const location = useLocation();
  // const shouldShowFooter = !location.pathname.startsWith('/login');

  return (
  // <AuthentificationProvider>
    <IonApp>
      <IonReactRouter>
        {/* <AuthentificationProvider> */}
          <IonRouterOutlet>
              <Route exact path="/tab1" component={Tab1}/>
              <Route exact path="/tab2">
                <Tab2 />
              </Route>
              <Route path="/tab3">
                <Tab3 />
              </Route>
              <Route path="/test/voiture">
                <CreateCar />
              </Route>
              <Route path="/test/annonce">
                <ListeAnnonce />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </IonRouterOutlet>
              
          {/* </AuthentificationProvider> */}
      </IonReactRouter>
    </IonApp>
  // </AuthentificationProvider>
)};

export default App;
