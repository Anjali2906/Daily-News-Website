
import React, { Component } from 'react'

export class NewsItem extends Component {
    
  

  render() {
   let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0'
          }}>

        <span class=" badge rounded-pill bg-danger">{source}</span>
          </div>
  <img src={!imageUrl?'https://images.hindustantimes.com/tech/img/2022/07/05/1600x900/SPACE-STATION-0_1637068927223_1657013671960.JPG':imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()} </small></p>
    <a href={newsUrl} rel="noreferrer" target="_blank"className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem