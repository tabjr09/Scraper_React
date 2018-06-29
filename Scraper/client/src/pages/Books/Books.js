import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import SaveBtn from "../../components/SaveBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Books extends Component {
  // Setting our component's initial state
  state = {
    articles: [],
    topic: "",
    startyear: "",
    endyear: ""
  };

  // When the component mounts, load all books and save them to this.state.books
  // componentDidMount() {
  //   this.loadSavedArticles();
  // }

  // Loads all books  and sets them to this.state.books
  loadSavedArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  saveArticle = id => {
    API.saveArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

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
                    <SaveBtn onClick={() => this.saveArticle(article._id)} />
                  </ListItem>
                );
              })}
            </List>
            ) : (
            <h3>No Results to Display</h3>
            )}

          </Col>

        </Row>
      </Container>
    );
  }
}

export default Books;











