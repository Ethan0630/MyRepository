import "../css/CategoryUp.css";
import React, { useState, useEffect } from "react"; // ✅ 確保有 `useEffect`
import { fetchCategories, uploadCategory, deleteCategory } from "../js/CategoryUp";
import { useNavigate } from "react-router-dom";

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]); // ✅ 存 API 回傳的類別列表
    const [newCategory, setNewCategory] = useState(""); // ✅ 存使用者輸入的類別名稱
    const [selectedCategory, setSelectedCategory] = useState(""); // ✅ 存選中的要刪除的類別

    const navigate = useNavigate();
    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategories();
            setCategories(data); // ✅ 讓 React 重新渲染
        };
        getCategories(); // ✅ 這行不能少！
    }, []);


    // ✅ 新增類別
    const handleUploadCategory = async () => {
        if (!newCategory) {
            alert("請輸入類別名稱！");
            return;
        }

        const result = await uploadCategory(newCategory);
        if (result === "success") {
            const updatedCategories = await fetchCategories(); // ✅ 刪除成功後更新列表
            setCategories(updatedCategories);
            setNewCategory(""); // ✅ 清空輸入框
            alert("類別新增成功！ :))");
        } else if (result === "unauthorized") {
            navigate("/"); // ✅ 直接跳回登入畫面
        } else {
            alert("類別新增失敗，請稍後再試！\n或重新登入後再試一次 :(");
        }
    };

    const handleDeleteCategory = async () => {
        if (!selectedCategory) {
            alert("請選擇要刪除的類別！");
            return;
        }

        const confirmDelete = window.confirm("確定要刪除嗎？");
        if (!confirmDelete) return;

        const result = await deleteCategory(selectedCategory); // ✅ 呼叫 API 刪除類別

        if (result === "success") {
            const updatedCategories = await fetchCategories(); // ✅ 刪除成功後更新列表
            setCategories(updatedCategories);
            setSelectedCategory(""); // ✅ 清空選擇
            alert("類別刪除成功！ :)");
        } else if (result === "unauthorized") {
            navigate("/"); // ✅ 直接跳回登入畫面
        } else {
            alert("類別刪除失敗，請稍後再試！\n或重新登入後再試一次 :(");
        }
    };

    return (
        <div id="categoryContainer">
            <h2>類別管理</h2>

            {/* 新增類別 */}
            <div id="addCategoryContainer">
                <h3>新增類別</h3>
                <label htmlFor="newCategory">類別名稱：</label>
                <input
                    type="text"
                    id="categoryinput"
                    placeholder="請輸入類別名稱"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    required
                />
                <button className="updatebtn" id="uploadButton" onClick={handleUploadCategory}>新增類別</button>
            </div>

            {/* 刪除類別 */}
            <div id="deleteCategoryContainer">
                <h3>刪除類別</h3>
                <label htmlFor="newCategory">目前所有類別：</label>
                <select className="all" id="categorySelect-D" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">下拉查看類別</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
                <button className="updatebtn" id="deleteButton" onClick={handleDeleteCategory}>刪除類別</button>
            </div>
        </div>
    );
};

export default CategoryManagement;
