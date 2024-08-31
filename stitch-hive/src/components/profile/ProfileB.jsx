  import React, { useState, useEffect } from 'react';
  import './styles/ProfileB.css';
  import { Link, useParams } from 'react-router-dom';
  import Blogo from './styles/B.png';

  const ProfileB = () => {
    const { email } = useParams();

    const [profileData, setProfileData] = useState(null);
    const [tailorEmail, setTailorEmail] = useState('');
    const [isHiring, setIsHiring] = useState(false);

    useEffect(() => {
      fetch(`http://localhost:4000/profile/boutique-owner/${email}`)
        .then((response) => response.json())
        .then((data) => setProfileData(data))
        .catch((error) => console.error('Error fetching profile:', error));
    }, [email]);

    const handleHireTailor = () => {
      setIsHiring(true);

      fetch(`http://localhost:4000/hire-tailor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ b_email: email, t_email: tailorEmail }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the success and set appropriate state
          console.log('Tailor hired successfully', data);
        })
        .catch((error) => {
          // Handle the error and set appropriate state
          console.error('Error hiring tailor:', error);
        });
    };

    if (!profileData) {
      return <div>Loading...</div>;
    }

    return (
      <div className="profile-container">
        <h2 className="profile-heading">Boutique Owner Profile</h2>
        <div className="Boutique-info">
          <div className="Boutique-avatar">
            <img src={Blogo} alt="Logo" className="logo-image" />
          </div>
          <div className="profile-details">
            <h3>Boutique Owner's Name</h3>
            <p>Email: {profileData.b_email}</p>
            <p>Phone: {profileData.b_contact}</p>
            <p>Boutique Name: {profileData.b_boutique_name}</p>
            <p>Location: {profileData.b_location}</p>
          </div>
        </div>

        {isHiring ? (
          <div>
            <p>Hiring in progress...</p>
          </div>
        ) : (
          <div className="hire-tailor-section">
            <h3>Hire a Tailor</h3>
            <p>Enter the tailor's email to hire:</p>
            <input
              type="text"
              value={tailorEmail}
              onChange={(e) => setTailorEmail(e.target.value)}
            />
            <button onClick={handleHireTailor}>Hire Tailor</button>
          </div>
        )}
      </div>
    );
  };

  export default ProfileB;


// import React, { useState, useEffect } from 'react';
// import './styles/ProfileB.css';
// import { Link, useParams } from 'react-router-dom'; // Import useParams
// import Blogo from './styles/B.png';

// const ProfileB = () => {
//   const { email } = useParams(); // Get the email parameter from the URL

//   const [profileData, setProfileData] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:4000/profile/boutique-owner/${email}`)
//       .then((response) => response.json())
//       .then((data) => setProfileData(data))
//       .catch((error) => console.error('Error fetching profile:', error));
//   }, [email]);

//   if (!profileData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile-container">
//       <h2 className="profile-heading">Boutique Owner Profile</h2>
//       {/* Display profile data here */}
//       <div className="Boutique-info">
//         <div className="Boutique-avatar">
//           <img src={Blogo} alt="Logo" className="logo-image" />
//         </div>
//         <div className="profile-details">
//           <h3>Boutique Owner's Name</h3>
//           <p>Email: {profileData.b_email}</p>
//           <p>Phone: {profileData.b_contact}</p>
//           <p>Boutique Name: {profileData.b_boutique_name}</p>
//           <p>Location: {profileData.b_location}</p>
//         </div>
//       </div>

//       <div className="hire-tailor-section">
//         <h3>Hire a Tailor</h3>
//         <p>Click below to hire a tailor for your boutique:</p>
//         <Link to="/Tailor" className="hire-button">
//           Hire a Tailor
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProfileB;

