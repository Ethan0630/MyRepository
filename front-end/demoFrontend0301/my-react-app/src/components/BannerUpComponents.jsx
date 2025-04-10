import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef, useEffect } from "react";
import "../css/BannerUp.css";
import { uploadBanner } from "../js/BannerUp.js";
import { useNavigate } from 'react-router-dom';


const BannerUpComponent = () => {

    const navigate = useNavigate();

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);

    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);

    const fileInputRef1 = useRef(null);
    const fileInputRef2 = useRef(null);
    const fileInputRef3 = useRef(null);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const response = await fetch("http://3.113.186.54:9060/banner/getBanners");
            const data = await response.json();

            if (Array.isArray(data)) {
                setImage1(data[0] || null);
                setImage2(data[1] || null);
                setImage3(data[2] || null);

                // 🔹 將 Base64 轉回 File（保持與 File Input 一致）
                if (data[0]) {
                    const file = await base64ToFile(data[0], "banner1.png");
                    setFile1(file);
                }
                if (data[1]) {
                    const file = await base64ToFile(data[1], "banner2.png");
                    setFile2(file);
                }
                if (data[2]) {
                    const file = await base64ToFile(data[2], "banner3.png");
                    setFile3(file);
                }
            }
        } catch (error) {
            console.error("取得 Banner 失敗:", error);
        }
    };

    // 📌 **處理 input 變更**
    const handleFileChange = (e, setImage, setFile) => {
        const file = e.target.files[0];
        if (!file) return; // 防止未選擇檔案
        processFile(file, setImage, setFile);
    };

    const handleDivClick = (fileInputRef) => {
        fileInputRef.current.click(); // 直接點擊 input
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

        if (fileInputRef1.current) {
            fileInputRef1.current.value = ""; // ✅ 清空 input 的值
        }
        if (fileInputRef2.current) {
            fileInputRef2.current.value = ""; // ✅ 清空 input 的值
        }
        if (fileInputRef3.current) {
            fileInputRef3.current.value = ""; // ✅ 清空 input 的值
        }
    };

    const handleUploadBanner = async () => {
        if (!file1 && !file2 && !file3) {
            alert("至少要一張banner!");
            return
        }
        const result = await uploadBanner(file1, file2, file3);

        if (result === "success") {
            fetchBanners();
            alert("上傳成功");
        } else if (result === "unauthorized") {
            navigate("/"); // ✅ 直接跳回登入畫面
        } else {
            alert("上傳失敗，請稍後再試！\n或重新登入再試一次");
        }
    }

    const base64ToFile = async (base64String, fileName) => {
        const res = await fetch(base64String);
        const blob = await res.blob();
        return new File([blob], fileName, { type: blob.type });
    };


    return (
        <div className="banner-container">
            < div className="drop-area">
                <div className="title-container">
                    <h2>Banner 1 </h2>
                    {image1 && <i className="fa-solid fa-trash" onClick={() => handleDeleteImage(setImage1, setFile1)}></i>}

                </div>
                <div className={`img-container ${image1 ? "has-image" : ""}`}
                    onClick={() => handleDivClick(fileInputRef1)}
                    onDrop={(e) => handleDrop(e, setImage1, setFile1)}
                    onDragOver={handleDragOver} >
                    {image1 ? (
                        <img src={image1} alt="預覽圖" className="preview-image" />
                    ) : (
                        <p>拖曳圖片到這裡，或點擊上傳</p>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setImage1, setFile1)}
                    className="file-input"
                    ref={fileInputRef1}  // 把這個 input 綁定到 fileInputRef
                />
            </div >
            < div className="drop-area" >
                <div className="title-container">
                    <h2>Banner 2 </h2>
                    {image2 && <i className="fa-solid fa-trash" onClick={() => handleDeleteImage(setImage2, setFile2)}></i>}
                </div>

                <div className={`img-container ${image2 ? "has-image" : ""}`}
                    onClick={() => handleDivClick(fileInputRef2)}
                    onDrop={(e) => handleDrop(e, setImage2, setFile2)}
                    onDragOver={handleDragOver}>
                    {image2 ? (
                        <img src={image2} alt="預覽圖" className="preview-image" />
                    ) : (
                        <p>拖曳圖片到這裡，或點擊上傳</p>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setImage2, setFile2)}
                    className="file-input"
                    ref={fileInputRef2}  // 把這個 input 綁定到 fileInputRef
                />
            </div >
            < div className="drop-area">
                <div className="title-container">
                    <h2>Banner 3 </h2>
                    {image3 && <i className="fa-solid fa-trash" onClick={() => handleDeleteImage(setImage3, setFile3)}></i>}

                </div>
                <div className={`img-container ${image3 ? "has-image" : ""}`}
                    onClick={() => handleDivClick(fileInputRef3)}
                    onDrop={(e) => handleDrop(e, setImage3, setFile3)}
                    onDragOver={handleDragOver}>
                    {image3 ? (
                        <img src={image3} alt="預覽圖" className="preview-image" />
                    ) : (
                        <p>拖曳圖片到這裡，或點擊上傳</p>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setImage3, setFile3)}
                    className="file-input"
                    ref={fileInputRef3}  // 把這個 input 綁定到 fileInputRef
                />
            </div>

            <div className="button-container">
                <button id="confirm_upload" className="btn btn-info" onClick={handleUploadBanner}>
                    <FontAwesomeIcon icon={faCloudArrowUp} /> 確認更新
                </button>
            </div>


        </div>
    );
};

export default BannerUpComponent;