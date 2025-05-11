
export const uploadImage = async (selectedCategory, image, description) => {
    try {
        const formData = new FormData();
        formData.append("category", selectedCategory);
        formData.append("image", image);
        formData.append("description", description);

        const response = await fetch("http://localhost:9060/pic/upload", {
            method: "POST",
            body: formData
        });

        if (!response.ok) throw new Error("作品上傳失敗");

        return "success";
    } catch (error) {
        console.error("作品上傳失敗:", error);
        return null; // ✅ 確保發生錯誤時不會影響前端
    }
};
