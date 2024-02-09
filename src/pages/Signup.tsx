import React from 'react';
// import { useAuth } from "../controller/Authentification";
import './Signup.css';
import { IonButton, IonContent, IonInput } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import apiRequest from '../service-api/usersService';

const Signup: React.FC = () => {
//  const { signup, signInWithGoogle } = useAuth();
 const history = useHistory();

 const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();

   const target = event.target as typeof event.target & {
      nom: { value: string };  
      prenom: { value: string };
      date_naissance: { value: string };
      contact: { value: string };
      email: { value: string };
      password: { value: string };
      passwordconfirm: { value: string };
   };
   const nom = target.nom.value;
   const prenom = target.prenom.value;
   const date_naissance = target.date_naissance.value;
   const contact = target.contact.value;
   const email = target.email.value;
   const password = target.password.value;
   const passwordconfirm = target.passwordconfirm.value;

  const onSuccess = () => {
    history.push('/login');
  };

   // Ajoutez ici la logique de connexion
    if (email.trim() !== '' && password.trim() !== '' && passwordconfirm.trim() !== '') {
        
        if(password.trim() !== passwordconfirm.trim()){
            setErreur("Les deux mots de passes ne sont pas pareilles!");
        } else {
            try {
              if(password.length < 6) {
                setErreur("Le mot de passe doit etre plus de 5 caracteres!");
                return;
              }

              let response = await apiRequest('GET', 'inscription_valide/' + date_naissance, null);
              if(response.errors != null) {
                setErreur(response.errors.exception);
                return;
              }

              // const user = await signup(email, password);
              // const user = undefined;
              // if(user){
                const requestData = {nom: nom, prenom: prenom, dateDeNaissance: date_naissance, contact: contact, mail: email, password: password};
                response = await apiRequest('POST', 'inscription', requestData);
                if(response.errors != null) {
                  setErreur(response.errors.exception);
                  return;
                }
                onSuccess();
              // }

            } catch (error) {
                setErreur("Ce compte existe deja!");
            }
        }

    } else {
        setErreur("Veuillez saisir votre nom d\'utilisateur et votre mot de passe.");
    }
 };

 const handleGoogleSignUp = async () => {
    const onSuccess = () => {
      history.push('/login');
    };

    try {
      // const user = await signInWithGoogle();
      const user = undefined;
      if(user){
        var requestData = {id: user.uid, mail: user.email, nom: user.displayName};
        var response = await apiRequest('POST', 'login', requestData);
        console.log(response);
        if(response.data != null) {
          alert("Ce compte existe deja!");
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
    <div className="inscription-container">
      <h1>Inscription</h1>
      <form method="Get" onSubmit={handleSignUp}>
        <IonInput label="Nom" labelPlacement="floating" fill="outline" type="text" placeholder="Entrer votre nom" name="nom" required />
        <IonInput label="Prenom" labelPlacement="floating" fill="outline" type="text" placeholder="Entrer votre prenom" name="prenom" required />
        <IonInput label="Date de Naissance" labelPlacement="floating" fill="outline" type="date" placeholder="Entrer votre Date de Naissance" name="date_naissance" required />
        <IonInput label="Contact" labelPlacement="floating" fill="outline" type="text" placeholder="Numero de Telephone" name="contact" required />
        <IonInput label="Email" labelPlacement="floating" fill="outline" type="email" placeholder="Entrer votre email" name="email" required></IonInput>
        <IonInput label="Mot de passe" labelPlacement="floating" fill="outline" type="password" placeholder="Entrer votre mot de passe" name="password" required></IonInput>
        <IonInput label="Confimation Du Mot de passe" labelPlacement="floating" fill="outline" type="password" placeholder="Confirmer votre mot de passe" name="passwordconfirm" required></IonInput>
        <p id="erreur" className="erreur"></p>
        <IonButton expand="block" type="submit">S'inscrire</IonButton>
        <IonButton expand="block" onClick={handleGoogleSignUp}>S'inscrire avec Google</IonButton>
        <a href="/login"><p>Vous avez deja un compte?</p></a>
      </form>
    </div>
   </IonContent>
 );
};

export default Signup;
