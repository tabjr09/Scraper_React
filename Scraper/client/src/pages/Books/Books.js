import React, { Component } from "react";
//import Jumbotron from "../../components/Jumbotron";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Books extends Component {
  // Setting our component's initial state
  state = {
    articles: [],
    savedarticles: [],
    topic: "",
    startyear: "",
    endyear: ""
  };

  // When the component mounts, load all books and save them to this.state.books
  // componentDidMount() {
  //   this.loadSavedArticles();
  // }

  // Loads all books  and sets them to this.state.books
  // loadSavedArticles = () => {
  //   API.getArticles()
  //     .then(res =>
  //       this.setState({ books: res.data, title: "", author: "", synopsis: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  loadSavedArticles = () => {
    API.getArticles('/api/articles')
    .then(res => {
      this.setState({
        savedarticles: [...res.data]})
    });
  }

  // Deletes a book from the database with a given id, then reloads books from the db
  // saveArticle = event => {
  //   API.saveArticle()
  //     .then(res => this.loadSavedArticles())
  //     .catch(err => console.log(err));
  // };


  saveArticle = article => {

   // console.log(article);

    const articledata = {
      title: article.headline.main,
      url: article.web_url
    }
    console.log(articledata);
    API.saveArticle(articledata)
    .then(res => {
      console.log(res.data);
      this.setState({
        savedarticles: [...res.data.response.docs]
      })
      console.log(this.state.savedarticles);
    }).catch(err => console.log(err));

  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  };


  // Add code here to get all articles from the database and save them to this.state.articles
  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    var title = this.state.topic;
    var startdate = this.state.startyear;
    var enddate = this.state.endyear;

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?api-key=c99978dcc0cf4eb0b19aa18ef185cb9f';

    if (title !== "") {
      url += '&q=' + title;
    }

    if (startdate !== "") {
      url += '&begin_date=' + startdate;
    }

    if (enddate !== "") {
      url += '&end_date=' + enddate;
    }
    API.getArticles(url)
      .then(res => {
        console.log(res.data);
        this.setState({
          articles: [...res.data.response.docs]
        })
        console.log(this.state.articles);
      }).catch(err => console.log(err));


  };

  render() {
    return (
      <Container fluid>
        <br /><br />
        <Row>
          <Col size="md-8">
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startyear}
                onChange={this.handleInputChange}
                name="startyear"
                placeholder="Start Date (YYYYMMDD required)"
              />
              <Input
                value={this.state.endyear}
                onChange={this.handleInputChange}
                name="endyear"
                placeholder="End Date (YYYYMMDD Optional)"
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.startyear)}
                onClick={this.handleFormSubmit}
              >
                Search NYT
              </FormBtn>
            </form><br/>

            {this.state.articles.length ? (
              <List>
              {this.state.articles.map(article => {
                return (
                  <ListItem key={article._id}>
                    <h3>{article.headline.main}</h3>
                    <p>{article.web_url}</p>
                    <p>{article.pub_date}</p>
                    <TextArea/>
                    <SaveBtn onClick={() => this.saveArticle(article)} />             
                  </ListItem>
                );
              })}
            </List>
            ) : (
            <h3>No Results to Display</h3>
            )}

            {this.state.savedarticles.length ? (
              <List>
              {this.state.savedarticles.map(article => {
                return (
                  <ListItem title={article.title}>

                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                );
              })}
            </List>
            ) : (
            <h3>No Saved Articles to Display</h3>
            )}

          </Col>

        </Row>
      </Container>
    );
  }
}

export default Books;











