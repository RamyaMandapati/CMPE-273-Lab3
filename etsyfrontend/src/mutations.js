import {gql} from '@apollo/client'

export const REG=gql`
mutation Mutation($name: String!, $emailid: String!, $password: String!) {
    createUser(name: $name, emailid: $emailid, password: $password) {
      emailid
      name
      password
    }
  }
`
export const ADDSHOP=gql`
mutation Mutation($shopname: String!, $addShopId: ID!) {
  addShop(shopname: $shopname, id: $addShopId)
}`

export const ADDCART=gql`
mutation Mutation($cuserId: ID!, $cproductId: ID!, $quantity: Int!) {
  addCart(cuser_id: $cuserId, cproduct_id: $cproductId, quantity: $quantity)
}`

export const ADDPRODUCT=gql`
mutation AddProduct($productname: String!, $category: String!, $image: String!, $description: String!, $count: Int!, $addProductId: ID!, $price: Int!, $shopname: String!) {
  addProduct(productname: $productname, category: $category, image: $image, description: $description, count: $count, id: $addProductId, price: $price, shopname: $shopname) 
    
  
}`

export const EDITPROFILE=gql`
mutation EditProfile($name:STRING!,$profileimage:String!,$about:String!,$dob:String!,$country:String!,$phone:String!,$gender:String,$address:String!){
    editProfile(name:$name,profileimage:$profileimage,about:$about,dob:$dob,phone:$phone,gender:$gender,address:$address)

    
}`