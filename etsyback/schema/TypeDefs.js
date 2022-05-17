const { ApolloServer, gql } = require('apollo-server');

const typeDefs =gql`

type Order{
  ouser_id:ID
  oproduct_id:Product
  oquantity:Int
  odate:String
  checked:String
}
type Product{
    _id:ID
    productname:String
    price:Int
    shopname:String
    image:String
    category:String
    description:String
    count:Int
    
    sales:Int
}


type User{
    _id:ID
    emailid:String!
    name:String!
    password:String!
    
    shopname:String
    shopImage:String
    profileimage:String
    gender:String
    country:String
    dob:String
    about:String
    address:String
    phone:Int
    
}

type cart{
    cuser_id:ID
    cproduct_id:Product
    quantity:Int
}

#Queries
type Query{
    orders(ouser_id:ID!):[Order!]!
    login(emailid:String!,password:String!):[User!]!
    products:[Product!]!
    shopName(shopname:String!):Boolean!
    productsofshop(id:ID):[Product!]!
    getCart(cuser_id:ID!):[cart!]!
    
  }
#Mutations
type Mutation{
    createUser(name:String!,emailid:String!,password:String!): [User!]!
    addShop(shopname:String!,id:ID!):Boolean!
    addCart(cuser_id:ID!,cproduct_id:ID!,quantity:Int!):Boolean!
    addProduct(productname:String!,price:Int!,category:String!,image:String!,description:String!,count:Int!,id:ID!,shopname:String!):[Product!]!
   
}
`;
module.exports=typeDefs