const db = require("../models");
const mongoose = require("mongoose");
const axios = require("axios");

// Defining methods for the booksController
module.exports = {
  getnews: function (req, res) {
    axios
      .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
        params: {
          'api-key': "a68ce5fae7b2464aa8bd4da240dafeb5",
          'q': req.query.topic,
          'begin_date': `${req.query.byear}0101`,
          'end_date': `${req.query.eyear}0101`
        },
      }).then(({ data: { response } }) => {
        //console.log(JSON.stringify(response,null,2))
        res.json(response)
      })
      .catch(err => res.json(err))
  },
  findAll: function (req, res) {
    db.news
      .find(req.query)
      .populate({ path: 'comments', options: { sort: { date: -1 } } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.news
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  postComment: function (req, res) {
    db.comments.create(req.body)
      .then(function (result) {
        db.news.findOneAndUpdate(
          { _id: mongoose.Types.ObjectId(req.params.id) },
          {
            $push: {
              comments: result._id
            }
          }, { new: true })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      })
  },
  remove: function (req, res) {
    db.news
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
