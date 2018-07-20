const router = require("express").Router();
const newsController = require("../../controllers/newsController");

// get search results with "/api/news/getnews"
router.route("/getnews")
  .get(newsController.getnews)

// Matches with "/api/news"
router.route("/")
  .post(newsController.create)
  .get(newsController.findAll);

// Matches with "/api/news/:id"
router.route("/:id")
  .put(newsController.postComment)
  .delete(newsController.remove);

module.exports = router;
