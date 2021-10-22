import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import Ratings from 'react-ratings-declarative';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import Comparing from './Comparing.jsx';


const Cards = ({ product, styles, rating}) => {
  // console.log('card stylesInfo: ', props.stylesInfo);
  // console.log('cards product: ', props.product);
  // console.log('cards props ??????: ', props);

  // const [styles, setStyles] = useState(stylesInfo);
  const [isMoved, setIsMoved] = useState(false);
  // const [rating, setRating] = useState(reviewInfo);
  const inputEl = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();

  const switchShow = () => {
    // console.log('Clicked');
    setIsShow(isShow ? false : true);
  };

  const switchProduct = () => {
    // console.log('DOne here ', props.product.name);
    dispatch({ type: 'CHANGE_PRODUCT', product: product});
    document.documentElement.scrollTop = 0;
  };

  useEffect(()=> {
    // setStyles(stylesInfo);
    // setRating(reviewInfo);
  }, [product]);

  const altUrl = `https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg`;

  if (product) { // whether the data exists.
    return (
      <li className="cards" onClick={switchProduct}>
        {/* <span>{styles}</span> */}
        <div className="divcardimg">
          {/* {console.log('styles inside return: $$$$$: ', styles)} */}
          <img className="cardImg" src={product.thumbnail_url ? product.thumbnail_url : altUrl} alt="Image is not available" />
          {/* {console.log('styles: ', styles, '\n', 'cardImg: ', styles.results[0].photos[0].thumbnail_url)} */}
          <button onClick={switchShow} style={{border: 'transparent', background: 'transparent', float: 'right'}}>&#9734;</button>
        </div>
        <div className="cardCategory" ><span>{product.category}</span></div>
        <div className="cardName">
          <span ref={inputEl}><strong>{product.name}</strong></span>
          <br></br>
          <span>{product.slogan}</span>
        </div>
        {/* <div className="cardDescription">{props.product.description}</div> */}
        <div className="cardPrice">${product.default_price}</div>
        <div className="stars">
          {/* Waiting for further avg rating, if necessary */}
          <Ratings rating={!rating || rating.length === 0 ? 0 : rating[0].rating} widgetRatedColors="blue" widgetDimensions="15px" widgetRatedColors="rgb(87, 87, 87)" widgetSpacings="0px">
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
          </Ratings>
        </div>
        {<Comparing product={product} handleShow={isShow} handleSwitch={switchShow}/>}
      </li>
    );
  } else {
    return <div></div>;
  }
};


export default Cards;
