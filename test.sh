#!/bin/sh

serveurIP=localhost

echo '-----Verificaton des routes POST ET DELETE-----\n'

echo '\n-Ajout des voitures de location (les images de test sont pre uplaod sur le cloud)'
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Sophie", "Model": "Renault Clio", "email": "Sophie@gmail.com", "Year": "2017", "City": "Bora-Bora", "description": "Louez cette Renault Clio à Bora-Bora pour un séjour confortable et pratique !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test1.jpg", "price": "40","start": "2023-03-07T00:00:00.000Z", "end": "2023-08-15T00:00:00.000Z", "creation_date": "2023-03-11T12:02:12.019Z"}' http://$serveurIP:8080/cars
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Antoine", "Model": "Peugeot 2008", "email": "Antoine@gmail.com", "Year": "2019", "City": "Rangiroa", "description": "Découvrez la beauté de Rangiroa en louant cette Peugeot 2008 confortable et économique !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test2.jpeg", "price": "35","start": "2023-04-01T00:00:00.000Z", "end": "2023-04-30T00:00:00.000Z", "creation_date": "2023-03-11T12:05:26.019Z"}' http://$serveurIP:8080/cars
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Lucas", "Model": "Toyota RAV4", "email": "Lucas@gmail.com", "Year": "2021", "City": "Gambier", "description": "Parcourez l'\''île de Gambier à bord de cette Toyota RAV4 confortable et fiable !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test3.jpg", "price": "50","start": "2023-03-01T00:00:00.000Z", "end": "2023-10-20T00:00:00.000Z", "creation_date": "2023-03-11T12:08:39.019Z"}' http://$serveurIP:8080/cars
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Antoine", "Model": "Nissan Qashqai", "email": "Antoine@gmail.com", "Year": "2018", "City": "Moorea", "description": "Explorez Moorea à bord de cette Nissan Qashqai confortable et spacieuse !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test4.jpeg", "price": "45","start": "2023-03-01T00:00:00.000Z", "end": "2023-03-17T00:00:00.000Z", "creation_date": "2023-03-11T12:12:05.019Z"}' http://$serveurIP:8080/cars
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Marc", "Model": "Citroen C3", "email": "Marc@gmail.com", "Year": "2014", "City": "Papeete", "description": "Louez cette Citroën C3 pour une conduite agréable et confortable sur les routes de Tahiti !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test5.jpg", "price": "40","start": "2023-08-01T00:00:00.000Z", "end": "2023-08-31T00:00:00.000Z", "creation_date": "2023-03-11T11:42:07.019Z"}' http://$serveurIP:8080/cars
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Lucie", "Model": "Ford Fiesta", "email": "Lucie@gmail.com", "Year": "2017", "City": "Gambier", "description": "Louez cette Ford Fiesta pour une conduite confortable et économique lors de votre séjour à Gambier !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test6.jpg", "price": "25","start": "2023-03-01T00:00:00.000Z", "end": "2023-03-27T00:00:00.000Z", "creation_date": "2023-03-11T12:30:00.019Z"}' http://$serveurIP:8080/cars
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Theo", "Model": "Renault Twingo", "email": "Theo@gmail.com", "Year": "2015", "City": "Gambier", "description": "Louez cette Renault Twingo pour une conduite facile et amusante lors de votre séjour à Gambier !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test7.png", "price": "30","start": "2023-03-01T00:00:00.000Z", "end": "2023-03-31T00:00:00.000Z", "creation_date": "2023-03-11T12:16:42.019Z"}' http://$serveurIP:8080/cars
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Lea", "Model": "Hyundai Tucson", "email": "Lea@gmail.com", "Year": "2020", "City": "Moorea", "description": "Parcourez les routes de Moorea en toute sécurité à bord de cette Hyundai Tucson moderne et confortable !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test8.jpg", "price": "55","start": "2023-07-01T00:00:00.000Z", "end": "2023-07-15T00:00:00.000Z", "creation_date": "2023-03-11T12:20:01.019Z"}' http://$serveurIP:8080/cars
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Theo", "Model": "Peugeot 208", "email": "Theo@gmail.com", "Year": "2016", "City": "Bora-Bora", "description": "Louez cette Peugeot 208 pour une conduite agile et économique sur l'\''île de Bora-Bora !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test9.jpg", "price": "35","start": "2023-06-01T00:00:00.000Z", "end": "2023-06-30T00:00:00.000Z", "creation_date": "2023-03-11T12:23:22.019Z"}' http://$serveurIP:8080/cars
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Chloe", "Model": "Toyota Yaris", "email": "Chloe@gmail.com", "Year": "2018", "City": "Rangiroa", "description": "Découvrez les merveilles de Rangiroa à bord de cette Toyota Yaris pratique et économique !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test10.jpg", "price": "30","start": "2023-03-01T00:00:00.000Z", "end": "2023-03-31T00:00:00.000Z", "creation_date": "2023-03-11T12:26:55.019Z"}' http://$serveurIP:8080/cars

