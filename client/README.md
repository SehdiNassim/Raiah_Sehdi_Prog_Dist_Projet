# Projet programmation distribué
### Binome : Sehdi Mohammed Nassim et Raiah Mohamed Amine 

## Configuration Docker
Une fois le projet téléchargé, il faudra configurer l'environement de travail (avant de commencer, on doit être dans le dossier du projet)

:warning: **Il faut éxécuter le tout dans un systeme Linux**
- Créer l'image docker du frontend: 
```bash
  sudo docker build -t sehdi-raiah-frontend ./client
```
- Créer l'image docker du backend: 
```bash
  sudo docker build -t sehdi-raiah-backend ./server
```
- Lancer un container du frontend (Il s'exécutera dans http://localhost, il faut vérifier qu'aucun programme n'est lancé dans http://localhost): 
```bash
  sudo docker run --network="host" -d sehdi-raiah-frontend
```
- Lancer un container du backend (Il s'exécutera dans http://localhost:9000, il faut vérifier qu'aucun programme n'est lancé dans http://localhost:9000), les fichiers téléchargés se trouveront dans le chemin XXXX qu'il faut spécifier dans la commande: 
```bash
  sudo docker run -p 9000:9000 -v XXXX:/src/uploads -d sehdi-raiah-backend
```
- Une fois les commandes précédentes exécutées, le projet sera accessible dans http://localhost


## Configuration secondaire
Si jamais la configuration docker ne marche pas (Il y a des risques dans mac et windows), on exécute les commandes suivantes:
- On suppose qu'aprés chaque commande on retourne dans le dossier père qui contient le frontend et le backend.
- Installer les packages du frontend:
```bash
  npm i ./client
```
- Installer les packages du backend
```bash
  npm i ./server 
```
- Lancer le frontend
```bash
  cd ./client
  npm run start 
```
- Lancer le backend
```bash
  cd ./server
  node index.js  
```
