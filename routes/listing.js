const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
    .route("/")
    .get( wrapAsync(listingController.index))
    .post(
        isLoggedIn ,  //userlogincheck
        upload.single('listing[image]'), //multer will process the
        //  data and bring the file to req.file
        validateListing,
        wrapAsync (listingController.createListing)  //then the execution of  
        // creatlisting from listing controller
    );
    

//  New Route
router.get("/new" , isLoggedIn , listingController.renderNewForm);


router
    .route("/:id")
    .get(wrapAsync (listingController.showListing ))
    .put(
        isLoggedIn , 
        isOwner,
        upload.single('listing[image]'),
        validateListing,
         wrapAsync(listingController.updateListing))
    .delete(
        isLoggedIn , 
        isOwner,
        wrapAsync(listingController.destroyListing));





// app.post("/listings", async (req , res , next) => {
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
// });


// Edit route
router.get("/:id/edit" , 
    isLoggedIn , 
    isOwner,
    wrapAsync(listingController.renderEditForm));



module.exports = router;