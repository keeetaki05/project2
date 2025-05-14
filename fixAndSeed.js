const mongoose = require('mongoose');
const Listing = require('./models/listing'); // Adjust path if your model is elsewhere
const data  = require('./init/data');

mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log("Connection Error:");
    console.log(err);
  });

const seedDB = async () => {
  await Listing.deleteMany({});

  const fixedListings = data.data.map(listing => {
    if (listing.image) {
      listing.images = [listing.image]; // move image into images[]
      delete listing.image; // remove old image field
    }
    return listing;
  });

  await Listing.insertMany(fixedListings);
  console.log("DB seeded with fixed listings");
};

seedDB().then(() => {
  mongoose.connection.close();

});