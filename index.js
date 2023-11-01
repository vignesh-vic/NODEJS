const express =require("express");
const bodyParser=require('body-parser')
const app = express();
app.use(bodyParser.json({type:'application/json'}))
//100-message
//200-sucess
//300-redirect
//400-client side error
//500-sever side error

let storedb=[]
//GET
app.get("/get",async(_,res)=>{
    try{
        res.status(200).send({message:'Get method run sucessfully',data:storedb})

    }
    catch(error){
      res.status(500).send({message:"server side error"})
    }
});

//post
app.post("/post",async(req,res)=>{
    try{
        // console.log(req.body);
    const { names=[] }=req.body;
    if (!Array.isArray(names) || names.length === 0) {
        return res.status(400).send({ message: "An array of names is required" });
    }
    // seprate the names to the storedb array
    storedb = [...names]
    return res.status(200).send({ message: "array inserted successfully" });
}
    catch(error){
     return   res.status(500).send({message:"server side error"})
    }
});


// PUT
app.put("/put", async (req, res) => {
    try {
        const { updatedNames = [] } = req.body;
        if (!Array.isArray(updatedNames) || updatedNames.length === 0) {
            return res.status(400).send({ message: "An array of names is required" });
        }
        // Replace the contents of storedb with the new array
        storedb = [...updatedNames];
       return res.status(200).send({ message: "Array updated successfully" });
    } catch (error) {
        return res.status(500).send({ message: "Server-side error" });
    }
});

// Patch
app.patch("/my", async (req, res) => {
    try {
        const { previousName, updateName } = req.body;

        if (!previousName || !updateName) {
            return res.status(400).send({ message: "Both previousName and updateName are required" });
        }
        const index = storedb.indexOf(previousName);
        if (index !== -1) {
            storedb.splice(index,1,updateName);
            
           // storedb[index]=updateName
            console.log("Updated storedb:", storedb); // Log the updated array
            return res.status(200).send({ message: "Array updated successfully" });
        } else {
            return res.status(404).send({ message: "Previous name not found in the array" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Server-side error" });
    }
});

// delete
app.delete("/delete", async (req, res) => {
    try {
        const {deletedName} = req.body;
        if (!deletedName ) {
            return res.status(400).send({ message: "deletedName is required" });
        }
        const index = storedb.indexOf(deletedName);
        if (index !== -1) {
            storedb.splice(index,1);
            console.log("deleted name is:", deletedName); // Log the updated array
            return res.status(200).send({ message: "deleted  successfully" });
        } else {
            return res.status(404).send({ message: "name not found in the array" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Server-side error" });
    }
});





app.listen(5000,()=>{
    console.log('50000 server running')
});