import React, { useState } from 'react'
import './RightSection.css'
import check from '../assets/check.svg'
import exclamation from '../assets/exclamation.svg'

import axios from 'axios'
import shortid from 'shortid'
import validUrl from 'valid-url'

const RightSection = () => {

    const [longUrl, setLongUrl] = useState()
    const [shortUrl, setShortUrl] = useState()
    const [code, setCode] = useState()
    const [clicks, setClicks] = useState()

    const [availibility, setAvailibility] = useState("Available")
    const [shortVis, setShortVis] = useState()
    const [err1Vis, setErr1Vis] = useState()
    const [clicksVis, setClicksVis] = useState()
    const [err2Vis, setErr2Vis] = useState()
    const [err3Vis, setErr3Vis] = useState()
    const [errMessage, setErrMessage] = useState()

    const updateLongUrl = (e) => {
        setLongUrl(e.target.value)
        const long = e.target.value
        if(long && !validUrl.isUri(long)) {
            console.log(long)
            setErr1Vis("invalid-long")  
            setShortVis("")                
        }
        else {
            setErr1Vis("")             
        }
    }
    
    const updateShortUrl = (e) => {
        setShortUrl(e.target.value)
    }

    const handleShorten = (e) => {
        e.preventDefault()

        if(validUrl.isUri(longUrl)) {
            const getCode = shortid.generate()
            setErr1Vis("")   
            setShortVis("visible")
            setCode(getCode)
        }
        else {
            console.log('Yo')
            setErr1Vis("invalid-long")  
            setShortVis("")                
        }
    }

    const handleSave = async (e) => {

        if(availibility == "Reserved")
            return

        axios.post('/create', {"code": code, "longUrl": longUrl})
        .then(res => setShortUrl(res.data.shortUrl))
        .catch(err => console.log(err.response.data.message))
        .catch(err => console.log(err.message))
    
        const shortUrl = process.env.REACT_APP_BASE_URL + code
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(shortUrl);
        } 
        else {
          return document.execCommand('copy', true, shortUrl);
        }
    
      }

      const updateCode = (e) => {
        setCode(e.target.value)

        if(e.target.value == "") {
            return setAvailibility("Reserved")
            setErr3Vis("")
        }
    
        const searchItem = e.target.value
    
        axios.get('/search', { params: {
          searchItem
        }})
        .then(res => {
            console.log(res.data.message)
            setAvailibility(res.data.message)
            var isValidCode = /^[a-zA-Z0-9-_]+$/;
            if (searchItem.search(isValidCode) === -1) { 
                setErrMessage("Note: The code must include alphanumerals, hyphen or underscore")
                setErr3Vis("show")
            }
            else if(res.data.message == "Reserved") {
                setErrMessage("This code is already reserved")
                setErr3Vis("show")
            }
            else {
                setErr3Vis("")
            }
        })
        .catch(err => console.warn(err));

      }

      const getClicks = (e) => {
        e.preventDefault()
        console.log(shortUrl)
        axios.post('/clicks', {"shortUrl": shortUrl})
          .then(res => {
              console.log("Yo")
              setClicks(res.data.clicks)
              setErr2Vis("")
              setClicksVis("visible2")
          })
          .catch(err => {
            console.log("Hi")
              console.log(err.response.data.message)
              setErr2Vis("visible2")
              setClicksVis("")
            })
          .catch(err => {
            console.log("Hello")
              console.log(err.message)
              setErr2Vis("visible2")
              setClicksVis("")
          })
          console.log(clicksVis)
          console.log(err2Vis)
      }

      const onEnter = (e) => {
        if(e.key === 'Enter' || e.keyCode === 13) 
            getClicks(e)
      }

  return (
    <div className="RightSection">
        <h3 className="description">
            Create the best custom links for all purposes
            and experience greatly improved engagement
        </h3>

        <div>
            <form className="form">
                <input 
                    className="input" 
                    type="text" 
                    id="longurl"
                    autoComplete="off"
                    placeholder="Drop your link here"
                    onChange={updateLongUrl}
                />
                
                <input 
                    className="submit1"
                    id="shorten"
                    type="submit"
                    onClick={handleShorten}
                    value={"</>"}
                />
            </form>                 
        </div>

        <h5 className={err1Vis}>
            Invalid URL. Ensure you enter the full correct URL (including 'https:' ,etc)!
        </h5>

        <div className={"result "+shortVis}>
            <h4 className="shortUrl">
            {process.env.REACT_APP_BASE_URL}
            </h4>
            <input
                className="urlCode"
                type="text"
                id="urlCode"
                autoComplete="off"
                value={code}
                onChange={updateCode}            
            />
            {(availibility == "Available")?<img className="indicator" alt="available" src={check} />:<img className="indicator" alt="available" src={exclamation} />}
        </div>  

        <div className={"save-button "+shortVis}>
            <button 
                className="submit1" 
                id="save"
                onClick={handleSave}
            >
                Save and Copy
            </button> 
        </div>   
        <h5 className={"error3 "+err3Vis}>
            {errMessage}
        </h5>    
        

        <h3 className="description">
            Track the number of clicks for your Teetsy URL
        </h3>

        <div className="form">
            <input 
                className="input" 
                type="text" 
                id="shorturl"
                autoComplete="off"
                placeholder="Drop your link here"
                onChange={updateShortUrl}
                onKeyPress={onEnter}
            />

            <button
                className="submit1"
                id="track"
                onClick={getClicks}
            >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.42262 5.71533C5.43587 5.70575 5.45076 5.69748 5.46706 5.69095C5.49271 5.68069 5.52082 5.67519 5.5496 5.67519C5.57838 5.67519 5.60648 5.68069 5.63214 5.69095C5.65776 5.70121 5.67988 5.71578 5.69768 5.73298L5.698 5.7333L7.6776 7.64355L7.67755 7.6436L7.68403 7.64964C7.70239 7.66674 7.71597 7.68619 7.72494 7.70631L8.18167 7.50285L7.72494 7.70631C7.73388 7.72639 7.73831 7.74728 7.73849 7.76791C7.73868 7.78853 7.73463 7.80943 7.72609 7.82958C7.71753 7.84976 7.70436 7.86933 7.68641 7.88664C7.66841 7.90399 7.64602 7.91865 7.62007 7.92889C7.59409 7.93914 7.56566 7.9445 7.53661 7.94426C7.50755 7.94402 7.47927 7.93818 7.45356 7.92753C7.42789 7.91689 7.40585 7.90192 7.38827 7.88436L7.38832 7.88431L7.38207 7.87827L5.40252 5.96943C5.40251 5.96941 5.40249 5.9694 5.40248 5.96939C5.36691 5.93506 5.35045 5.89247 5.35045 5.85207C5.35045 5.81166 5.36693 5.76905 5.40252 5.73472L5.42262 5.71533ZM15.5994 5.96894L15.5992 5.96913L13.6168 7.87803L13.6167 7.87797L13.6103 7.88436C13.5927 7.90192 13.5707 7.91689 13.545 7.92753C13.5193 7.93818 13.491 7.94402 13.462 7.94426C13.4329 7.9445 13.4045 7.93914 13.3785 7.92889C13.3526 7.91865 13.3302 7.90399 13.3122 7.88664C13.2942 7.86933 13.2811 7.84976 13.2725 7.82958C13.264 7.80944 13.2599 7.78853 13.2601 7.76791C13.2603 7.74728 13.2647 7.72639 13.2737 7.70631C13.2826 7.68619 13.2962 7.66674 13.3146 7.64964L13.3146 7.64969L13.3209 7.64367L15.3004 5.73482C15.3004 5.7348 15.3004 5.73479 15.3005 5.73477C15.3367 5.69988 15.3895 5.67722 15.4483 5.67722C15.5071 5.67722 15.56 5.6999 15.5962 5.73482L15.621 5.75872C15.6283 5.76891 15.6343 5.77953 15.6389 5.79033L15.6492 5.78591L15.6389 5.79033C15.6475 5.81026 15.6516 5.83096 15.6516 5.8514C15.6516 5.87183 15.6475 5.89253 15.6389 5.91246L16.0982 6.1101L15.6389 5.91246C15.6303 5.93244 15.6172 5.9518 15.5994 5.96894ZM11 23.8451V23.8442L11 11.3432L11 11.3425C11 11.3135 11.0083 11.2837 11.026 11.2564C11.0438 11.2289 11.071 11.2044 11.1063 11.1878C11.1418 11.1712 11.1826 11.1642 11.2236 11.1685C11.2645 11.1728 11.3016 11.188 11.331 11.2103L11.3311 11.2105L21.9146 19.2682C21.9147 19.2683 21.9148 19.2684 21.9149 19.2685C21.9469 19.293 21.9673 19.3242 21.9769 19.3558C21.9864 19.3874 21.9856 19.4207 21.9743 19.452C21.9629 19.4837 21.9404 19.5144 21.9064 19.5377C21.8723 19.5611 21.8293 19.575 21.7836 19.575H17.2592H17.2591C16.3897 19.5752 15.5525 19.9082 14.9325 20.5062C14.9325 20.5062 14.9325 20.5062 14.9325 20.5062L11.3485 23.9622L11.3481 23.9626C11.3212 23.9886 11.2848 24.0082 11.2425 24.0164C11.2001 24.0245 11.1564 24.0202 11.1175 24.0047C11.0788 23.9892 11.0487 23.9642 11.0288 23.9355C11.0092 23.9071 10.9999 23.8756 11 23.8451ZM10.5 3.7C10.5588 3.7 10.6117 3.72269 10.6479 3.75762C10.6835 3.79196 10.7 3.83457 10.7 3.875V6.575C10.7 6.61542 10.6835 6.65803 10.6479 6.69237C10.6117 6.7273 10.5588 6.75 10.5 6.75C10.4412 6.75 10.3883 6.72731 10.3521 6.69237L10.005 7.05229L10.3521 6.69237C10.3165 6.65803 10.3 6.61542 10.3 6.575V3.875C10.3 3.83457 10.3165 3.79196 10.3521 3.75762L10.005 3.3977L10.3521 3.75762C10.3883 3.72269 10.4412 3.7 10.5 3.7ZM3.3 10.625C3.3 10.5846 3.31648 10.542 3.35209 10.5076C3.38832 10.4727 3.44121 10.45 3.5 10.45H6.3C6.35879 10.45 6.41168 10.4727 6.44791 10.5076C6.48352 10.542 6.5 10.5846 6.5 10.625C6.5 10.6654 6.48352 10.708 6.44791 10.7424C6.41168 10.7773 6.35879 10.8 6.3 10.8H3.5C3.44121 10.8 3.38832 10.7773 3.35209 10.7424C3.31648 10.708 3.3 10.6654 3.3 10.625Z" fill="white" stroke="black"/>
                </svg>
            </button>
        </div>

        <h5 
            className={"error "+err2Vis}
        >
            No such Teetsy URL found!
        </h5>

        <div className={"result "+clicksVis}>
            <h4 className="clicks">
                Number of Clicks: {clicks}
            </h4>
        </div>  

        
    </div>
  )
}

export default RightSection