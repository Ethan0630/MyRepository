import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { uploadBackImg, fetchBackImg } from "../js/BackGroundImg";
import React, { useState, useRef, useEffect } from "react";
import "../css/BackGroundImg.css"
import { useNavigate } from "react-router-dom";


const backGroundImg = () => {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);


    const fileInputRef = useRef(null);  // 宣告 ref
    const navigate = useNavigate();


    useEffect(() => {
        const getBackImg = async () => {
            const data = await fetchBackImg();
            setImage(data.base64Img1);
            if (data.base64Img1) {
                setImage(data.base64Img1); // 顯示
                const blob = await fetch(data.base64Img1).then(r => r.blob());
                const file = new File([blob], "backImg.jpg", { type: blob.type });
                setFile(file); // ✅ 用來上傳
            }
        }

        getBackImg();
    }, []);

    const handleDivClick = () => {
        fileInputRef.current.click(); // 讓 input 模擬被點擊
    };

    // 📌 允許拖曳
    const handleDragOver = (e) => {
        e.preventDefault(); // 阻止預設行為，允許拖曳
    };

    // 📌 **拖曳放入檔案**
    const handleDrop = (e, setImage, setFile) => {
        e.preventDefault(); // 阻止預設行為
        if (!e.dataTransfer.files.length) return; // 確保有拖曳檔案
        processFile(e.dataTransfer.files[0], setImage, setFile);
    };


    // 📌 **處理 input 變更**
    const handleFileChange = (e, setImage, setFile) => {
        const file = e.target.files[0];
        if (!file) return; // 防止未選擇檔案
        processFile(file, setImage, setFile);
    };

    // 📌 **處理圖片讀取**
    const processFile = (file, setImage, setFile) => {
        if (file.type.startsWith("image/")) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = (setImage, setFile) => {
        setImage(null); // 將圖片狀態設為 null，讓 UI 回到初始狀態
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // ✅ 清空 input 的值
        }
    };

    const handleUploadBackImg = async () => {
        if (!file) {
            alert("請上傳背景圖");
            return
        }
        const result = await uploadBackImg(file);

        if (result === "success") {
            alert("上傳成功");
        } else if (result === "unauthorized") {
            navigate("/"); // ✅ 直接跳回登入畫面
        } else {
            alert("上傳失敗，請稍後再試！");
        }
    }

    return (
        <>
            <div id="backGroung-title">
                <h3>上傳背景圖片</h3>
            </div>
            <div id="backGroundImg">
                <div id="backImg-title">
                    <h4>請選擇圖片</h4>
                </div>
                <div className="title-container">
                    {image && <i className="fa-solid fa-trash" onClick={() => handleDeleteImage(setImage, setFile)}></i>}
                </div>
                <div id="backImg-container"
                    onClick={(() => handleDivClick(fileInputRef))}>

                    <div className="backImg"
                        onDrop={(e) => handleDrop(e, setImage, setFile)}
                        onDragOver={handleDragOver} >
                        {image ? (
                            <img src={image} alt="預覽圖" className="back-preview" />
                        ) : (
                            <p id="back-word">拖曳圖片到這裡，或點擊上傳</p>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, setImage, setFile)}
                        className="background-input"
                        ref={fileInputRef} // 📌 存入 useRef 陣列
                        style={{ display: "none" }} // 隱藏 input
                    />
                </div>
            </div>

            <div className="button-container">
                <button id="confirm_upload" className="btn btn-info" onClick={handleUploadBackImg}>
                    <FontAwesomeIcon icon={faCloudArrowUp} /> 確認更新
                </button>
            </div>
        </>
    );
};

export default backGroundImg;