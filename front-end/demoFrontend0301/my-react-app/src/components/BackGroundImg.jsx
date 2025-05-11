import Swal from 'sweetalert2';
import { faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/BackGroundImg.css";
import { fetchBackImg, uploadBackImg } from "../js/BackGroundImg";


const backGroundImg = () => {
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);


    const fileInputRef = useRef(null);  // 宣告 ref
    const navigate = useNavigate();


    useEffect(() => {
        getBackImg();
    }, []);

    const getBackImg = async () => {
        const data = await fetchBackImg();
        setImage(data.backgroundImg);
        console.log(data.backgroundImg);
        const promiseGetFIle = data.backgroundImg ? urlToFile(data.backgroundImg, "background.png") : null;
        setFile(await promiseGetFIle);
    };
    
    const handleDivClick = () => {
        fileInputRef.current.click(); // 讓 input 模擬被點擊
    };

    const urlToFile = async (url, fileName) => {
        const response = await fetch(url, { mode: "cors" }); // 👈 多加這行
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
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
            Swal.fire("胖胖豬!!", "請上傳背景圖!", "warning"); 
            return
        }
        const result = await uploadBackImg(file);

        if (result === "success") {
            Swal.fire("愛你豬萱寶", "上傳成功!\n你好棒(胖)", "success"); 
        } else if (result === "unauthorized") {
            navigate("/"); // ✅ 直接跳回登入畫面
        } else {
            Swal.fire("嗚嗚~豬寶!!!!", "上傳失敗，請稍後再試！\n或聯絡夆夆", "warning");
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
                    {image && <FontAwesomeIcon icon={faTrash} className="trash" onClick={() => handleDeleteImage(setImage, setFile)}/>}
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