export const fetchBanner = async () => {

    const response = await fetch("http://3.113.186.54:9060/banner/getBanners");

    if (!response.ok) {
        throw new Error("獲取失敗!");
    }

    return await response.json();
};