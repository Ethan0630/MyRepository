export const fetchCategories = async () => {
    try {
        const response = await fetch("http://3.113.186.54:9060/cat/getCategories");
        if (!response.ok) throw new Error("獲取類別失敗");
        return await response.json(); // ✅ 確保回傳 Promise
    } catch (error) {
        console.error("獲取類別失敗:", error);
        return []; // ✅ 確保回傳 `[]`，避免 `undefined` 錯誤
    }
};


// ✅ 新增類別
export const uploadCategory = async (categoryName) => {
    try {

        const token = localStorage.getItem("token");

        // ❗沒 token，直接導回登入
        if (!token) {
            alert("尚未登入，請先登入！\n或點擊上面那隻胖胖的豬豬");
            return "unauthorized";
        }
        const formData = new FormData();
        formData.append("category", categoryName); // ✅ 確保符合 `@RequestParam("category")`

        const response = await fetch("http://3.113.186.54:9060/admin/cat/upload", {
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
    } catch (error) {
        console.error("類別上傳失敗:", error);
        return null; // ✅ 確保發生錯誤時不會影響前端
    }
};

export const deleteCategory = async (selectedCategory) => {

    if (!selectedCategory) { // ✅ 確保有選擇類別
        alert("請選擇要刪除的類別！");
        return;
    }

    try {

        const token = localStorage.getItem("token");

        // ❗沒 token，直接導回登入
        if (!token) {
            alert("尚未登入，請先登入！\n或點擊上面那隻胖胖的豬豬");
            return "unauthorized";
        }
        const response = await fetch(`http://3.113.186.54:9060/admin/cat/delete/${selectedCategory}`, {
            method: "DELETE",
            headers: {
                // ✅ 關鍵：要帶上 token！
                "Authorization": "Bearer " + token
            }
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

        return "success"; // ✅ 回傳 "success"，讓前端知道刪除成功
    } catch (error) {
        console.error("類別刪除失敗:", error);
        return null; // ❌ 失敗時回傳 `null`
    }
};