echo '\n\n-Ajout des quelques reservations\n'

curl -X POST --header "Content-Type: application/json" --data '{  "start": "2023-03-10T00:00:00.000Z", "end": "2023-03-15T00:00:00.000Z", "carId": 4 }' http://$serveurIP:8080/4/book

curl -X POST --header "Content-Type: application/json" --data '{  "start": "2023-03-14T00:00:00.000Z", "end": "2023-03-30T00:00:00.000Z", "carId": 1 }' http://$serveurIP:8080/1/book
curl -X POST --header "Content-Type: application/json" --data '{  "start": "2023-04-07T00:00:00.000Z", "end": "2023-04-10T00:00:00.000Z", "carId": 1 }' http://$serveurIP:8080/1/book

curl -X POST --header "Content-Type: application/json" --data '{  "start": "2023-04-01T00:00:00.000Z", "end": "2023-04-03T00:00:00.000Z", "carId": 2 }' http://$serveurIP:8080/2/book
curl -X POST --header "Content-Type: application/json" --data '{  "start": "2023-04-03T00:00:00.000Z", "end": "2023-04-19T00:00:00.000Z", "carId": 2 }' http://$serveurIP:8080/2/book
curl -X POST --header "Content-Type: application/json" --data '{  "start": "2023-04-20T00:00:00.000Z", "end": "2023-04-30T00:00:00.000Z", "carId": 2 }' http://$serveurIP:8080/2/book

curl -X POST --header "Content-Type: application/json" --data '{  "start": "2023-03-14T00:00:00.000Z", "end": "2023-03-16T00:00:00.000Z", "carId": 6 }' http://$serveurIP:8080/6/book
curl -X POST --header "Content-Type: application/json" --data '{  "start": "2023-03-19T00:00:00.000Z", "end": "2023-03-22T00:00:00.000Z", "carId": 6 }' http://$serveurIP:8080/6/book

echo '\n\n-Check si le password admion est valide\n'

curl -X POST --header "Content-Type: application/json" --data '{  "password": "1234" }' http://$serveurIP:8080/admin

echo '\n\n-Supprime des reservations\n'

curl -X DELETE -H "Content-Type: application/json" -H "Cookie: password=1234" http://$serveurIP:8080/3/book

echo '\n\n--------Cas d erreur-------\n' 

echo '\n---POST car----:\n'

echo '\n-email nom valide\n'
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Chloe", "Model": "Toyota Yaris", "email": "Chloe@gmail", "Year": "2018", "City": "Rangiroa", "description": "Découvrez les merveilles de Rangiroa à bord de cette Toyota Yaris pratique et économique !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test10.jpg", "price": "30","start": "2023-03-01T00:00:00.000Z", "end": "2023-03-31T00:00:00.000Z", "creation_date": "2023-03-11T12:26:55.019Z"}' http://$serveurIP:8080/cars 

echo '\n\n-champ non rempli\n'
curl -X POST --header "Content-Type: application/json" --data '{ "name": "", "Model": "Toyota Yaris", "email": "Chloe@gmail.com", "Year": "2018", "City": "Rangiroa", "description": "Découvrez les merveilles de Rangiroa à bord de cette Toyota Yaris pratique et économique !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test10.jpg", "price": "30","start": "2023-03-01T00:00:00.000Z", "end": "2023-03-31T00:00:00.000Z", "creation_date": "2023-03-11T12:26:55.019Z"}' http://$serveurIP:8080/cars

