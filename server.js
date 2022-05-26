//require express
const express =require("express")
// require data
const getData = require("./Contoller/getData");
// call getData
const productsData = getData();
console.log(productsData)

// create an instance of express
const app = express();
const PORT = 3000;

// Middleware functions
// they update the request as soon as they come in.
app.use((req, res, next) => {
    console.log(`Running middleware function!!!`);
    next(); // got to the next middleware or to the response
  });
  // JSON Middleware
  app.use(express.json())
  // if we dont need to read data from the url 
  app.use(express.urlencoded({extended: false}))
  
  
  // Setup view engine
  app.set("view engine", "ejs");
  app.set("views", "./Views");
  
 //Welcome route
  app.get("/", (req, res) => {
    res.render("home", {
      pageTitle: "Home Page",
      pageHeader: "Welcome to Our shop",
      data: productsData,
    });
  });

//product route
app.get("/products", (req,res)=>{
    res.render("products", { 
        pageTitle: "Shop Products Page",
        pageHeader: "Products Page",
       data: productsData,
    })
})
//New Product route
app.get("/products/new", (req,res)=>{
    res.render("newProducts",{
        pageTitle: "New Products Page",
        pageHeader: " New Products Page",
    })
})
//Product id route
app.get("/products/:id", (req,res)=>{
    res.render("id",{
        pageTitle: "ID Products Page",
        pageHeader: "ID Products Page",
        data: productsData,
    })
})
//post new fruit
app.post("/products/new", (req,res)=>{
    console.log(req.body)
})

// App Listener
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });