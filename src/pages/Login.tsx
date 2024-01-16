import React from 'react';
import { useAuth } from "../controller/Authentification";
import './Login.css';
import { IonButton, IonInput, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import apiRequest from '../service-api/usersService';


const Login: React.FC = () => {
 const { login, signInWithGoogle } = useAuth();
 const history = useHistory();

 const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();

   const target = event.target as typeof event.target & {
     username: { value: string };
     password: { value: string };
   };
   const username = target.username.value;
   const password = target.password.value;
  const onSuccess = () => {
    history.push('/tab1');
  };

   // Ajoutez ici la logique de connexion
   if (username.trim() !== '' && password.trim() !== '') {
      try {
        const user = await login(username, password);
        if(user) {
          var requestData = {id: user.uid, mail: user.email, nom: user.displayName};
          var response = await apiRequest('POST', 'login', requestData);
          console.log(response);
          localStorage.setItem('token', response.data.token);
          onSuccess();
        }
        
      } catch (error) {
        console.log(error);
        setErreur("Email ou mot de passe incorrect")
      }
   } else {
      setErreur("Veuillez saisir votre nom d\'utilisateur et votre mot de passe.");
   }
 };

 const handleGoogleSignUp = async () => {
  const onSuccess = () => {
    history.push('/tab1');
  };

  try {
    const user = await signInWithGoogle();
    if(user){
      var requestData = {id: user.uid, mail: user.email, nom: user.displayName};
      var response = await apiRequest('POST', 'login', requestData);
      console.log(response);
      if(response.data != null) {
        localStorage.setItem('token', response.data.token);
        onSuccess();
        return;
      }
      response = await apiRequest('POST', 'inscription', requestData);
      console.log(response);
      if(response.errors != null) {
        console.log(response.errors);
        alert("Erreur: " + response.errors.exception);
        return;
      }
      onSuccess();
    }
  } catch (error) {
    alert('Il y a une erreur : '+error);
  }
};

 function setErreur(erreur: string) {
  var divErreur = document.getElementById("erreur");
  if(divErreur != null)
    divErreur.innerHTML = erreur;
}

 return (
   <IonContent>
   <div className="login-container">
     <h1>Connexion</h1>
     <form method="Get" onSubmit={handleLogin}>
       <IonInput label="Email" labelPlacement="floating" fill="outline" type="email" placeholder="Entrer votre email" name="username" required></IonInput>
       <IonInput label="Mot de passe" labelPlacement="floating" fill="outline" type="password" placeholder="Entrer votre mot de passe" name="password" required></IonInput>
       <p id="erreur" className="erreur"></p>
       <IonButton expand="block" type="submit">Se connecter</IonButton>
       <IonButton expand="block" onClick={handleGoogleSignUp}>Se connecter avec Google</IonButton>
       <a href="/signup"><p>Inscription</p></a>
     </form>
   </div>
   </IonContent>
 );
};

export default Login;
