import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}-NewsOne`;
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff0b132ba1d94437b3db7a34bc98fd12&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseddata = await data.json();
    this.props.setProgress(70);
    console.log(parseddata);
    this.setState({ articles: parseddata.articles });
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff0b132ba1d94437b3db7a34bc98fd12&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data= await fetch(url);
    // let parseddata=await data.json();
    // console.log(parseddata)
    // this.setState({articles:parseddata.articles})
    // this.setState({articles:parseddata.articles,totalResults:parseddata.totalResults,loading:false})
    this.updateNews();
  }
  nextClick = async () => {
    // if(this.state.page +1> Math.ceil(this.state.totalResults/this.props.pageSize)){

    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  prevClick = async () => {
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff0b132ba1d94437b3db7a34bc98fd12&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true})
    //   let data= await fetch(url);
    //   let parseddata=await data.json();
    //   console.log(parseddata)

    // this.setState({
    //   page:this.state.page-1,
    //   articles:parseddata.articles,
    //   loading:false
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff0b132ba1d94437b3db7a34bc98fd12&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({ articles: parseddata.articles });
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults,
    });
  };
  render() {
    return (
      <>
        <h1
          className="text-center my=3"
          style={{ margin: "35px 0px", marginTop: "55px" }}
        >
          NewsOne- Top Headlines on{" "}
          {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* !this.state.loading && */}
              {this.state.articles.map((element) => {
                return (
                  <div key={element.url} className="col-md-4">
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 20)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>

      /* <div className="conatiner d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.prevClick}> &larr;Previous</button>
          <button disabled={this.state.page +1> Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.nextClick}>Next &rarr;</button>
        </div> */
    );
  }
}

export default News;
