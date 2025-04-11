export const fetchProfileImg = async () => {
    const response = await fetch("http://13.115.110.126:9060/profile/getProfile")

    if (!response.ok) {
        throw new Error("獲取失敗！");
    }
    return await response.json(); // ⬅️ 這行很重要

};