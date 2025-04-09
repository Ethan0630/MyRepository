import { useState, useEffect } from "react";
import "../css/TopBox.css";

import { fetchBanner } from "../js/TopBox.js"

const TopBox = () => {

    const [banner, setBanner] = useState(Array(3).fill(null));
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const data = await fetchBanner();
                const filtered = data.filter((img) => img !== null); // 過濾 null
                setBanner(filtered);
            } catch (err) {
                console.error("取得 banner 失敗", err);
            }
        };

        fetchBanners();
    }, []);

    useEffect(() => {
        if (banner.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
            }, 3000); // 每 3 秒切換

            return () => clearInterval(interval); // 清除計時器
        }
    }, [banner]);



    return (
        <div className="TopBox">
            {banner.length === 1 && (
                <img
                    src={banner[0]}
                    alt="banner"
                    className="carousel-image"
                />
            )}

            {banner.length > 1 && (
                <img
                    src={banner[currentIndex]}
                    alt={`banner-${currentIndex}`}
                    className="carousel-image"
                />
            )}
        </div>
    );
};

export default TopBox;