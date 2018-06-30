import axios from "axios";

export default {
  //Gets all books
  // getBooks: function() {
  //   return axios.get("/api/books");
  // },
  // // Gets the book with the given id
  // getBook: function(id) {
  //   return axios.get("/api/books/" + id);
  // },
  // // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // Saves an article to the database
  saveArticle: function(articleData) {
    console.log("save article api");
    return axios.post("/api/articles", articleData);
  },
  getArticles: function(articleData) {
    //console.log("get articles");
    //console.log(articleData);
    return axios.get( articleData);
  }

};
