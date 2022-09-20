import express from 'express' 
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'


const app = express()
app.use(cors())
app.use(express.json())
const port = 3456

const prisma = new PrismaClient()

app.get("/users",async(req,res)=>{})

app.post("/sign-up",async(req,res)=>{
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password),
      },
    });
            res.send(newUser)
})

app.post("/sign-in",async(req,res)=>{
    const signedIn = await prisma.user.findUnique({ where:
        {email:req.body.email}})
    if (signedIn && bcrypt.compareSync(req.body.password,signedIn.password)) {
        res.send("Logged In")
    }else{
        res.status(404).send({message:"Not the right email/password!"})
    }
})

app.listen(port,()=>{
    console.log("server up")
})