
export const fetchProfile = async () => {
    try {
        const response = await fetch("http://3.113.186.54:9060/profile/getProfile");
        if (!response.ok) throw new Error("個人資料讀取錯誤");
        return await response.json();
    } catch (error) {
        return [];
    }
};

export const uploadProfile = async (profile) => {
    try {

        const token = localStorage.getItem("token");

        // ❗沒 token，直接導回登入
        if (!token) {
            alert("尚未登入，請先登入！\n或點擊上面那隻胖胖的豬豬");
            return "unauthorized";
        }
        const response = await fetch("http://3.113.186.54:9060/admin/profile/uploadProfile", {
            method: "PUT",  // 設定為 PUT，符合後端的 @PutMapping
            headers: {
                // ✅ 關鍵：要帶上 token！
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json" // ✅ 加上這個
            },
            body: JSON.stringify(profile), // 將 profile 轉為 JSON 字串傳遞
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
        return await response.json();
    } catch (error) {
        console.error("上傳個人資料失敗", error);
        return null; // 失敗時回傳 null
    }
};
