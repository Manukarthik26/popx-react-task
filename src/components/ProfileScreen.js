import React, { useRef, useState } from "react";
import "./ProfileScreen.css";
import tony26 from "../assets/tony26.jpg";

const ProfileScreen = () => {
  const userData = JSON.parse(localStorage.getItem("userProfile") || "{}");

  const displayName = userData.fullName || "Marry Doe";
  const displayEmail = userData.email || "Marry@Gmail.Com";

  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(
    localStorage.getItem("profileImage") || tony26,
  );
  const [animateHint, setAnimateHint] = useState(false);

  React.useEffect(() => {
    let interval;

    if (avatar === tony26) {
      setAnimateHint(true);
    } else {
      setAnimateHint(true);

      const stopTimer = setTimeout(() => {
        setAnimateHint(false);
      }, 1500);

      interval = setInterval(() => {
        setAnimateHint(true);
        setTimeout(() => setAnimateHint(false), 1500);
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(stopTimer);
      };
    }
  }, [avatar]);

  const [showWave, setShowWave] = useState(false);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setShowWave(true);

      setTimeout(() => {
        setShowWave(false);
      }, 1500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCameraClick = () => {
    console.log("Camera icon clicked");
    fileInputRef.current.click();
  };
  // anime
  const [showHint, setShowHint] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setAvatar(imageURL);
    localStorage.setItem("profileImage", imageURL);
  };

  return (
    <div className="profile-container">
      <h1 className="page-title">Account Settings</h1>

      <div className="profile-card">
        <div className="avatar-wrapper">
          <img src={avatar} alt={displayName} className="tony26" />

          <div
            className={`camera-icon ${showWave ? "pulse" : ""}`}
            onClick={handleCameraClick}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 17a5 5 0 100-10 5 5 0 000 10z"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M20 7h-3.2l-1.6-2h-6.4L7.2 7H4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
            {showHint && <span className="hint-text">Change photo</span>}
            {animateHint && (
              <span className="hint-text">
                {avatar === tony26 ? "Upload your photo" : "Change photo"}
              </span>
            )}
          </div>

          {/* Hidden input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <h2 className="name">{displayName}</h2>
        <p className="email">{displayEmail}</p>

        <p className="bio">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing <br />
          Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut <br />
          Labore Et Dolore Magna Aliquyam Erat, Sed Diam
        </p>

        <hr className="separator" />

        <p className="extra-text">
          {/* You can show more data here if you want */}
          Company: {userData.company || "Not provided"} <br />
          Agency: {userData.isAgency ? "Yes" : "No"}
        </p>

        <hr className="separator" />
      </div>
    </div>
  );
};

export default ProfileScreen;
