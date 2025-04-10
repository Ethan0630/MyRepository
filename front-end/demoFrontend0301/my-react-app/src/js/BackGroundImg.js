export const uploadBackImg = async (file) => {

    const token = localStorage.getItem("token");

    // ❗沒 token，直接導回登入
    if (!token) {
        alert("尚未登入，請先登入！\n或點擊上面那隻胖胖的豬豬");
        return "unauthorized";
    }

    const formData = new FormData();
    formData.append("image", file);


    const response = await fetch("http://54.199.36.194:9060/admin/backImg/upload", {
        method: "POST",
        headers: {
            // ✅ 關鍵：要帶上 token！
            "Authorization": "Bearer " + token
        },
        body: formData
    });

    if (response.status === 401) {
        alert("登入逾時，請重新登入！\n或點擊上面那隻胖胖的豬豬");
        localStorage.removeItem("token");
        return "unauthorized";
    }

    if (!response.ok) {
        // 其他非 401 錯誤
        const text = await response.text(); // 避免 json() 出錯
        return null;
    }

    return "success";

};

export const fetchBackImg = async () => {

    const response = await fetch("http://54.199.36.194:9060/background/getBackgroundImg")
    if (!response.ok) {
        throw new Error("獲取失敗！");
    }
    return await response.json(); // ⬅️ 這行很重要


};