
export const uploadImage = async (imageBlob) => {

    try {
        const token = localStorage.getItem("token");

        // ❗沒 token，直接導回登入
        if (!token) {
            alert("尚未登入，請先登入！\n或點擊上面那隻胖胖的豬豬");
            return "unauthorized";
        }
        // **建立 `FormData`**
        const formData = new FormData();
        formData.append("image", imageBlob);

        const response = await fetch("http://3.113.186.54:9060/admin/profile/uploadImg", {
            method: "PUT",
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

        if (!response.ok) throw new Error("照片上傳失敗");

        return "success";
    } catch (error) {
        console.error("照片上傳失敗:", error);
        return null; // ✅ 確保發生錯誤時不會影響前端
    }
};