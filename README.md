# Shoppies Web Application

Shopify has branched out into movie award shows! This app manages movie nominations for the upcoming Shoppies.
A link to a live version of this application can be found here: [Shoppies App](https://hidden-river-16649.herokuapp.com/).
This application was built for Shopify's Front End Developer Intern Challenge 2021.

## Features

Users can:

- Search to find movie nominations (Data sourced from the omdb API)
- Add movies to the nomination list from results
- View the list of films that are nominated
- Remove a nominee from their nomination list
- The nomination list is saved if the user leaves the page (via LocalStorage)
- Displays a banner when the user has 5 nominations with movie poster images

## Technologies

- [React](https://reactjs.org/) with Hooks
- [omdb API](https://www.omdbapi.com/) for movie data
- [Shards](https://designrevision.com/downloads/shards-react/) React Component Framework
- [Axios](https://www.npmjs.com/package/axios) for HTTP requests
- [Heroku](https://www.heroku.com/) for build and live deployment

## Application Limitations

- Search algorithm is performed by the omdb API
- Search results from omdb API is limited to the top 10 results
- Users can only query by movie title (not year released)
- Data from omdb API is limited to movies for this application
- Currently no way for a user to share their nominations, nominations are only saved locally in browser's local storage

## To Do
- Add share link capability via Query parameters

