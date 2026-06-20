const express = require("express");
let {books} = require("../data/books.json");
let {users} = require("../data/users.json")
// let {issuedBook}=require("../data/users.json");
const router1=express.Router();
/**
 * Route: /books
 * Method:GET
 * Description: Get all the list of books in the system
 * Access: Public
 * Parameters:none
 */
router1.get("/",(req,res)=>{
    res.status(200).json({
        success: true,
        data: books
    })
})
/**
 * Route: /books/:id
 * Method:GET
 * Description: Get a user by his id
 * Access: Public
 * Parameters:id
 *  */
router1.get("/:id",(req,res)=>{
    const {id} = req.params;
    const user1 = books.find((each)=>each.id===id)
    if(!user1){
        return res.status(200).json({
            success:false,
            data: `Book not found: ${id}`
           
        })
    }
    res.status(200).json({
        success: true,
        data: user1
    })
})
/**
 * Route: /books
 * Method:POST
 * Description: post a user
 * Access: Public
 * Parameters:none
 *  */
    //   "id": "3",
    //   "name": "Hamlet",
    //   "author":"Shakespierre",
    //   "price":"400",
    //   "publisher":"Zenon"
router1.post("/",(req,res)=>{
 const{id,name,author,price,publisher}=req.body;
 if(!id||!name||!author||!price||!publisher){
   return res.status(404).json({
    success:false,
    message:"You didn't share any details"
   })
 }
 const user2 = books.find((each)=>each.id===id)
 if(user2){
    return res.status(404).json({
        success:false,
        message:"id already exists"
    })
 }
 books.push({id,name,author,price,publisher})
 res.status(200).json({
    success:true,
    message:"Data added successfully"
 })
})
/**
 * Route: /books/:id
 * Method:PUT
 * Description: update a book
 * Access: Public
 * Parameters:id
 *  */
router1.put("/:id",(req,res)=>{
   const {id}=req.params;
   const {data}=req.body;
   const users4 = books.find((each)=>each.id===id);
   if(!users4){
    return res.status(404).json({
        success:false,
        message:"User does not exist"
    })
   }
   books = books.map((each)=>{
    if(each.id==id){
        return {
            ...each,
            ...data,
        }
    }
    return each
   })
   return res.status(200).json({
    success:true,
    message:"Task done successfully"
   })
})
/**
 * Route: /books/:id
 * Method:DELETE
 * Description: delete a book
 * Access: Public
 * Parameters:id
 **/
router1.delete("/:id",(req,res)=>{
    const {id} = req.params 
    const users5 = books.find((each)=>each.id==id)
       if(!users5){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    books = books.filter((each)=>each.id!==id)
    return res.status(200).json({
        success:true,
        message:"task executed successfully"
    })
})
/**
 * Route: /books/issued/for-users
 * Method:GET
 * Description: Get issuedbooks
 * Access: Public
 * Parameters:none
 *  */
router1.get("/issued/for-user",(req,res)=>{
    let issuedBooksArray=[];
    
    users.forEach((each)=>{
        let book = books.find((each1)=>each1.id===each.issuedBook);
        if(book){
           issuedBooksArray.push({
            ...book,
            issuedBy: each.name,
            issuedDate: each.issuedDate,
            returnDate: each.returnDate
        })
        }
        
    })  
    if(issuedBooksArray.length==0){
        return res.status(404).json({
            success:true,
            message:"No books were issued"
        })
    }
    return res.status(200).json({
        sucess:true,
        message:"task executed successfully",
        result: issuedBooksArray
    })
})
/**
 * Route: /books/issued/for-users
 * Method:GET
 * Description: Get subscription details of a user by their id
 * Access: Public
 * Parameters:none
 *  */
router1.get("/subscription-recieve/:id",(req,res)=>{

    const user = users.find((each)=>each.id === req.params.id);

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }


    const getDateInDays = (data="")=>{

        let date;

        if(data){
            date = new Date(data);
        }
        else{
            date = new Date();
        }

        return Math.floor(date/(1000*60*60*24));
    }


    const subscription = (date)=>{

        if(user.subscriptionType==="Basic"){
            date = date + 90;
        }
        else if(user.subscriptionType==="Standard"){
            date = date + 180;
        }
        else{
            date = date + 365;
        }

        return date;
    }


    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);

    let subscriptionExpiration = subscription(subscriptionDate);


    const data = {

        ...user,

        subscriptionExpired:
        subscriptionExpiration < currentDate,


        subscriptionDaysLeft:
        subscriptionExpiration - currentDate,


        daysLeftForExpiration:
        returnDate - currentDate,


        returnDate:
        returnDate < currentDate 
        ? "Book is overdue" 
        : returnDate,


        fine:
        returnDate < currentDate
        ? subscriptionExpiration <= currentDate 
            ? 200 
            : 100
        : 0

    };


    res.status(200).json({
        success:true,
        data:data
    });

});
module.exports=router1;