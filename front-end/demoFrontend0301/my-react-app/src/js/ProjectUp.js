export const uploadProject = async (name, selectedIndustry, selectedCategory, files, description) => {
    try {
        const token = localStorage.getItem("token");

        // ❗沒 token，直接導回登入
        if (!token) {
            alert("尚未登入，請先登入！\n或點擊上面那隻胖胖的豬豬");
            return "unauthorized";
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("industry", selectedIndustry);
        formData.append("category", selectedCategory);
        formData.append("description", description);

        files.forEach(file => {
            if (file) {
                formData.append("images", file); // 不管是不是 null 都 append
            }
        });


        const response = await fetch("http://localhost:9060/admin/project/upload", {
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
        console.error("作品上傳失敗:", error);
        return null;
    }
};

export const updateProject = async (selectedId, selectedIndustry, selectedCategory, files, description) => {
    try {

        const token = localStorage.getItem("token");

        // ❗沒 token，直接導回登入
        if (!token) {
            alert("尚未登入，請先登入！\n或點擊上面那隻胖胖的豬豬");
            return "unauthorized";
        }
        const formData = new FormData();
        formData.append("id", selectedId);
        formData.append("industry", selectedIndustry);
        formData.append("category", selectedCategory);
        formData.append("description", description);

        files.forEach(file => {
            if (file) {
                formData.append("images", file); // 不管是不是 null 都 append
            }
        });


        const response = await fetch("http://localhost:9060/admin/project/update", {
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
            // 其他非 401 錯誤
            const text = await response.text(); // 避免 json() 出錯
            return null;
        }

        return "success";
    } catch (error) {
        console.error("作品更新失敗", error);
        return null; // 失敗時回傳 null
    }
};

export const fetchProjectName = async () => {
    const response = await fetch("http://localhost:9060/project/getAllName")

    if (!response.ok) {
        throw new Error("獲取失敗！");
    }
    return await response.json(); // ⬅️ 這行很重要
};

export const fetchProjectById = async (selectedId) => {

    const response = await fetch(`http://localhost:9060/project/getProjectById?id=${selectedId}`);
    if (!response.ok) {
        throw new Error("獲取失敗！");
    }
    return await response.json();
};

export const deleteProjectById = async (selectedId) => {

    try {

        const token = localStorage.getItem("token");

        // ❗沒 token，直接導回登入
        if (!token) {
            alert("尚未登入，請先登入！\n或點擊上面那隻胖胖的豬豬");
            return "unauthorized";
        }
        const response = await fetch(`http://localhost:9060/admin/project/delete?id=${selectedId}`, {
            method: "DELETE",
            headers: {
                // ✅ 關鍵：要帶上 token！
                "Authorization": "Bearer " + token
            },
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
        console.error("作品刪除失敗", error);
        return null; // 失敗時回傳 null
    }


};

