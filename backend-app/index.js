import express from 'express'
import cors from 'cors'
import multer from 'multer'
import Image from './image.schema.js'
import connectDB from './dbConfig.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // cb(null, '../frontend-app/src/images')     
      cb(null, './uploads')     
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
const app= express()
app.use(cors())
app.use("/uploads",express.static("uploads"))
connectDB();

//should be same name in frontend (upload.single("image"))
app.post('/upload',upload.single("image"), async(req,res)=>{
    console.log(req.body);
  const imgName= req.file.filename;
  try {
    await Image.create({image:imgName})
    res.json({status:"OK"})

  } catch (error) {
    res.json({status:error})
  }
})

app.get('/getimage',async (req, res) => {
  try {
      const imgData = await Image.find({})
      res.status(200).json({status:"ok", data:imgData})

  } catch (error) {
      res.status(500).json({ error: error})
  }
})

app.listen(5000,()=>{
    console.log("App is listening port-5000");
})

