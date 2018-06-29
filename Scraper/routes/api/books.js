const router = require("express").Router();
const booksController = require("../../controllers/booksController");

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const APIKEY = "c99978dcc0cf4eb0b19aa18ef185cb9f";


// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

  // router.get("/articles", (req, res) => {
  //   axios
  //     .get(BASEURL +{ params: req.query } + APIKEY)
  //     .then(({ data: { results } }) => res.json(results))
  //     .catch(err => res.status(422).json(err));
  // });
  
// router.get("/articles", (req, res) => {
//   console.log("router.get called");
//   var url = BASEURL;
//   url += '?' + $.param({
//     'api-key': APIKEY,
//     'q': req.q,
//     'begin_date': req.begin_date,
//     'end_date': req.end_date
//   });
//   axios
//   .get({url: url})
//   //.then(({ data: { results } }) => res.json(results))
//   .then(console.log(url))
//   .catch(err => res.status(422).json(err));
// });


router.get("/articles", (req, res) => {

axios.get({
  url: BASEURL,
  qs: {
    'api-key': APIKEY,
    'q': req.q,
    'begin_date': req.begin_date,
    'end_date': req.end_date
  },
}).then(({ data: { results } }) => console.log(results))
  .catch(err => res.status(422).json(err));

});
module.exports = router;


