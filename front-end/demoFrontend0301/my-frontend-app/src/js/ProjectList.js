export const fetchAllProject = async () => {

    const response = await fetch(`http://54.199.36.194:9060/project/getAllProject`)

    if (!response.ok) {
        throw new Error("獲取失敗!");
    }

    return await response.json();

};