import {Component} from 'react'
import BlogItem from '../BlogItem'
import Header from '../Header'
import './index.css'

class Blogs extends Component {
  state = {
    blogData: [],
  }

  componentDidMount() {
    this.getBlogData()
  }

  getBlogData = async () => {
    const response = await fetch(
      'https://sai-nodejs-finance.herokuapp.com/blog/',
    )
    const data = await response.json()
    this.setState({blogData: data})
    console.log(data)
  }

  render() {
    const {blogData} = this.state
    return (
      <>
        <Header />
        <div className="blogs-container">
          <div className="blogs-section">
            {blogData.map(eachBlog => (
              <BlogItem itemData={eachBlog} key={eachBlog.id} />
            ))}
          </div>
        </div>
      </>
    )
  }
}
export default Blogs
