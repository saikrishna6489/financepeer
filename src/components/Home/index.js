import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {
    error: false,
    blogData: [],
    isFileChosen: false,
    isLoading: false,
  }

  sendJsonBlogData = async () => {
    this.setState({isLoading: true})
    const {blogData} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify(blogData),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const response = await fetch('http://localhost:3001/saveblogs/', options)
    const data = await response.json()
    this.setState({isLoading: false})
    console.log(data)
    console.log('received')
  }

  handleChange = event => {
    const fileReader = new FileReader()
    fileReader.readAsText(event.target.files[0], 'UTF-8')
    fileReader.onload = e => {
      let jsonData
      try {
        jsonData = JSON.parse(e.target.result)
        console.log(typeof jsonData)
        this.setState({
          blogData: jsonData,
          isFileChosen: true,
          error: false,
        })
        console.log(jsonData[0])
      } catch (error) {
        console.log(error)
        this.setState({error: true})
      }
    }
  }

  render() {
    const {error, isFileChosen, isLoading} = this.state
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-section">
            <h1>UPLOAD JSON FILE</h1>
            <input
              type="file"
              onChange={this.handleChange}
              accept="application/JSON"
            />
            <br />
            {error && (
              <p className="home-error">please choose the correct json file</p>
            )}
            {isFileChosen && (
              <button
                type="button"
                className="home-submit-button"
                onClick={this.sendJsonBlogData}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader type="Oval" color="white" height="30" width="50" />
                ) : (
                  'Submit'
                )}
              </button>
            )}
          </div>
        </div>
      </>
    )
  }
}
export default Home
