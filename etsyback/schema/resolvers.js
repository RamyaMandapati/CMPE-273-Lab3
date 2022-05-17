const orderspage=require('../src/models/orders');
const loginpage=require('../src/models/login');
const products=require('../src/models/products')
const cart=require('../src/models/cart')
const bcrypt=require('bcrypt');

const saltRounds=10;
const resolvers={
 
    Query:{
      async orders(_,{ouser_id}){
        console.log("orders");
        console.log(ouser_id)
        const result=await orderspage.find({ouser_id}).populate("oproduct_id")
        console.log(result);
        return result
      
        },
        async login(_,args){
          const emailid_login=args.emailid;
          const password_login=args.password;
    
          var query = {emailid: emailid_login}
          const result=await loginpage.find(query)
          // if(err) throw new Error(err);
          console.log(result);
          return result
      },
        async products(){
          const result=await products.find()
          console.log(result + "result");
          return result;
      
      
    },
    async shopName(_,{shopname}){
      const s=shopname
      let available=false;
      const result=await products.find({shopname:s});
      console.log(result);
      if(result.length==0){
       available=true;
        
      }
      return available;

    },
    async productsofshop(_,{id}){
      const result=await  products.find({id:id});
      console.log(result);
      return result
    },
    async getCart(_,{cuser_id}){
      const result=await cart.find({cuser_id}).populate("cproduct_id")
      console.log(result);
      if(result){
        return result;
      }else if(error){

        throw error
      }
    }
      },

      Mutation:{
        async createUser(parent,args){
          console.log('Successfully connected to MongoDB');
            query={emailid:args.emailid};
            await loginpage.find(query,
                (err,result)=>{
                    if(err){
                        //throw err;
                        console.log(err,"Error");
                    }
                    if(result.length > 0){
                        console.log("user already exists");
                        return(null, { status: 401, result });
                    }
                    else{
                    
                        bcrypt.hash(args.password,saltRounds,(err,hash) =>{
        
                                    if(err){
                                        console.log(err);  
                                    }
                                    const newUser=args;
                                    const login= new loginpage({
                                            name:args.name,
                                            password:hash,
                                            emailid: args.emailid,
                                          })
                                          
                                          try{
                                            const a1=login.save()
                                          
                                            
                                            console.log("User Signup Successful");
                                            console.log(login);
                                            return login 

                                          }
                                          catch(err){
                                            console.log(err, "Database Error");
                                          }
                    })
                    
                }
            });

        },
        async addShop(_,{shopname,id}){
            const shop=shopname;
            const uid=id;
            const result=loginpage.findOneAndUpdate({_id:uid},{shopname:shop})
            if(result){
            console.log(result);
            return true;
            }
        },
        async addCart(_,args)
        {
          filter={cuser_id:args.cuser_id,
            cproduct_id:args.cproduct_id};
            updatec={
              cuser_id:args.cuser_id,
              cproduct_id:args.cproduct_id,
              
              quantity:args.quantity
            }
            const result=await cart.updateOne(filter,
                {$setOnInsert:updatec},{upsert:true},)
                
             if(result){
               console.log(result);
               return true;

             }else{
               return false;
             }


        },
        async addProduct(_,args){
          const productname=args.productname;
          const price=args.price;
          const category=args.category;
          const image=args.image;
          const description=args.description;
          const count=args.count;
          const id=args.id;
          const shopname=args.shopname;
          const result= new products({
            productname,
            price,
            category,
            image,
            description,
            count,
            shopname,
            id,
          });
          try{
            result.save()
            return result;
          }catch(err){
            throw err;
          }
        }
      }
    }
    module.exports=resolvers