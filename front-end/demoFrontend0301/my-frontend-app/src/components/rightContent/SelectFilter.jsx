import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faSchool, faLocationDot, faArrowUpRightFromSquare, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import "../../css/Select.css";
import { fetchIndustry } from '../../../../my-react-app/src/js/IndustryUp';
import { fetchCategories } from '../../../../my-react-app/src/js/CategoryUp';




const SelectFilter = ({
    selectedIndustry,
    setSelectedIndustry,
    selectedCategory,
    setSelectedCategory
}) => {
    const [industry, setIndustry] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getIndustry = async () => {
            const data = await fetchIndustry();
            setIndustry(data);
        };
        const getCategories = async () => {
            const data = await fetchCategories();
            setCategories(data); // ✅ 讓 React 重新渲染
        };
        getIndustry();
        getCategories();
    }, []);

    return (
        <>
            <div id="word">
                <h3>篩選</h3>
            </div>
            <div className="filter-controls">


                <div id="industryContainer">
                    <h4>產業:</h4>
                    <select className="" id="industry-s" value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)}>
                        <option value="">所有產業</option>
                        {industry.map((industry) => (
                            <option key={industry.id} value={industry.id}>
                                {industry.industryName}
                            </option>
                        ))}
                    </select>
                </div>
                <div id="categoryContainer">
                    <h4>類別:</h4>
                    <select className="" id="category-s" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">所有類別</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* 更新圖示 (FontAwesome) */}
            {/* <div className="refresh-container">
                <FontAwesomeIcon icon={faRotateRight} />
            </div> */}
        </>
    );
};

export default SelectFilter;