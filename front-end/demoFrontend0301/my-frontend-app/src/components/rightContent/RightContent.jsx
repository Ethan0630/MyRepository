import React, { useState } from "react";
import SelectFilter from "./SelectFilter"; // 你之前的 component，記得改名
import ProjectList from "./ProjectList";   // 這是你等等要新增的
import "../../css/RightContent.css";

const RightContent = () => {
    const [selectedIndustry, setSelectedIndustry] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    return (
        <>
            <div className="top-green-bar">
                <SelectFilter
                    selectedIndustry={selectedIndustry}
                    setSelectedIndustry={setSelectedIndustry}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>
            <div className="right-content">
                <ProjectList
                    industryId={selectedIndustry}
                    categoryId={selectedCategory}
                />
            </div>
        </>
    );
};

export default RightContent;
