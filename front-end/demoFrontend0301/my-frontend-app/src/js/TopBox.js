export const fetchBanner = async () => {

    const response = await fetch("http://localhost:9060/banner/getBanners");

    if (!response.ok) {
        throw new Error("獲取失敗!");
    }

    return await response.json();
};