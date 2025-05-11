import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../css/ProjectUp.css";
import React, { useState, useEffect, useRef } from "react";
import { uploadProject } from "../js/ProjectUp"; // ✅ 正確匯入函數
import { fetchCategories } from "../js/CategoryUp";
import { fetchIndustry } from "../js/IndustryUp";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {

    const [name, setName] = useState("");
    const [industry, setIndustry] = useState([]);
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [categories, setCategories] = useState([]); // ✅ 存 API 回傳的類別列表
    const [selectedCategory, setSelectedCategory] = useState(""); // ✅ 存選中的類別
    const [description, setDescription] = useState("");

    const [images, setImages] = useState(Array(5).fill(null)); // 存放 5 張圖片的狀態
    const [files, setFiles] = useState(Array(5).fill(null));   // 存放 5 個檔案的狀態
    const fileInputRefs = useRef([]); // 建立一個陣列來存放 input 參考

    const navigate = useNavigate();

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategories();
            setCategories(data); // ✅ 讓 React 重新渲染
        };
        const getIndustry = async () => {
            const data = await fetchIndustry();
            setIndustry(data); // ✅ 讓 React 重新渲染
        };
        getCategories(); // ✅ 這行不能少！
        getIndustry();
    }, []);

    // ✅ 新增作品
    const handleUploadProject = async () => {
        setDescription(description.trim());

        if (!selectedIndustry || !selectedCategory || !description) {
            Swal.fire("嗚嗚~豬寶!!!!", "請填寫所有欄位!", "warning");
            return;
        }

        // ✅ 檢查第一張圖片是否有檔案
        if (!files[0]) {
            Swal.fire("嗚嗚~豬寶!!!!", "請上傳封面圖片（第一張圖片為必填!）", "warning");
            return;
        }

        const result = await uploadProject(name, selectedIndustry, selectedCategory, files, description);
        if (result === "success") {
            setName("");
            setSelectedCategory(""); // ✅ 正確清空
            setSelectedIndustry(""); // ✅ 正確清空
            setDescription(""); // ✅ 正確清空
            setImages(Array(5).fill(null)); // ✅ 保持陣列結構
            setFiles(Array(5).fill(null));  // ✅ 清空檔案陣列
            Swal.fire("愛你豬萱寶", "作品新增成功!\n你好棒(胖)", "success");
        } else if (result === "unauthorized") {
            navigate("/"); // ✅ 直接跳回登入畫面
        } else {
            Swal.fire("嗚嗚~豬寶!!!!", "作品新增失敗，請稍後再試!\n或聯絡夆夆", "warning");
        }
    };

    //作品圖片
    const handleDivClick = (index) => {
        fileInputRefs.current[index].click();
    };

    const handleFileChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const newImages = [...images];
            const newFiles = [...files];
            newImages[index] = imageUrl;
            newFiles[index] = file;
            setImages(newImages);
            setFiles(newFiles);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, index) => {
        event.preventDefault(); // 防止瀏覽器開啟檔案
        const file = event.dataTransfer.files[0]; // 取得拖曳的第一個檔案

        if (file) {
            handleFileChange({ target: { files: [file] } }, index); // ✅ 模擬 input change 事件
        }
    };

    const handleDeleteImage = (index) => {
        setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[index] = null; // ✅ 清空對應 index 的圖片
            return newImages;
        });

        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles[index] = null; // ✅ 清空對應 index 的檔案
            return newFiles;
        });
    };



    return (
        <div id="uploadContainer">
            <div id="title">
                <h2>作品上傳</h2>
            </div>

            {/* 新增產業 */}
            <div id="addCategoryContainer">

                <h3><span className='required-star'>*</span>作品名稱</h3>
                <input
                    type="text"
                    id=""
                    placeholder="請輸入作品名稱"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div id="industryListContainer">
                <h3><span className='required-star'>*</span>選擇產業</h3>
                <select id="industrySelect" value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)}>
                    <option value="" disabled>請選擇產業</option>
                    {industry.map((industry) => (
                        <option key={industry.id} value={industry.id}>
                            {industry.industryName}
                        </option>
                    ))}
                </select>
            </div>

            <div id="categoryListContainer">
                <h3><span className='required-star'>*</span>選擇類別</h3>
                <select id="categorySelect" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="" disabled>請選擇類別</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="image-upload-container">
                <h3><span className='required-star'>*</span>作品圖片</h3>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="image-block">
                        <div id="title-container">
                            {images[index] && <FontAwesomeIcon icon={faTrash} className="trash" onClick={() => handleDeleteImage(index)} />}
                        </div>
                        <div
                            key={index}
                            className={`projectimg-container ${images[index] ? "has-image" : ""}`}
                            onClick={() => handleDivClick(index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragOver={handleDragOver}
                        >
                            {images[index] ? (
                                <img src={images[index]} alt="預覽圖" className="preview-image" />
                            ) : (
                                <p>
                                    {index === 0 ? (
                                        <>
                                            <span className='required-star'>*
                                                圖1 (封面，必填) <br />
                                                拖曳圖片到這裡，或點擊上傳
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            圖{index + 1} (選填) <br />
                                            拖曳圖片到這裡，或點擊上傳
                                        </>
                                    )}
                                </p>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, index)}
                                className="file-input"
                                ref={(el) => (fileInputRefs.current[index] = el)} // 📌 存入 useRef 陣列
                                style={{ display: "none" }} // 隱藏 input
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="descripttion-area">
                <label htmlFor="description"><span className='required-star'>*</span>敘述：</label>
                <textarea
                    id="description"
                    rows="3"
                    placeholder="請輸入圖片描述"
                    value={description} // ✅ 綁定 `useState`
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <button id="uploadButton" onClick={handleUploadProject}>上傳作品</button>
            </div>
        </div>
    );
};

export default ImageUpload;
