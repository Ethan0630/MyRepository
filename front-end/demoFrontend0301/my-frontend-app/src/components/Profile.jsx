import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor, faSchool, faLocationDot, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import "../css/Profile.css";
import { fetchProfileImg } from "../js/Profile.js"

const Profile = () => {

    const [image, setImage] = useState(null);
    const [name, setName] = useState("你的姓名");
    const [occupation, setOccupation] = useState("你的職業");
    const [education, setEducation] = useState("你的學歷");
    const [region, setRegion] = useState("你的位置");
    const [snsLinkText, setSnsLinkText] = useState("你的sns-link");
    const [snsLinkUrl, setSnsLinkUrl] = useState("#");

    useEffect(() => {
        const getProfile = async () => {
            const data = await fetchProfileImg();
            setImage(data.base64Img);
            setName(data.name);
            setOccupation(data.occupation);
            setEducation(data.education);
            setRegion(data.region);
            setSnsLinkText(data.snsName);
            setSnsLinkUrl(data.sns);
        }

        getProfile();

    }, []);
    return (
        <div className="col-4 left-bar flex-grow-1">
            <div className="profile-circle">
                <img src={image} alt="預覽圖" className="profile-image" />
            </div>
            <div className="profile-name">
                <p>{name || "請輸入姓名"}</p>
            </div>
            <div className="profile" id="profile-occupation">
                <FontAwesomeIcon icon={faUserDoctor} />
                <p>{occupation || "請輸入職業"}</p>
            </div>
            <div className="education">
                <FontAwesomeIcon icon={faSchool} />
                <p>{education || "請輸入學歷"}</p>
            </div>
            <div className="profile" id="region">
                <FontAwesomeIcon icon={faLocationDot} />
                <p>{region || "請輸入地區"}</p>
            </div>
            <div className="profile" id="profile-sns">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                <a href={snsLinkUrl || "#"} target="_blank" rel="noreferrer">
                    {snsLinkText || "請輸入社群連結"}
                </a>
            </div>
        </div>
    );
};

export default Profile;
