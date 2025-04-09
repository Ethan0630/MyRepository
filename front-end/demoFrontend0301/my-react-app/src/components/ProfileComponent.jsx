import React, { useState, useEffect } from "react";
import "../css/Profile.css";
import { fetchProfile, uploadProfile } from "../js/Profile";
import { useNavigate } from "react-router-dom";


const ProfileComponent = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        occupation: "",
        education: "",
        region: "",
        snsName: "",
        sns: ""
    });

    useEffect(() => {
        const getProfile = async () => {
            const respon = await fetchProfile();
            if (respon) {
                setProfile(respon);
            }

        }
        getProfile();
    }, []);

    const handleUploadProfile = async () => {

        const result = await uploadProfile(profile);

        if (result === "unauthorized") {
            navigate("/"); // ✅ 直接跳回登入畫面
        } else if (result != null) {
            setProfile(result);
            alert("更新完成! :)");
            return;
        } else {
            alert("操作失敗，請稍後再試! :(");
        }


    };

    return (
        <div id="ProfileComponent">
            <h2>個人資訊</h2>
            <label htmlFor="name">姓名:</label>
            <input
                type="text"
                id="name"
                placeholder="請輸入姓名"
                value={profile.name || ""}
                onChange={(e) => setProfile(prevProfile => ({
                    ...prevProfile,  // 保留之前的狀態
                    name: e.target.value // 只更新 name
                }))}
                required
            />
            <label htmlFor="occupation">職業:</label>
            <input
                type="text"
                id="occupationInput"
                placeholder="請輸入職業"
                value={profile.occupation || ""}
                onChange={(e) => setProfile(prevProfile => ({
                    ...prevProfile,  // 保留之前的狀態
                    occupation: e.target.value // 只更新 name
                }))}
                required
            />
            <label htmlFor="education">學歷:</label>
            <input
                type="text"
                id="education"
                placeholder="請輸入學歷"
                value={profile.education || ""}
                onChange={(e) => setProfile(prevProfile => ({
                    ...prevProfile,  // 保留之前的狀態
                    education: e.target.value // 只更新 name
                }))}
                required
            />
            <label htmlFor="region">位置:</label>
            <input
                type="text"
                id="region"
                placeholder="請輸入位置"
                value={profile.region || ""}
                onChange={(e) => setProfile(prevProfile => ({
                    ...prevProfile,  // 保留之前的狀態
                    region: e.target.value // 只更新 name
                }))}
                required
            />
            <label htmlFor="sns-name">欲顯示的社群名稱:</label>
            <input
                type="text"
                id="sns-name"
                placeholder="請輸入欲顯示的社群名稱"
                value={profile.snsName || ""}
                onChange={(e) => setProfile(prevProfile => ({
                    ...prevProfile,  // 保留之前的狀態
                    snsName: e.target.value // 只更新 name
                }))}
                required
            />
            <label htmlFor="sns">社群網址:</label>
            <input
                type="text"
                id="sns"
                placeholder="請輸入社群網址"
                value={profile.sns || ""}
                onChange={(e) => setProfile(prevProfile => ({
                    ...prevProfile,  // 保留之前的狀態
                    sns: e.target.value // 只更新 name
                }))}
                required
            />
            <button className="updatebtn" id="uploadButton" onClick={handleUploadProfile}>更新完成</button>
        </div>
    );
};

export default ProfileComponent;