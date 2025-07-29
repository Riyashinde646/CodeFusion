const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://shinderiya23jan:riyaa@codefusion.tzn4kgb.mongodb.net/?retryWrites=true&w=majority&appName=CodeFusion');

const projectSchema = new mongoose.Schema({
    title:String,
    createdBy:String,
    date:{
        type:Date,
        default:Date.now,
    },
    htmlcode:{
        type:String,
        default: ' <!DOCTYPE html>\n<html lang="en"><head>\n   <meta charset="UTF-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n <title>Document</title>\n</head>\n<body>\n\n</body>\n</html>'
    },
    cssCode:{
       type: String,
    default: `
    body{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }`
  },
  jsCode: {
    type: String,
    default: 'console.log("Hello World")'
  }
});

module.exports = mongoose.model("Project",projectSchema);