echo '\n\n-Date start apres date end\n'
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Chloe", "Model": "Toyota Yaris", "email": "Chloe@gmail.com", "Year": "2018", "City": "Rangiroa", "description": "Découvrez les merveilles de Rangiroa à bord de cette Toyota Yaris pratique et économique !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test10.jpg", "price": "30","start": "2023-03-02T00:00:00.000Z", "end": "2023-03-01T00:00:00.000Z", "creation_date": "2023-03-11T12:26:55.019Z"}' http://$serveurIP:8080/cars

echo '\n\n-Date non valide\n'
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Chloe", "Model": "Toyota Yaris", "email": "Chloe@gmail.com", "Year": "2018", "City": "Rangiroa", "description": "Découvrez les merveilles de Rangiroa à bord de cette Toyota Yaris pratique et économique !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test10.jpg", "price": "30","start": "2023-03-02T00:00:00.000Z", "end": "2023-03-01T00:00:00.000Z", "creation_date": "2023-03-1"}' http://$serveurIP:8080/cars

echo '\n\n-Image non valide\n'
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Chloe", "Model": "Toyota Yaris", "email": "Chloe@gmail.com", "Year": "2018", "City": "Rangiroa", "description": "Découvrez les merveilles de Rangiroa à bord de cette Toyota Yaris pratique et économique !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test10", "price": "30","start": "2023-03-02T00:00:00.000Z", "end": "2023-03-01T00:00:00.000Z", "creation_date": "2023-03-11T12:26:55.019Z"}' http://$serveurIP:8080/cars

echo '\n\n-Date non valide\n'
curl -X POST --header "Content-Type: application/json" --data '{ "name": "Chloe", "Model": "Toyota Yaris", "email": "Chloe@gmail.com", "Year": "salut", "City": "Rangiroa", "description": "Découvrez les merveilles de Rangiroa à bord de cette Toyota Yaris pratique et économique !", "carPic": "https://okvoiture.blob.core.windows.net/carspics/test10.jpg", "price": "30","start": "2023-03-02T00:00:00.000Z", "end": "2023-03-01T00:00:00.000Z", "creation_date": "2023-03-11T12:26:55.019Z"}' http://$serveurIP:8080/cars

echo '\n\n---POST book--- :'

echo '\n\n-Dates entre start et end deja prise\n'
curl -X POST --header "Content-Type: application/json" --data '{  "start": "2023-03-15T00:00:00.000Z", "end": "2023-03-23T00:00:00.000Z", "carId": 6 }' http://$serveurIP:8080/6/book

echo '\n\n-Date start et end sont les memes\n'
curl -X POST --header "Content-Type: application/json" --data '{  "start": "2023-03-23T00:00:00.000Z", "end": "2023-03-23T00:00:00.000Z", "carId": 6 }' http://$serveurIP:8080/6/book

echo '\n\n-Date hors limite\n'
curl -X POST --header "Content-Type: application/json" --data '{  "start": "2023-04-01T00:00:00.000Z", "end": "2023-04-23T00:00:00.000Z", "carId": 6 }' http://$serveurIP:8080/6/book

echo '\n\n-Start apres End\n'
curl -X POST --header "Content-Type: application/json" --data '{  "start": "2023-03-23T00:00:00.000Z", "end": "2023-03-19T00:00:00.000Z", "carId": 6 }' http://$serveurIP:8080/6/book

echo '\n\n--- POST admin----'

echo '\n-mot de passe incorrect\n'
curl -X POST --header "Content-Type: application/json" --data '{  "password": "12345" }' http://$serveurIP:8080/admin

echo '\n\n\n----DELETE book----\n'

echo '-cookie avec le mot de passe admin non fourni\n'
curl -X DELETE -H "Content-Type: application/json" http://$serveurIP:8080/1/book


