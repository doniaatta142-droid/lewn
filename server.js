const express=require("express"); const cors=require("cors");
const app=express(); const PORT=process.env.PORT||3000;
app.use(cors()); app.use(express.json());
const products=[
{id:1,name:"Luna Handbag",category:"Bags",price:1299,oldPrice:1499,image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",description:"Elegant everyday handbag."},
{id:2,name:"Pearl Glow Necklace",category:"Jewelry",price:599,oldPrice:699,image:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",description:"Minimal pearl necklace."},
{id:3,name:"Classic Gold Watch",category:"Watches",price:1799,oldPrice:1999,image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80",description:"Classic polished gold watch."},
{id:4,name:"Sunset Sunglasses",category:"Sunglasses",price:799,oldPrice:899,image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",description:"Timeless fashion sunglasses."},
{id:5,name:"Velvet Heels",category:"Shoes",price:1499,oldPrice:1699,image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80",description:"Elegant heels for special occasions."},
{id:6,name:"Rose Bracelet",category:"Jewelry",price:449,oldPrice:499,image:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=700&q=80",description:"Delicate feminine bracelet."}];
const categories=["All","Bags","Jewelry","Watches","Sunglasses","Shoes","Other"];
app.get("/api/health",(req,res)=>res.json({success:true,message:"LEWN API is running"}));
app.get("/api/products",(req,res)=>{let r=[...products];if(req.query.category&&req.query.category!=="All")r=r.filter(p=>p.category.toLowerCase()===req.query.category.toLowerCase());if(req.query.search){let q=req.query.search.toLowerCase();r=r.filter(p=>(p.name+" "+p.category).toLowerCase().includes(q));}res.json({success:true,data:r});});
app.get("/api/categories",(req,res)=>res.json({success:true,data:categories}));
app.get("/api/products/:id",(req,res)=>{const p=products.find(x=>x.id===Number(req.params.id));if(!p)return res.status(404).json({success:false,message:"Product not found"});res.json({success:true,data:p});});
app.post("/api/orders",(req,res)=>{if(!req.body.customer||!req.body.items?.length)return res.status(400).json({success:false,message:"Customer and items required"});res.status(201).json({success:true,data:{id:"LEWN-"+Date.now(),...req.body,status:"Pending",createdAt:new Date().toISOString()}});});
app.listen(PORT,()=>console.log("LEWN API: http://localhost:"+PORT));
