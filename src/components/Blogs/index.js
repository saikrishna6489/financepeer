import {Component} from 'react'
import BlogItem from '../BlogItem'
import './index.css'

class Blogs extends Component {
  state = {
    error: false,
  }

  data = []

  componentDidMount() {}

  render() {
    return (
      <div className="blogs-container">
        <div className="blogs-section">
          {this.data.map(eachBlog => (
            <BlogItem itemData={eachBlog} />
          ))}
        </div>
      </div>
    )
  }
}
export default Blogs
