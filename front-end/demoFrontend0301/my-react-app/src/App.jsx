import { Routes, Route, Link } from "react-router-dom";
import ProfilePicComponent from "./components/ProfilePicComponent"; // ✅ 引入新的 Component
import ProjectComponent from "./components/ProjectUpComponent"; // ✅ 引入你的 Component
import CategoryManagement from "./components/CategoryComponent"; // ✅ 引入你的 Component
import ProfileComponent from "./components/ProfileComponent";
import BannerUpComponent from "./components/BannerUpComponents";
import IndustryComponent from "./components/IndustryComponent";
import EditProjectComponent from "./components/EditProjectComponent";
import BackGroundImg from "./components/BackGroundImg";
import "./css/BackStage.css"; // 只引入你的 CSS
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function App() {

  const [gifData, setGifData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://13.115.110.126:9060/pig/gif") // 請確認這是你的後端 URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGifData(data);
      })
      .catch((error) => {
        console.error("載入 GIF 圖片失敗：", error);
      });
  }, []);

  const handleClick = () => {
    navigate("/"); // 這裡假設 / 是登入頁面
  };

  return (
    <div id="root-container"> {/* 確保 React 內部的結構與原始 HTML 相符 */}
      <div id="pig-container" >
        {gifData && (
          <img
            id="pigImg"
            src={gifData.base64img}
            alt="Pig GIF"
            onClick={handleClick}
          />
        )}
      </div>
      <div id="main-container">
        <div id="left-container">
          <Link to="/home/profile-pic" id="proficPic">更新大頭貼</Link>
          <Link to="/home/edit-profile" id="profic">編輯個人資料</Link>
          <Link to="/home/edit-backGroundImg" id="backGround">背景圖片管理</Link>
          <Link to="/home/update-banner" id="banner">更新 Banner</Link>
          <Link to="/home/upload-project" id="project">上傳作品</Link>
          <Link to="/home/edit-project" id="edit-project">編輯作品</Link>
          <Link to="/home/edit-industry" id="edit-industry">產業管理</Link>
          <Link to="/home/edit-category" id="edit-category">類別管理</Link>
        </div>

        <div id="right-container">
          <Routes>
            <Route path="profile-pic" element={<ProfilePicComponent />} />
            <Route path="edit-profile" element={<ProfileComponent />} />
            <Route path="edit-backGroundImg" element={<BackGroundImg />} />
            <Route path="update-banner" element={<BannerUpComponent />} />
            <Route path="upload-project" element={<ProjectComponent />} />
            <Route path="edit-project" element={<EditProjectComponent />} />
            <Route path="edit-industry" element={<IndustryComponent />} />
            <Route path="edit-category" element={<CategoryManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
