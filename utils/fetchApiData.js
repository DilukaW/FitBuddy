import dotenv from 'dotenv'
dotenv.config()

  const options = {
    
    headers: {
      'X-RapidAPI-Key': process.env.KEY14,
      'X-RapidAPI-Host': process.env.HOST
    }
  };
  export {options};
 