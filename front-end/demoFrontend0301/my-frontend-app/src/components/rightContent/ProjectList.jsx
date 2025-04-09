import React, { useEffect, useState } from "react";
import "../../css/ProjectList.css";
import { fetchAllProject } from "../../js/ProjectList";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";





const ProjectList = ({ industryId, categoryId }) => {
    const [allProjects, setAllProjects] = useState([]); // 📦 全部資料（只抓一次）
    const [projects, setProjects] = useState([]);       // 🎯 根據篩選後的資料（前端切出）

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [description, setDescription] = useState("");

    const [currentPage, setCurrentPage] = useState(1); // 預設在第 1 頁
    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

    const startIndex = (currentPage - 1) * itemsPerPage; //找出開始的index，如果是第1頁，就是(1-1)*9=0
    const endIndex = startIndex + itemsPerPage;
    const currentProjects = projects.slice(startIndex, endIndex); // 頁面上的資料，切片(包含start，不包含end)


    // 監聽視窗變化
    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(getItemsPerPage());
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (lightboxOpen) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }

        // 清理避免記憶體洩漏
        return () => {
            document.body.classList.remove("modal-open");
        };
    }, [lightboxOpen]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await fetchAllProject();
                setAllProjects([]);
                setAllProjects(data);
                setProjects([]);
                setProjects(data);
            } catch (err) {
                console.error("取得作品列表失敗", err);
            }
        };

        fetchProjects();
    }, []); // ✅ 每次只要 id 有變就會重新查詢


    useEffect(() => {
        let filtered = allProjects; // 🛠️ 預設：不過濾，顯示全部

        if (industryId) {
            filtered = filtered.filter(p => p.industry == industryId); // 🎯 如果選了產業
        }

        if (categoryId) {
            filtered = filtered.filter(p => p.category == categoryId); // 🎯 如果選了類別
        }

        setProjects(filtered); // ✅ 顯示篩選後的
        setCurrentPage(1);     // 📄 回到第一頁
    }, [industryId, categoryId, allProjects]); // ⚠️ 這三個有變就重新篩選

    // 根據寬度決定幾個 item
    function getItemsPerPage() {
        return window.innerWidth <= 992 ? 6 : 9;
    }

    const handleLishtBox = async (project) => {
        const images = [
            project.base64Img1,
            project.base64Img2,
            project.base64Img3,
            project.base64Img4,
            project.base64Img5
        ].filter(img => img !== null); // ✅ 過濾掉 null 的圖

        setDescription(project.description);
        setLightboxImages(images);
        setLightboxOpen(true);
    };

    return (
        <>{lightboxOpen && (
            <div className="lightbox" onClick={() => setLightboxOpen(false)}>
                <div className="lightbox-content">
                    {/* ✅ 關閉按鈕 */}
                    <div id="close-btn">
                        <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    </div>
                    {lightboxImages.map((img, index) => (
                        <img key={index} src={img} alt={`圖 ${index + 1}`} />
                    ))}
                    <div id="des-box">
                        <p> {description} </p>
                    </div>
                </div>
            </div>
        )}

            <div className="square-container">
                {currentProjects.map((project) => (
                    <div key={project.id} className="square" onClick={() => handleLishtBox(project)}>
                        <img src={project.base64Img1} alt={"查無此照片"}></img>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {/* 上一頁 */}
                <button
                    className="nav-btn"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    style={{ visibility: currentPage <= 1 ? 'hidden' : 'visible' }}
                >
                    <FontAwesomeIcon icon={faCircleChevronLeft} />
                </button>

                {Array.from({ length: Math.ceil(projects.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? 'index-active' : 'index'}
                    >
                        {index + 1}
                    </button>
                ))}

                {/* 下一頁 */}
                <button
                    className="nav-btn"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    style={{ visibility: currentPage >= Math.ceil(projects.length / itemsPerPage) ? 'hidden' : 'visible' }}
                >
                    <FontAwesomeIcon icon={faCircleChevronRight} />
                </button>
            </div>

        </>
    );
};
export default ProjectList;