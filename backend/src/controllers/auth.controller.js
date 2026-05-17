import { registerSchema }
from "../validators/auth.validators.js";

import * as authService
from "../services/auth.service.js";

import { asyncHandler }
from "../utils/asyncHandler.js";

import { loginSchema }
from "../validators/auth.validators.js";

export const register=
asyncHandler(async(req,res)=>{

   const validated=
      registerSchema.parse(req.body);

   const user=
      await authService.registerService(
         validated
      );

   res.status(201).json(user);

});
export const login=
asyncHandler(async(req,res)=>{

   const validated=
      loginSchema.parse(req.body);

   const result=
      await authService.loginService(
         validated
      );

   res.json(result);

});