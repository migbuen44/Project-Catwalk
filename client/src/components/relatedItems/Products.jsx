import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Token from '../../../../config.js';
import Cards from './Cards.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper/core';


import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';


SwiperCore.use([Pagination, Navigation]);

const url = 'http://18.216.123.108/api';
const options = {
  headers: {
    Authorization: Token.TOKEN
  }
};

const Products = (props) => {
  console.log('products props: ', props);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productStyles, setProductStyles] = useState([]);
  const [isMoved, setIsMoved] = useState(false);
  const [review, setReview] = useState([]);


  const getStyles = () => {
    let stylesArr = [];
    // console.log('test data: ', props.testdata);
    console.log('related products: ', relatedProducts);
    console.log('testdata: ', props.testdata);
    props.testdata.map((id, index) => {
      console.log('getstyles id: ', id);
      return axios.get(`${url}/products/${id}/styles`, options)
        .then(res => {
          console.log('res data in getstyles: ', res.data);
          stylesArr.push(res.data);
          return res.data;
        })
        .catch(err => console.log(err));
    });
    // console.log('styles run and data here si', stylesArr);
    setProductStyles(prevStyles => {
      prevStyles = stylesArr;
      return prevStyles;
    });
  };

  const handleMoveCard = () => {
    setIsMoved(isMoved ? false : false);
  };

  // const getProduct = () => {
  //   let productsArr = [];
  //   props.testdata.map((id, index) => {
  //     return axios.get(`${url}/products/${id}`, options)
  //       .then(res => {
  //         // console.log('after get', res.data);
  //         // if (!isrun) {
  //         // setRelatedProducts([...relatedProducts, res.data]);
  //         // }
  //         productsArr.push(res.data);
  //         return res.data;
  //       })
  //       .catch(err => console.log(err));
  //   });
  //   setRelatedProducts(prevProducts => {
  //     prevProducts = productsArr;
  //     return prevProducts;
  //   });
  // };

  const getReview = () => {
    let reviewArr = [];
    props.testdata.map((id, index) => {
      return axios.get(`${url}/reviews/${id}`, options)
        .then(res => {
          // setReview([review, res.data]);
          // console.log('data in review', res.data);
          reviewArr.push(res.data);
          return res.data;
        })
        .catch(err => console.log(err));
    });
    setReview(prevReview => {
      prevReview = reviewArr;
      return prevReview;
    });
  };

  // This is for async and promist.all usage. Before using this, comment out the setState in each method.
  // const data = async () => {
  //   const initialData = [getStyles(), getProduct(), getReview()];
  //   const [ fetchStyle, fetchProduct, fetchReview] = await Promise.all(initialData);

  //   // console.log('', );
  //   console.log('fetch product', fetchProduct);
  //   console.log('fetch styles', fetchStyle);

  //   setRelatedProducts(fetchProduct);
  //   setProductStyles(fetchStyle);
  //   setReview(fetchReview);
  // }

  const createCard = () => {
    // if (!isMoved) {
    //   return (
    //     <Cards product={product} key={index} stylesInfo={productStyles[index]} reviewInfo={review[index]}  position={isMoved}/>
    //   )
    // } else {
    // }
    // console.log('create card related products: ', relatedProducts);
    // console.log('create card styles: ', productStyles);
    // console.log('create card reviews: ', review);
    return relatedProducts.map((product, index) => (
      <SwiperSlide key={index}>
        {console.log('create card related products: ', relatedProducts[index])}
        {console.log('create card styles: ', productStyles[index])}
        {console.log('create card reviews: ', review[index])}
        <Cards product={product} key={index} styles={productStyles[index]} rating={review[index]} position={isMoved}/>
      </SwiperSlide>
    ));
  };

  useEffect(() => {
    let productArr = [];
    let stylesArr = [];
    let reviewArr = [];
    const fetchProduct = async () => {
      // props.testdata.map((id) => {
      //   const result = await axios.get(`${url}/products/${id}`, options);
      //   productsArr.push(result.data);
      // });
      for (let id of props.testdata) {
        const result = await axios.get(`${url}/products/${id}`, options);
        productArr.push(result.data);
        const result2 = await axios.get(`${url}/products/${id}/styles`, options);
        stylesArr.push(result2.data);
        const result3 = await axios.get(`${url}/reviews/${id}`, options);
        reviewArr.push(result3.data);
      }
      setRelatedProducts(productArr);
      setProductStyles(stylesArr);
      setReview(reviewArr);
    };

    const fetchStyles = async () => {
      for (let id of props.testdata) {
        const result = await axios.get(`${url}/products/${id}/styles`, options);
        stylesArr.push(result.data);
      }
      setProductStyles(stylesArr);
    };

    // fetchStyles();
    fetchProduct();
    // fetchStyles();
    // getStyles();
    // getReview();

    // console.log('props here is ', props.testdata);
  }, [props.testdata]);

  console.log('related products: ', relatedProducts);
  console.log('product styles: ', productStyles);
  console.log('reviews: ', review);

  if (relatedProducts && productStyles && review) {
    return (
      <React.Fragment>
        <div className="products">
          <span className='title'>RELATED PRODUCTS</span>
          {/* <span>{relatedProducts.id}</span> */}
          <ul>
            <Swiper slidesPerView={4} spaceBetween={10} slidesPerGroup={2} loop={false} loopFillGroupWithBlank={true} pagination={{'clickable': true }} navigation={true} className='mySwiper'>
              {createCard()}
            </Swiper>
          </ul>
        </div>
        <div className="outfit">
          <span className='title'>YOUR OUTFIT</span>
          <ul>
            {/* {createCard()} */}
          </ul>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <span>Test </span>
    );
  }
};

export default Products;
