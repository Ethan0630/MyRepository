import React, { useState, useEffect, useRef } from "react";
import Croppie from "croppie";
import "croppie/croppie.css"; // ✅ 匯入 Croppie 樣式
import "../css/ProfilePic.css";
import { uploadImage } from "../js/ProfilePic.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";


const ProfilePicComponent = () => {
    const [image, setImage] = useState(null); // ✅ 存儲選中的圖片
    const [croppedImage, setCroppedImage] = useState(null); // ✅ 裁切後的圖片
    const fileInputRef = useRef(null); // ✅ 綁定 `<input type="file">`
    const cropRef = useRef(null); // ✅ 綁定裁切框
    const [croppieInstance, setCroppieInstance] = useState(null); // ✅ Croppie 實例
    const [showCroppedImage, setShowCroppedImage] = useState(false);
    const [showUploadBtn, setShowUploadBtn] = useState(false);

    const navigate = useNavigate();

    // ✅ 處理圖片選擇事件
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // 取得使用者選擇的檔案
        if (!file) return; // 如果沒有選擇檔案，直接返回

        if (!file.type.startsWith("image")) { // 檢查是否為圖片
            alert("請上傳圖片格式");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target.result); // ✅ 設定 `image` 為圖片的 `base64`
            setShowCroppedImage(false); // ✅ 顯示裁剪後的圖片
            setShowUploadBtn(false);
        };
        reader.readAsDataURL(file); // ✅ 讀取檔案，轉換為 `base64`
    };

    // ✅ 當 `image` 改變時，初始化 Croppie
    useEffect(() => {
        if (image && cropRef.current) {
            if (croppieInstance) {
                croppieInstance.destroy(); // 🔹 銷毀舊的 Croppie 實例，防止重複初始化
            }



            const newCroppie = new Croppie(cropRef.current, {
                viewport: { width: 120, height: 120, type: "circle" }, // 🔹 設定裁剪框（圓形）
                boundary: { width: 400, height: 400 }, // 🔹 預覽區域大小
                showZoomer: true, // 🔹 顯示縮放功能
            });



            newCroppie.bind({ url: image }).then(() => {
                console.log("Croppie 綁定成功 ✅");
                setCroppieInstance(newCroppie); // ✅ 確保 Croppie 綁定後再設定
            }).catch((error) => {
                console.error("Croppie 綁定失敗 ❌", error);
            });
        }
    }, [image]); // 🔹 只在 `image` 變更時執行


    // ✅ 處理裁切圖片
    const handleCrop = () => {
        if (!croppieInstance) {
            console.warn("⚠️ `croppieInstance` 仍然是 `null`，等待初始化...");
            return;
        }
        croppieInstance.result({ type: "canvas", format: "jpeg", quality: 0.85 }).then((croppedImg) => {
            setCroppedImage(croppedImg); // ✅ 儲存裁切後的圖片
            setShowCroppedImage(true); // ✅ 顯示裁剪後的圖片
            setShowUploadBtn(true); // ✅ 確保 `showUploadBtn` 變更
        });
    };

    // 🔹 這個函式用來將 Base64 轉換成 Blob
    const base64ToBlob = (base64, mimeType) => {
        let byteString = atob(base64.split(',')[1]); // 解析 Base64
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeType });
    };

    const handleUploadPic = async () => {
        if (!croppedImage) {
            console.log("尚未裁切照片!");
            return;
        }
        // **轉換 `Base64` 成 `Blob`**
        const imageBlob = base64ToBlob(croppedImage, "image/jpeg");
        const result = await uploadImage(imageBlob);

        if (result === "success") {
            alert("上傳成功!")
        } else if (result === "unauthorized") {
            navigate("/"); // ✅ 直接跳回登入畫面
        } else {
            alert("上傳失敗，請稍後再試！");
        }

    }


    return (
        <div id="profilePicContainer">
            <div id="profilePicTitle">
                <h2>大頭貼上傳</h2>
            </div>
            <div className="button-container">
                <button
                    className="btn btn-info"
                    onClick={() => fileInputRef.current.click()} // ✅ 觸發 `input` 點擊事件
                >
                    <i className="fa-solid fa-image">選擇圖片</i>
                </button>
                <input
                    type="file"
                    id="upload_img"
                    style={{ display: "none" }}
                    accept="image/*"
                    ref={fileInputRef} // ✅ 綁定 Ref
                    onChange={handleFileChange}
                    required />

            </div>


            <div ref={cropRef} style={{
                width: "400px",
                height: "400px",
                border: "1px solid black",
                display: image ? "block" : "none",
                margin: "20px auto", // ✅ 讓 div 水平置中
            }} />
            <div className="button-container">
                <button className="btn btn-info" onClick={handleCrop} style={{
                    marginTop: "10%",
                    display: image ? "block" : "none"
                }}>

                    <i className="fa fa-scissors"></i> 裁剪圖片
                </button>
            </div>
            {showCroppedImage && (
                <div id="newImg">
                    <img src={croppedImage} alt="裁剪後的圖片" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
            )}

            {showUploadBtn && (
                <div className="button-container">
                    <button id="confirm_upload" className="btn btn-info" onClick={handleUploadPic}>
                        <FontAwesomeIcon icon={faCircleCheck} />
                        <span>確認上傳</span>
                    </button>
                </div>
            )}


        </div>



    );
};

export default ProfilePicComponent;