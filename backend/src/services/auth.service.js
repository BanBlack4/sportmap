import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export async function registerService(data){

   const existingUser =
      await prisma.user.findUnique({
         where:{
            email:data.email
         }
      });

   if(existingUser){
      throw new Error("El usuario ya existe");
   }

   const hashedPassword=
      await bcrypt.hash(data.password,10);

   const user=
      await prisma.user.create({
         data:{
            name:data.name,
            email:data.email,
            password:hashedPassword
         }
      });

   delete user.password;

   return user;
}
export async function loginService(data){

   const user=
      await prisma.user.findUnique({
         where:{
            email:data.email
         }
      });

   if(!user){
      throw new Error(
         "Credenciales inválidas"
      );
   }

   const match=
      await bcrypt.compare(
         data.password,
         user.password
      );

   if(!match){
      throw new Error(
         "Credenciales inválidas"
      );
   }

   const token=
      generateToken(user);

   return{
      token,

      user:{
         id:user.id,
         name:user.name,
         email:user.email,
         role:user.role
      }
   };

}