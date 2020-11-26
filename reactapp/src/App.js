{import React, { useState, useEffect } from 'react';
}import './App.css';
import { NavBar } from "./components/navbar";
import { Movies } from "./components/Movies";
import { MDBContainer, MDBRow } from 'mdbreact';


function App() {

  const [FilmList, setFilmList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [moviesCount, setMoviesCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      // await here
      // J'appelle mon backend pour récuperer via l'API la liste de films les plus populaires  
    var rawResponse = await fetch('/new-movies');
    var response = await rawResponse.json();
    var filmListfromAPI = response.resultJSON.results
    setFilmList(filmListfromAPI);
      // J'appelle ma BDD pour récuperer ma liste de films dans ma wishlist 
    const responseWish = await fetch('/wishlist-movies')  
    const jsonResponseWish = await responseWish.json()
    const datafromDB = jsonResponseWish.listMovies;
    const wishlistFromDB = datafromDB.map((i) => {
    return {titreFilm:i.name, imgFilm:i.img};
    }) 
    // Au lancement de l'app, les données de mongoose sont asignés à mes useState
    setWishList(wishlistFromDB)
    setMoviesCount(wishlistFromDB.length);
      // ...
    }
    fetchData();

  }, []);

  var handleLikeClick = (titreFilm, imgFilm) => {
  setWishList([...wishList, { titreFilm:titreFilm, imgFilm:imgFilm }]);
  setMoviesCount(moviesCount+1);

    // Enregistrer un film en wishlist sur la base de données
    async function loadData() {
      await fetch('/wishlist-movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${titreFilm}&img=${imgFilm}`
      });
    }
    loadData()
  }

  // S'exécute au clic sur le bouton "Déjà vu" situé dans ma wishlist
  var handleDeleteClick = (titreFilm) => {
    setMoviesCount(moviesCount+1);
    setWishList(wishList.filter((e) => (e.titreFilm !== titreFilm)));

    async function loadDelete() {
      await fetch(`/wishlist-movies?name=${titreFilm}`, {
        method: 'DELETE',
      });
    }
    loadDelete()
  }

  var FilmCard = [];
  for (var i = 0; i < FilmList.length; i++) {
    FilmCard.push(<Movies handleDeleteClickParent={handleDeleteClick} handleClickParent={handleLikeClick} wishList={wishList} movieName={FilmList[i].title} movieDesc={FilmList[i].overview} movieImg={"https://image.tmdb.org/t/p/w500/" + FilmList[i].backdrop_path} globalCountRating={FilmList[i].vote_average} />);
  }

  return (
    <div className="App-header" >
      <MDBContainer fluid>
        <MDBRow>
          <NavBar wishList={wishList} handleDeleteClickParent={handleDeleteClick} className="App-link" />
        </MDBRow>
        <MDBRow>
          {FilmCard}
        </MDBRow>
      </MDBContainer>
    </div>

  );
}

export default App;
