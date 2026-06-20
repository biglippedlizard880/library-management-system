const express = require("express");
let {users} = require("../data/users.json")

const router=express.Router();

//Home Page
// router.get("/",(req,res)=>{
//     res.status(200).send({
//         message:"Task done successfully :-)"
//     })
// })
/**
 * Route: /users
 * Method:GET
 * Description: Get all the list of users in the system
 * Access: Public
 * Parameters:none
 */
router.get("/",(req,res)=>{
    res.status(200).json({
        success: true,
        data: users
    })
})
/**
 * Route: /users/:id
 * Method:GET
 * Description: Get a user by his id
 * Access: Public
 * Parameters:id
 *  */
router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const user1 = users.find((each)=>each.id===id)
    if(!user1){
        return res.status(200).json({
            success:false,
            data: `User not found with for id: ${id}`
           
        })
    }
    res.status(200).json({
        success: true,
        data: user1
    })
})
/**
 * Route: /users
 * Method:POST
 * Description: post a user
 * Access: Public
 * Parameters:none
 *  */
    //   "id": "3",
    //   "name": "Michael",
    //   "surname": "Smith",
    //   "email": "michael.smith@email.com",
    //   "issuedBook": "3",
    //   "issuedDate": "15/03/2023",
    //   "returnDate": "20/03/2023",
    //   "subscriptionType": "Premium",
    //   "subscriptionDate": "10/03/2023"
router.post("/",(req,res)=>{
 const{id,name,surname,email,issuedBook,issuedDate,returnDate,subscriptionType,subscriptionDate}=req.body;
 if(!id||!name||!surname||!email||!issuedBook||!issuedDate||!returnDate||!subscriptionType||!subscriptionDate){
   return res.status(404).json({
    success:false,
    message:"You didn't share any details"
   })
 }
 const user2 = users.find((each)=>each.id===id)
 if(user2){
    return res.status(404).json({
        success:false,
        message:"id already exists"
    })
 }
 users.push({id,name,surname,email,issuedBook,issuedDate,returnDate,subscriptionType,subscriptionDate})
 res.status(200).json({
    success:true,
    message:"Data added successfully"
 })
})
/**
 * Route: /users/:id
 * Method:PUT
 * Description: update a user
 * Access: Public
 * Parameters:id
 *  */
router.put("/:id",(req,res)=>{
   const {id}=req.params;
   const {data}=req.body;
   const users4 = users.find((each)=>each.id===id);
   if(!users4){
    return res.status(404).json({
        success:false,
        message:"User does not exist"
    })
   }
   users = users.map((each)=>{
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
 * Route: /users/:id
 * Method:DELETE
 * Description: delete a user
 * Access: Public
 * Parameters:id
 **/
router.delete("/:id",(req,res)=>{
    const {id} = req.params 
    const users5 = users.find((each)=>each.id==id)
       if(!users5){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    users = users.filter((each)=>each.id!==id)
    return res.status(200).json({
        success:true,
        message:"task executed successfully"
    })
})
module.exports = router;