
   
const graphql = require('graphql');
var loginpage = require('../models/login');
var products = require('../models/products');
var favorites=require("../models/favorites");
var orders=require("../models/orders");
var cart=require("../models/cart");
const sha1 = require('sha1');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLDate
} = graphql;