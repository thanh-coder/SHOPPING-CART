var Product = require("../models/product");
var mongoose = require("mongoose");
// mongoose.connect("mongodb://shopping:123456@127.0.0.1:27017/shopping", { useNewUrlParser: true });
mongoose.connect('mongodb://localhost/shopping',{ useNewUrlParser: true });


var products = [
    new Product ({
        imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        title: "Gothic Video Game",
        description: "Awsome Game",
        price: 10
    }),
     new Product ({
        imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        title: "Gothic Video Game",
        description: "Awsome Game",
        price: 10
    }),
      new Product ( {
        imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        title: "Gothic Video Game",
        description: "Awsome Game",
        price: 10
    }),
       new Product ( {
        imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        title: "Gothic Video Game",
        description: "Awsome Game",
        price: 10
    }),
        new Product ( {
        imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        title: "Gothic Video Game",
        description: "Awsome Game",
        price: 10
    }),
         new Product ( {
        imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        title: "Gothic Video Game",
        description: "Awsome Game",
        price: 10
    }),
          new Product ( {
        imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
        title: "Gothic Video Game",
        description: "Awsome Game",
        price: 10
    }),


]

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    })
}

function exit() {
    mongoose.disconnect();
}