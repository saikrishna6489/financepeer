import {Component} from 'react'
import ReactFileReader from 'react-file-reader'
import './index.css'

class Home extends Component {
  state = {
    error: false,
    errorText: '',
  }

  componentDidMount() {}

  handleFiles = files => {
    console.log(files)
  }

  handleChange = event => {
    const fileReader = new FileReader()
    fileReader.readAsText(event.target.files[0], 'UTF-8')
    fileReader.onload = e => {
      let jsonData
      try {
        jsonData = JSON.parse(e.target.result)
        console.log(typeof jsonData)
        console.log(jsonData[0])
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {
    const {error, errorText} = this.state
    return (
      <>
        <p>sai</p>
        <ReactFileReader handleFiles={this.handleFiles} fileTypes=".json">
          <button className="btn" type="button">
            Upload
          </button>
        </ReactFileReader>
        <h1>Upload Json file - Example</h1>

        <input
          type="file"
          onChange={this.handleChange}
          accept="application/JSON"
        />
        <br />
        {error && <p>{errorText}</p>}
      </>
    )
  }
}
export default Home
