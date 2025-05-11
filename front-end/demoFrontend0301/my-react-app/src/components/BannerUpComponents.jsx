import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
        // console.log("Component mounted");
        fetchBanners();
    }, []);

    useEffect(() => {
        console.log(file1);
    }, [file1]);
    useEffect(() => {
        console.log(file2);
    }, [file2]);
    useEffect(() => {
        console.log(file3);
    }, [file3]);




    const fetchBanners = async () => {
        try {
            const response = await fetch("http://localhost:9060/banner/getBanners");
            const data = await response.json();

            setImage1(data[0] || null);
            setImage2(data[1] || null);
            setImage3(data[2] || null);
            
            const promiseGetFIle = [
                data[0] ? urlToFile(data[0], "banner1.png") : null, 
                data[1] ? urlToFile(data[1], "banner2.png") : null, 
                data[2] ? urlToFile(data[2], "banner3.png") : null]; // urlToFile(data[0], "banner1.png")
            setFile1(await promiseGetFIle[0]);
            setFile2(await promiseGetFIle[1]);
            setFile3(await promiseGetFIle[2]);
            

        } catch (error) {
            console.error("取得 Banner 失敗:", error);
        }
    };

    const urlToFile = async (url, fileName) => {
        const response = await fetch(url, { mode: "cors" }); // 👈 多加這行
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
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
        console.log(file1, file2, file3);
        if (!file1 && !file2 && !file3) {
            Swal.fire("嗚嗚~豬寶!!!!", "至少要一張banner!", "warning"); 
            return
        }
        const result = await uploadBanner(file1, file2, file3);

        if (result === "success") {
            fetchBanners();
            Swal.fire("愛你豬萱寶", "上傳成功!", "success"); 
        } else if (result === "unauthorized") {
            navigate("/"); // ✅ 直接跳回登入畫面
        } else {
            Swal.fire("嗚嗚~豬寶!!!!", "上傳失敗，請稍後再試！\n或重新登入再試一次\n或聯絡夆夆", "warning"); 
        }
    }


    return (
        <div className="banner-container">
            < div className="drop-area">
                <div className="title-container">
                    <h2>Banner 1 </h2>
                    {image1 &&  <FontAwesomeIcon icon={faTrash} className="trash" onClick={() => handleDeleteImage(setImage1, setFile1)}/>}
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
                    {image2 && <FontAwesomeIcon icon={faTrash} className="trash" onClick={() => handleDeleteImage(setImage2, setFile2)}/>}
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
                    {image3 && <FontAwesomeIcon icon={faTrash} className="trash" onClick={() => handleDeleteImage(setImage3, setFile3)}/>}

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