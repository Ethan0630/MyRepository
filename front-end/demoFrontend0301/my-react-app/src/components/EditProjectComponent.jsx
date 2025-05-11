import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../css/ProjectUp.css";
import React, { useState, useEffect, useRef } from "react";
import { updateProject, fetchProjectName, fetchProjectById, deleteProjectById } from "../js/ProjectUp"; // ✅ 正確匯入函數
import { fetchCategories } from "../js/CategoryUp";
import { fetchIndustry } from "../js/IndustryUp";
import { useNavigate } from "react-router-dom";

const ProjectUpdate = () => {

    const [name, setName] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [industry, setIndustry] = useState([]);
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [categories, setCategories] = useState([]); // ✅ 存 API 回傳的類別列表
    const [selectedCategory, setSelectedCategory] = useState(""); // ✅ 存選中的類別
    const [description, setDescription] = useState("");

    const [images, setImages] = useState(Array(5).fill(null)); // 存放 5 張圖片的狀態
    const [files, setFiles] = useState(Array(5).fill(null));   // 存放 5 個檔案的狀態
    const fileInputRefs = useRef([]); // 建立一個陣列來存放 input 參考

    const [file1, setFile1] = useState(null);

    const navigate = useNavigate();

    const getAllName = async () => {
        const data = await fetchProjectName();
        setName(data);
    };

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
        getAllName();

    }, []);

    useEffect(() => {
        const getProjectById = async () => {
            const data = await fetchProjectById(selectedId);

            const imageList = [
                data.image1,
                data.image2,
                data.image3,
                data.image4,
                data.image5
            ];
            setImages(imageList);

            const promiseGetFIle = [
                data.image1 ? urlToFile(data.image1, "image1.png") : null,
                data.image2 ? urlToFile(data.image2, "image2.png") : null,
                data.image3 ? urlToFile(data.image3, "image3.png") : null,
                data.image4 ? urlToFile(data.image4, "image4.png") : null,
                data.image5 ? urlToFile(data.image5, "image5.png") : null,
            ];

            const fileList = await Promise.all(promiseGetFIle);
            setFiles(fileList);
            setSelectedIndustry(data.industry);
            setSelectedCategory(data.category);
            setDescription(data.description);
        };

        if (selectedId) {
            getProjectById();
        }
    }, [selectedId]);

    const urlToFile = async (url, fileName) => {
        const response = await fetch(url, { mode: "cors" }); // 👈 多加這行
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
    };

    // ✅ 更新作品
    const handleUpdateProject = async () => {
        setDescription(description.trim());

        if (!selectedIndustry || !selectedCategory || !description) {
            Swal.fire("嗚嗚~豬寶!!!!", "請填寫所有欄位!", "warning");
            return;
        }

        // ✅ 檢查第一張圖片是否有檔案
        if (!files[0]) {
            Swal.fire("嗚嗚~豬寶!!!!", "請上傳封面圖片（第一張圖片為必填!）!", "warning");
            return;
        }

        const result = await updateProject(selectedId, selectedIndustry, selectedCategory, files, description);
        if (result === "success") {
            setSelectedId("");
            setSelectedCategory(""); // ✅ 正確清空
            setSelectedIndustry(""); // ✅ 正確清空
            setDescription(""); // ✅ 正確清空
            setImages(Array(5).fill(null)); // ✅ 保持陣列結構
            setFiles(Array(5).fill(null));  // ✅ 清空檔案陣列
            Swal.fire("愛你豬萱寶", "更新成功!\n你好棒(胖)", "success");
        } else if (result === "unauthorized") {
            navigate("/"); // ✅ 直接跳回登入畫面
        } else {
            Swal.fire("嗚嗚~豬寶!!!!", "作品更新失敗，請稍後再試！\n或重新登入再試一次QQ\n或聯絡夆夆", "warning");
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

    const handleDeleteProject = async () => {
        const confirm = await Swal.fire({
            title: '確定要刪除嗎？',
            text: '刪除後無法復原！',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '刪除',
            cancelButtonText: '取消',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        });

        if (!confirm.isConfirmed) return;

        const result = await deleteProjectById(selectedId);

        if (result === "success") {
            getAllName();
            setSelectedId("");
            setSelectedCategory(""); // ✅ 正確清空
            setSelectedIndustry(""); // ✅ 正確清空
            setDescription(""); // ✅ 正確清空
            setImages(Array(5).fill(null)); // ✅ 保持陣列結構
            setFiles(Array(5).fill(null));  // ✅ 清空檔案陣列
            Swal.fire("愛你豬萱寶", "作品刪除成功!\n你好棒(胖)", "success");
        } else if (result === "unauthorized") {
            navigate("/"); // ✅ 直接跳回登入畫面
        } else {
            Swal.fire("嗚嗚~豬寶!!", "作品刪除失敗，請稍後再試！\n或重新登入後再試一次\n或聯絡夆夆", "warning");
        }

    }



    return (
        <div id="uploadContainer">
            <div id="title">
                <h2>編輯作品</h2>
            </div>

            {/* 選擇產業 */}
            <div id="addCategoryContainer">
                <h3>選擇作品</h3>
                <select id="projectSelect" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                    <option value="" disabled>請選擇作品</option>
                    {name.map((name) => (
                        <option key={name.id} value={name.id}>
                            {name.name}
                        </option>
                    ))}
                </select>
            </div>


            {/* ✅ 只有選擇作品後才會顯示 */}
            {selectedId && (
                <>
                    <div id="industryListContainer">
                        <h3>選擇產業</h3>
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
                        <h3>選擇類別</h3>
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
                        <h3>作品圖片</h3>
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
                                                    圖1 (封面，必填) <br />
                                                    拖曳圖片到這裡，或點擊上傳
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
                        <label htmlFor="description">敘述：</label>
                        <textarea
                            id="description"
                            rows="3"
                            placeholder="請輸入圖片描述"
                            value={description} // ✅ 綁定 `useState`
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                        <button id="uploadButton" onClick={handleUpdateProject}>更新作品</button>
                        <button id="deleteButton" onClick={handleDeleteProject}>刪除作品</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProjectUpdate;
