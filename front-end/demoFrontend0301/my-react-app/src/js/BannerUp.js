export const uploadBanner = async (file1, file2, file3) => {

    try {

        const token = localStorage.getItem("token");

        // ❗沒 token，直接導回登入
        if (!token) {
            alert("尚未登入，請先登入！\n或點擊上面那隻胖胖的豬豬");
            return "unauthorized";
        }

        const formData = new FormData();
        const files = [file1, file2, file3];

        files.forEach(file => {
            if (file) {
                formData.append("banners", file); // <-- 多筆用相同 key
            }
        });

        const response = await fetch("http://3.113.186.54:9060/admin/banner/upload", {
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

        if (!response.ok) {
            const text = await response.text();
            alert("上傳失敗，請稍後再試");
            return null;
        }

        return "success";

    } catch (error) {
        console.error("Banner上傳失敗:", error);
        return null;
    }


}
