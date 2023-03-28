const { Configuration, OpenAIApi } = require("openai");

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

require('dotenv').config();

/* 5173 default port of local Vite React App */
const cors = require('cors');
app.use(cors({
    origin: process.env.LEKHAK_FRONTEND_URL
}));

/* bodyParser package required for obtaining body of post requests in express */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });  
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("Running Express API");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


app.post("/api", async function(req, res){
    console.log(req.body);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
     // prompt: generatePrompt(req.body.component),
      prompt: generatePrompt(req.body.component, req.body.componentType.value),
      temperature: 0.7,
      max_tokens: 400,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: [`\n`],
    });
 
    res.status(200).json({ result: completion.data.choices[0].text });
    //res.status(200).json({ result: `{"theme": "open source databases", "colorScheme": "teal", "component": {"type": "VerticalCardComponent", "image": true, "content":[{"title":"MySQL", "body":"MySQL is a popular open source relational database management system (RDBMS). It is used to store and manage data, and is often used in web applications and websites.", "callsToAction" : ["Learn More", "Download"]}, {"title":"PostgreSQL", "body":"PostgreSQL is an open source object-relational database system. It is used to store and manage data, and is often used in web applications and websites.", "callsToAction" : ["Learn More", "Download"]}, {"title":"MongoDB", "body":"MongoDB is a popular open source NoSQL database. It uses a document-oriented approach to store and manage data, and is often used in web applications and websites.", "callsToAction" : ["Learn More", "Download"]}]}}` });
    console.log(completion.data.choices[0].text);

});
  
  /* Stop sequence indicates that generation will stop at A [i,e, A slide... will not be generated again] */
  function generatePrompt(component, componentType) {
    //const component = `Grid of horizontal cards for multiple personal tech projects with images`;
    const capitalizedComponent =  component[0].toUpperCase() + component.slice(1).toLowerCase();
 
    let promptExample = ``;
    let completionExample = ``;
    switch(componentType) {
          case "HorizontalCardComponent":
            promptExample = `Grid of horizontal cards for vacation rentals, green`;
            completionExample = `{"theme": "vacation rental", "colorScheme": "green", "component": {"type": "HorizontalCardComponent", "image": true, "content":[{"title":"Beach House", "body":"Beach houses are perfect for a relaxing getaway. They offer stunning views of the ocean and provide easy access to the beach.", "callsToAction" : ["Book Now", "Learn More"]}, {"title":"Mountain Cabin", "body":"Mountain cabins are great for those who love outdoor activities like hiking, skiing, and snowboarding. They offer beautiful views of the mountains and are often situated near ski resorts.", "callsToAction" : ["Book Now", "Learn More"]}, {"title":"City Apartment", "body":"City apartments are perfect for those who want to be in the heart of the action. They offer easy access to restaurants, bars, and shopping, and are often located in vibrant neighborhoods.", "callsToAction" : ["Book Now", "Learn More"]}]}}`;
            break;
          case "VerticalCardComponent":
            promptExample = `Grid of vertical cards for food items, purple`
            completionExample = `{"theme": "food item", "colorScheme": "purple", "component": {"type": "VerticalCardComponent", "image": true, "content":[{"title":"Nasi Lemak", "body":"Nasi Lemak is a fragrant rice dish cooked in coconut milk and pandan leaf. It is served with a variety of side dishes like hard-boiled eggs, fried anchovies, peanuts, cucumber slices and spicy sambal.", "callsToAction" : ["View Recipe", "Learn More"]}, {"title":"Bibimbap", "body":"Bibimbap is a Korean dish made of warm white rice topped with vegetables, beef, an egg, and gochujang (chili pepper paste). It is typically served with a bowl of soup or kimchi on the side.", "callsToAction" : ["View Recipe", "Learn More"]}, {"title":"Pav Bhaji", "body":"Pav Bhaji is a fast food dish from India, consisting of a thick vegetable curry served with a soft bread roll. It is typically cooked with potatoes, tomatoes, onions, peas, bell peppers, and spices, and garnished with cilantro, chopped onions, and a wedge of lemon.", "callsToAction" : ["View Recipe", "Learn More"]}]}}`;
            break;
          case "HeroSectionComponent":
            promptExample = `Create a hero section for a food delivery website, orange in colour`;
            completionExample = `{"theme": "food delivery", "colorScheme": "orange", "component": {"type": "HeroSectionComponent", "image": true, "content": [{"title": "Order delicious food today", "body":  "Choose from a wide range of cuisines and tasty dishes. Our team of chefs will ensure that you get the best quality food delivered right to your doorstep.", "topTag": "Tasty Food Delivered", "nav": ["Order Now", "Menu", "Offers", "About Us"], "callsToAction": ["Get Started", "See Trending Dishes"]}]}}`;
            break;
          case "ModalComponent":
            promptExample = `Modal for deleting a file, red`;
            completionExample = `{"theme": "delete", "colorScheme": "red", "component": {"type": "ModalComponent", "image": true, "content": [{"title": "Delete File", "body": "Are you sure you want to delete this file? This action cannot be undone.", "options": ["Delete", "Cancel"]}]}}`;
            break;
          case "FeaturesSectionComponent":
            promptExample = `Features Section for sustainable fashion brand, amber`;
            completionExample = `{"theme": "Sustainable Fashion", "colorScheme": "amber", "component": {"type": "FeaturesSectionComponent", "image": true, "content":[{"header": "Look good, feel good, do good", "subHeader": "Our sustainable fashion brand offers stylish and affordable clothing that is good for both you and the planet. Join us in making a positive impact today!", "featureBlocks": [{"title" : "Eco-Friendly Materials", "titleDesc": "We use only eco-friendly materials in our clothing to reduce our environmental impact and promote sustainability. Our fabrics are made from organic cotton, recycled polyester, and other sustainable materials.", "subPoints": [{"id": 0, "point": "Organic Cotton", "pointDesc": "Our organic cotton is grown without the use of harmful pesticides and fertilizers, making it better for the environment and for the farmers who grow it."},{"id": 1,"point": "Recycled Polyester", "pointDesc": "We use recycled polyester made from post-consumer plastic bottles to reduce waste and promote recycling."},{"id": 2,"point": "Sustainable Materials", "pointDesc": "Our clothing is made from other sustainable materials such as Tencel and linen, which require less water and energy to produce."}] },{"title" : "Ethical Production", "titleDesc": "We are committed to ethical production practices and ensuring that our workers are treated fairly and paid a living wage. Our factories are located in countries with strong labor laws, and we work closely with our suppliers to ensure that they meet our ethical standards.", "subPoints": [{"id": 0, "point": "Fair Trade", "pointDesc": "We source our materials from fair trade suppliers who support workers' rights and provide fair wages and working conditions."},{"id": 1, "point": "Sustainable Production", "pointDesc": "Our factories use sustainable production methods to minimize waste and reduce their environmental impact."}] }]}]}}`;
            promptExample = `Features Section for online tutoring service, green`;
            completionExample = `{"theme": "Online Tutoring", "colorScheme": "green", "component": {"type": "FeaturesSectionComponent", "image": true, "content":[{"header": "Transform the way you learn", "subHeader": "Our online tutoring service offers a personalized learning experience with expert tutors, advanced learning tools, and flexible scheduling. Join us and achieve your academic goals today.", "featureBlocks": [{"title" : "Expert Tutors", "titleDesc": "Work with top-rated tutors who specialize in your subject and can help you achieve your academic goals.","subPoints": [{"id": 0, "point": "Personalized Sessions", "pointDesc": "Receive personalized instruction tailored to your unique learning style and needs."},{"id": 1, "point": "Real-time Feedback", "pointDesc": "Get real-time feedback and guidance to help you stay on track and make progress."},{"id": 2, "point": "Flexible Scheduling", "pointDesc": "Schedule sessions at your convenience, whether it's early morning or late at night."}] },{"title" : "Advanced Learning Tools", "titleDesc": "Our platform is equipped with advanced learning tools to help you master the material and improve your performance.","subPoints": [{"id": 0, "point": "Interactive Whiteboard", "pointDesc": "Use our interactive whiteboard to collaborate with your tutor and work through problems together."},{"id": 1, "point": "Practice Problems", "pointDesc": "Access a library of practice problems and quizzes to reinforce your learning."}]}]}]}}`
            break;
          case "DashboardComponent":
            promptExample = `Dashboard for a finance company, blue`;
            completionExample = `{"theme": "finance", "colorScheme": "blue", "component": {"type": "DashboardComponent", "image": false, "content":[{"header": "Welcome, Jane !", "statsTitle" : "Your Financial Overview", "stats": [{"title": "Total Income", "data" : "$50,000"}, {"title": "Total Expenses", "data" : "$30,000"}, {"title": "Net Worth", "data": "$20,000"}], "tableTitle": "Recent Transactions", "actions": [{"id": 1, "name": "Payment Received", "status": "completed", "date": "Feb 28, 2023"}, {"id": 2, "name": "Bill Payment", "status": "completed", "date": "Feb 25, 2023"}, {"id": 3, "name": "Investment", "status": "pending", "date": "Feb 22, 2023"}]}]}}`;
            break;
          case "TestimonialComponent":
            promptExample = `Yellow testimonial for interior design company`;
            completionExample = `{"theme": "Interior Design", "colorScheme": "yellow", "component": {"type": "TestimonialComponent", "image": true, "content": [{"title": "Transformed my home into a masterpiece", "body": "I hired this company to redesign my home and I couldn't be happier with the results. The team was professional and easy to work with, and they really listened to my vision for my home. The end result was a beautifully designed space that exceeded my expectations.", "womanSource": "Samantha Lee", "womanSourcePosition":"Homeowner", "company": "Samantha's Home"}, {"title": "Highly recommend this interior design company", "body": "I've worked with several interior design companies in the past, but this one is by far the best. Their team is creative, knowledgeable, and truly passionate about what they do. They transformed my space into a stunning work of art and I couldn't be happier with the results.", "manSource": "Ryan Davis", "manSourcePosition":"Architect", "company": "Davis Architecture"}]}}`;
            break;
          default:
            promptExample = ``;
            completionExample = ``;
    }
   
    const inputPrompt = `prompt: ${promptExample}
    completion: ${completionExample}
    prompt: ${capitalizedComponent}
    completion:`

    return inputPrompt
  }

  module.exports = app;
  