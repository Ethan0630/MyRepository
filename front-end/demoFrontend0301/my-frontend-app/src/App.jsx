import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faSchool, faLocationDot, faArrowUpRightFromSquare, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import TopBox from './components/TopBox';
import Profile from './components/Profile';
import RightContent from './components/rightContent/RightContent.jsx';


function App() {
  const [count, setCount] = useState(0)
  const [backgroundImg, setBackgroundImg] = useState(null); // 🎯 加這個

  useEffect(() => {
    const getBackImg = async () => {
      const response = await fetch("http://3.113.186.54:9060/background/getBackgroundImg");
      const data = await response.json();
      setBackgroundImg(data.base64Img1); // 👈 設定背景 base64
      document.body.style.backgroundImage = `url(${data.base64Img1})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
    };
    getBackImg();
  }, []);
  return (
    <>
      <TopBox />

      {/* 第二個區塊（新的，包含左側長條 + 右側內容） */}
      <div className="container mt-5" id="mainContainer">
        <div className="row justify-content-center">
          <div className="col-10 col-md-8 col-lg-6 d-flex">
            {/* 左側 30% */}
            <Profile />

            {/* <右側 70% */}
            {/* 右側區塊（包含綠色條 + 黃色內容） */}
            <div className="col-8 right-content-wrapper">
              <RightContent />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
