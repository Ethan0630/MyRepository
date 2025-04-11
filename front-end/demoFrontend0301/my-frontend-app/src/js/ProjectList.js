export const fetchAllProject = async () => {

    const response = await fetch(`http://13.115.110.126:9060/project/getAllProject`)

    if (!response.ok) {
        throw new Error("獲取失敗!");
    }

    return await response.json();

};