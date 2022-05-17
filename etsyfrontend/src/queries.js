import {gql} from '@apollo/client'

export const ORDERS=gql`
query Query($ouser_id: ID!) {
    orders(ouser_id: $ouser_id) {
      ouser_id
      oproduct_id {
        _id
        productname
        price
        shopname
        image
        category
        description
        count
        
        sales
      }
      oquantity
      odate
      checked
    }
    
  }`

  export const LOGIN=gql`
  query Query($emailid: String!, $password: String!) {
    login(emailid: $emailid, password: $password) {
      _id
      emailid
      name
      shopname
      shopImage
      profileimage
      gender
      country
      dob
      about
      address
      phone
    }
  }`

  export const PRODUCTS=gql`
  query Query {
    products {
      _id
      productname
      price
      shopname
      image
      category
      count
      description
      sales
    }
  }`
  export const SHOPNAME=gql`
  query Query($shopname: String!) {
    shopName(shopname: $shopname)
  }`
  export const getProducts=gql`
  query Query($productsofshopId: ID) {
    productsofshop(id: $productsofshopId) {
      _id
      productname
      price
      shopname
      image
      category
      description
      count
      sales
    }
  }`

  export const getCart=gql`
  query Query($cuserId: ID!) {
    getCart(cuser_id: $cuserId) {
      cuser_id
      cproduct_id {
        price
        shopname
        productname
        _id
        image
        category
        description
        count
        sales
      }
      quantity
    }
  }`


  export const PROFILE=gql`
  query Query($cuserId: ID!) {
    getCart(cuser_id: $cuserId) {
      name
      phone
      dob
      country
      about
      gender
      address
    }
  }`
  