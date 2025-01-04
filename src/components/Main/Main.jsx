import React from 'react'
import './Main.css'
import {assets} from '../../assets/assets2/assets'
import {context} from '../../context/context'
import {useContext} from 'react'
import {useState} from 'react'

const Main = () => {

    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(context)

  return (
    <div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>

        <div className="main-container">

            {
                !showResult ? 
                <>

            <div className="greet">
                <p><span>Hello, Dev</span></p>
                <p>How can I help You today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautigul places to see on an upcoming road trip </p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, qui? </p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, tempore. </p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, architecto? </p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
                </>
                :
                <div className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>

                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading ? 
                        <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>
                        :
                        <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                    </div>
                </div>
            }


            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" onChange={(e) => setInput(e.target.value)} value = {input} placeholder='Enter prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="" /> : null} 
                    </div>
                </div>

                <div className="bottom-info">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate sit quas inventore.
                </div>
            </div>

        </div>
    </div>
  )
}

export default Main