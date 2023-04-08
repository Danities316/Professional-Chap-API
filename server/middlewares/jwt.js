import  jwt  from "jsonwebtoken";

export const decode = (req, res, next) => {console.log(req.body)};

export const encode = async (req, res, next) => {console.log(req.body)}