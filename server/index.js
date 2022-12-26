const { Configuration, OpenAIApi } = require("openai");

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173'
}));


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });  
const openai = new OpenAIApi(configuration);

//console.log(process.env.OPENAI_API_KEY);

// const ans = async function(){
//     const result = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: 
//         `input: Image tiles component for ecommerce clothing in orange
//         output: {"theme": "ecommerce clothing", "colorScheme": "orange", "component": {"type":"imageTiles",  "image":"yes", "content":[{"title": "Your one-stop shopping destination", "body":"This year, delve into our all-new summer styles collection that will shelter you from all elements, rain or shine."}]}}
        
//         input: Vertical card for fintech blog with no image
//         output: {"theme": "fintech", "component" : {"type": "singleCard", "style": "vertical", "image": "no", "content":[{"title":"What is an invoice?", "body":"An invoice is a crucial aspect of bookkeeping for a business. Read this blog post to know what is an invoice and get free editable templates for your business."}]}}
        
//         input: Grid of horizontal cards for multiple food items with images
//         output: {"theme": "food", "component": {"type": "gridCard", style: "horizontal","content": [{"title": "Cheesecake", "body":"Creamy, moist cheesecake with your choice of toppings"}, {"title":"Tomato Soup", "body":"Sun-dried tomatoes blended into a perfect, spicy puree"}]}}
        
//         input: Grid of vertical cards for clothes no image
//         output: {"theme": "clothing", "component": {"type": "gridCard", "style": "vertical", "image": "no", "content": [{"title": "Women's Denim Shirt", "body":"A classic denim shirt that is versatile and comfortable"}, {"title":"Men's Cotton Polo", "body":"A lightweight, breathable polo shirt made of 100% cotton"}]}}
        
//         input: Hero section for virtual healthcare with image`,
//         temperature: 0.7,
//         max_tokens: 256,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//       });

//       console.log(result.data);

//       return result.data
// }

// const output = ans().choices;

// console.log(output);

// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!", response: ans() });
//   });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


app.get("/api", async function (req, res) {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(),
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["input"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
});
  
  /* Stop sequence indicates that genereation will stop at A [i,e, A slide... will not be generated again] */
  function generatePrompt() {
    // const capitalizedAnimal =
    //   animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    //return `Input: A slide deck with 2 slides. First slide is a headline type slide with background image of a graph, background colour white and title "Dijkstra's Algorithm". Second slide is a content type slide with body "Dijkstra's algorithm - is a solution to the single-source shortest path problem in graph theory. It works on both directed and undirected graphs." Output: {"slideNum": "2", "slides":[{"type":"headline",  "bgImage":"graph", "bgColor":"white", "title":"Dijkstra's Algorithm"}, {"type":"content", "body": "Dijkstra's algorithm - is a solution to the single-source shortest path problem in graph theory. It works on both directed and undirected graphs."}]}  Input: A slide deck with 1 slide.  First slide is a headline type slide with title "Characteristics of DBMS", background colour of gradient green and byline "A-HK" Ouput: {"slideNum": "1", "slides":[{"type":"headline", "bgColor":"gradient-green", "title":"Characteristics of DBMS", "byline":"A-HK"}]} Input: ${animal} Output: `;
    return `input: Image tiles component for ecommerce clothing in orange
        output: {"theme": "ecommerce clothing", "colorScheme": "orange", "component": {"type":"imageTiles",  "image":"yes", "content":[{"title": "Your one-stop shopping destination", "body":"This year, delve into our all-new summer styles collection that will shelter you from all elements, rain or shine."}]}}
        
        input: Vertical card for fintech blog with no image
        output: {"theme": "fintech", "component" : {"type": "singleCard", "style": "vertical", "image": "no", "content":[{"title":"What is an invoice?", "body":"An invoice is a crucial aspect of bookkeeping for a business. Read this blog post to know what is an invoice and get free editable templates for your business."}]}}
        
        input: Grid of horizontal cards for multiple food items with images
        output: {"theme": "food", "component": {"type": "gridCard", style: "horizontal","content": [{"title": "Cheesecake", "body":"Creamy, moist cheesecake with your choice of toppings"}, {"title":"Tomato Soup", "body":"Sun-dried tomatoes blended into a perfect, spicy puree"}]}}
        
        input: Grid of vertical cards for clothes no image
        output: {"theme": "clothing", "component": {"type": "gridCard", "style": "vertical", "image": "no", "content": [{"title": "Women's Denim Shirt", "body":"A classic denim shirt that is versatile and comfortable"}, {"title":"Men's Cotton Polo", "body":"A lightweight, breathable polo shirt made of 100% cotton"}]}}
        
        input: Hero section for virtual healthcare with image
        output: `
  }
  