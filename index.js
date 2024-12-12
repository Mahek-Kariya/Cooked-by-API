import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs", {recipe : null});
});

app.get("/random-recipe", async(req,res) => {
  try{
    const response = await axios.get("https://api.spoonacular.com/recipes/random", {
      params:{
        apiKey: "000acb8ccd8743479d975c9c86a49f4d",
        number: 1,
      }
    });
    res.render("index.ejs",{recipe : response.data.recipes[0]});
  }
  catch(error){
    res.status(500).send('Error fetching recipe data');
  }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
  