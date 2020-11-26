import React, { useState } from 'react';
import {
  CardImg, CardText, CardBody,
  CardTitle, Badge, ButtonGroup,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, faVideo } from '@fortawesome/free-solid-svg-icons'
import { MDBCard, MDBCol, MDBBtn } from 'mdbreact';


const Movies = (props) => {

  // Itinialiser le compteur de like 
  const [watchMovie, setwatchMovie] = useState(0);
  const [myRatingMovie, setMyRatingMovie] = useState(0);
  var likeColor = {cursor: 'pointer'};
    var wishList = props.wishList;
  var inList = false;

  // Pour savoir si un film est présent dans la WishList
  for (let i = 0; i < wishList.length; i++) {
    if (props.movieName === wishList[i].titreFilm) {
      inList = true;        
      likeColor = { color: '#e74c3c', cursor: 'pointer' };
    } 
  }

  var handleLikeClick = (titreFilm, imgFilm) => {

    if(inList === true) {        
      props.handleDeleteClickParent(titreFilm);
      likeColor = { cursor: 'pointer' };
    } else {      
    props.handleClickParent(titreFilm, imgFilm);
    }
  }

  var handleWatchClick = () => {
    setwatchMovie(watchMovie + 1);
  }
  var watchColor = {}
  if (watchMovie > 0) {
    watchColor = { color: '#e74c3c' };
  } else {
    watchColor = {};
  }

  var handleRatingMoviePlus = () => {
    if (myRatingMovie < 10) {
      setMyRatingMovie(myRatingMovie + 1);
    }
  }
  var handleRatingMovieMinus = () => {
    if (myRatingMovie > 0) {
      setMyRatingMovie(myRatingMovie - 1);
    }
  }

  var RatingMovie = [];
  for (let j = 0; j < 10; j++) {

    var RatingColor = {}
    if (j < myRatingMovie) {
      RatingColor = { color: '#f1c40f' }
    }
    ;
    RatingMovie.push(<FontAwesomeIcon style={RatingColor} icon={faStar} onClick={() => setMyRatingMovie(j + 1)} />)
  }

  // Calculer la moyenne en prennant en compte mon avis

  function numAverage(a) {
    var b = a.length,
      c = 0, i;
    for (i = 0; i < b; i++) {
      c += Number(a[i]);
    }
    return c / b;
  }

  var moyenne = numAverage([props.globalCountRating, myRatingMovie]);


  // Changer la couleur des icones selon nbr de vote 
  var tabGlobalRating = []
  for (var i = 0; i < 10; i++) {
    var color = {}
    if (i < Math.round(moyenne)) {
      color = { color: '#f1c40f' }
    }
    tabGlobalRating.push(<FontAwesomeIcon style={color} icon={faStar} />)
  }
  var desc = props.movieDesc;
  var extrait = desc.substring(0, 80);
  return (
    <MDBCol xs="12" lg="6" xl="4">
      <MDBCard style={{ marginBottom: 30 }}>
        <CardImg top width="100%" src={props.movieImg} alt="Card image cap" />
        <CardBody>
          <CardText >Like <FontAwesomeIcon onClick={() => handleLikeClick(props.movieName, props.movieImg)} style={likeColor} icon={faHeart} /> </CardText>
          <CardText>Nombre de vues  <FontAwesomeIcon onClick={() => handleWatchClick()} style={watchColor} icon={faVideo} />  <Badge color="danger">{watchMovie}</Badge></CardText>
          <CardText>Mon avis {RatingMovie} <ButtonGroup size="sm"><MDBBtn onClick={() => handleRatingMovieMinus()} color="danger">-</MDBBtn><MDBBtn onClick={() => handleRatingMoviePlus()} color="danger">+</MDBBtn></ButtonGroup></CardText>
          <CardText>Moyenne {tabGlobalRating}({Math.round(moyenne)})</CardText>
          <CardTitle>{props.movieName}</CardTitle>
          <CardText>{extrait}</CardText>
        </CardBody>
      </MDBCard>
    </MDBCol>
  );
};

export { Movies };