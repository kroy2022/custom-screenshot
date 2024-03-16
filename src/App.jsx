import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [currentImage, setCurrentImage] = useState('');
  const [formData, setFormData] = useState({
    url: '',
    format: '',
    no_ads: '',
    no_cookie_banners: '',
    width: '',
    height: ''
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  }

  const handleData = () => {
    axios.get(`https://api.apiflash.com/v1/urltoimage?access_key=c22ed71eda374b3c85b99183a0070ba8&url=${formData.url}&format=${formData.format}&no_ads=${formData.no_ads}&no_cookie_banners=${formData.no_cookie_banners}&width=${formData.width}&height=${formData.height}`)
    .then(response => {
      console.log(response);
      setCurrentImage(response);
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <>
      <div className="container">
        <h1>Build Your Own Screenshot! 📸</h1>   
        <h2>Select Your Image Attributes</h2>

        <div className='first-row'>
          <div className="attribute">
            <h2>url</h2>
            <input 
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder='Input this attribute'/>
            <p>Input a link to any website you would like to take a screenshot of, do not worry about including https or any protocol</p>
          </div>

          <div className="attribute">
            <h2>format</h2>
            <input 
            name="format"
            value={formData.format}
            onChange={handleInputChange}
            placeholder='Input this attribute'/>
            <p>Input which image format you would prefer for your screenshot: jpeg, png, or webp</p>
          </div>

          <div className="attribute">
            <h2>no_ads</h2>
            <input
            name="no_ads"
            value={formData.no_ads}
            onChange={handleInputChange}
            placeholder='Input this attribute'/>
            <p>Input true or false if you would like your website screenshot to not contain any ads</p>
          </div>
        </div>
        <div className='second-row'>
        <div className="attribute">
            <h2>no_cookie_banners</h2>
            <input 
            name="no_cookie_banners"
            value={formData.no_cookie_banners}
            onChange={handleInputChange}
            placeholder='Input this attribute'/>
            <p>Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners</p>
          </div>

          <div className="attribute">
            <h2>width</h2>
            <input 
            name="width"
            value={formData.width}
            onChange={handleInputChange}
            placeholder='Input this attribute'/>
            <p>Choose the width of your screenshot (in pixels)</p>
          </div>

          <div className="attribute">
            <h2>height</h2>
            <input 
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            placeholder='Input this attribute'/>
            <p>Choose the height of your screenshot (in pixels)</p>
          </div>
        </div>
        <button onClick={handleData} className="take-pic">Take That Pic!</button>
        {currentImage ? (
          <img className='screenshot' src={currentImage.config.url}/>
        ) : (
          <div>No Image</div>
        )}
      </div>
    </>
  )
}

export default App

