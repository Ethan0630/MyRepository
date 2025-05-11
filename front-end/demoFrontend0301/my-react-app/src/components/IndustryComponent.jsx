import Swal from 'sweetalert2';
import "../css/IndustryUp.css";
import React, { useState, useEffect } from "react"; // ✅ 確保有 `useEffect`
import { fetchIndustry, uploadIndustry, deleteIndustry } from "../js/IndustryUp";
import { useNavigate } from "react-router-dom";

const IndustryComponent = () => {
    const [industry, setIndustry] = useState([]); // ✅ 存 API 回傳的類別列表
    const [newIndustry, setNewIndustry] = useState(""); // ✅ 存使用者輸入的類別名稱
    const [selectedIndustry, setSelectedIndustry] = useState(""); // ✅ 存選中的要刪除的類別

    const navigate = useNavigate();

    useEffect(() => {
        const getIndustry = async () => {
            const data = await fetchIndustry();
            setIndustry(data); // ✅ 讓 React 重新渲染
        };
        getIndustry(); // ✅ 這行不能少！
    }, []);


    // ✅ 新增產業
    const handleUploadIndustry = async () => {
        if (!newIndustry) {
            Swal.fire("胖胖豬!!", "請輸入產業名稱!", "warning"); 
            return;
        }

        const result = await uploadIndustry(newIndustry);
        if (result === "success") {
            const updatedIndustry = await fetchIndustry(); // ✅ 刪除成功後更新列表
            setIndustry(updatedIndustry);
            setNewIndustry(""); // ✅ 清空輸入框
            Swal.fire("愛你豬萱寶", "產業新增成功!\n你好棒(胖)", "success"); 
        } else if (result === "unauthorized") {
            navigate("/"); // ✅ 直接跳回登入畫面
        } else {
            Swal.fire("嗚嗚~豬寶!!!!", "產業新增失敗，請稍後再試！\n或聯絡夆夆", "warning");
        }



    };

    const handleDeleteIndustry = async () => {
        if (!selectedIndustry) {
            Swal.fire("胖胖豬!!", "請選擇要刪除的產業!", "warning"); 
            return;
        }

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

        const result = await deleteIndustry(selectedIndustry); // ✅ 呼叫 API 刪除類別

        if (result === "success") {
            const updatedIndustry = await fetchIndustry(); // ✅ 刪除成功後更新列表
            setIndustry(updatedIndustry);
            setSelectedIndustry(""); // ✅ 清空選擇
            Swal.fire("愛你豬萱寶", "產業刪除成功!\n你好棒(胖)", "success"); 
        } else if (result === "unauthorized") {
            navigate("/"); // ✅ 直接跳回登入畫面
        } else {
            Swal.fire("嗚嗚~豬寶!!!!", "產業刪除失敗，請稍後再試！\n或重新登入後再試一次\n或聯絡夆夆", "warning");
        }
    };

    return (
        <div id="industryContainer">
            <h2>產業管理</h2>

            {/* 新增產業 */}
            <div id="addCategoryContainer">
                <h3>新增產業</h3>
                <label>產業名稱：</label>
                <input
                    type="text"
                    id="industryinput"
                    placeholder="請輸入產業名稱"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    required
                />
                <button className="updatebtn" id="uploadButton" onClick={handleUploadIndustry}>新增產業</button>
            </div>

            {/* 刪除產業 */}
            <div id="deleteIndustryContainer">
                <h3>刪除產業</h3>
                <label>目前所有產業：</label>
                <select className="all" id="categorySelect-D" value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)}>
                    <option value="">下拉查看所有產業</option>
                    {industry.map((industry) => (
                        <option key={industry.id} value={industry.id}>
                            {industry.industryName}
                        </option>
                    ))}
                </select>
                <button className="updatebtn" id="deleteButton" onClick={handleDeleteIndustry}>刪除產業</button>
            </div>
        </div>
    );
};

export default IndustryComponent;
