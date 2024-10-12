// // src/pages/Profile.jsx
// import React,{useState} from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { GiftIcon, SnowflakeIcon, TreePineIcon, LogOutIcon } from 'lucide-react'
// const Profile = () => {
//   const { user, logout } = useAuth();
//   const [isEditing, setIsEditing] = useState(false)

//   const [user1, setUser1] = useState({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     bio: 'I am a software developer passionate about creating user-friendly applications.',
//     avatar: '/placeholder.svg?height=100&width=100'
//   })

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setUser1(prevUser => ({
//       ...prevUser,
//       [name]: value
//     }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // Here you would typically send the updated user data to your backend
//     console.log('Updated user:', user1)
//     setIsEditing(false)
//   }

 
//   const handleLogout = () => {
//     logout();
//   };




  // return (
  //  <div className="mt-16 max-w-md w-full mx-auto bg-white rounded-lg shadow-xl overflow-hidden relative my-10">
  //     <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#861810] via-[#ffffff] to-[#861810]"></div>
  //     <div className="px-6 py-8">
  //       <div className="text-center mb-8">
  //         <div className="relative inline-block">
  //           <img
  //             className="w-32 h-32 rounded-full border-4 border-green-500 shadow-lg"
  //             src={user1.avatar}
  //             alt={user1.name}
  //           />
  //           <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2">
  //             <TreePineIcon className="w-6 h-6 text-white" />
  //           </div>
  //         </div>
  //         <h2 className="mt-4 text-3xl font-bold text-gray-800">{user1.name}</h2>
  //         <p className="text-gray-600">{user.email}</p>
  //       </div>
        
  //       <form onSubmit={handleSubmit} className="space-y-6">
  //         {isEditing && (
  //           <div>
  //             <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
  //             <input
  //               type="text"
  //               id="avatar"
  //               name="avatar"
  //               value={user1.avatar}
  //               onChange={handleInputChange}
  //               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
  //               placeholder="Enter avatar URL"
  //             />
  //           </div>
  //         )}
  //         <div>
  //           <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
  //           <input
  //             type="text"
  //             id="name"
  //             name="name"
  //             value={user1.name}
  //             onChange={handleInputChange}
  //             disabled={!isEditing}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
  //           <input
  //             type="email"
  //             id="email"
  //             name="email"
  //             value={user1.email}
  //             onChange={handleInputChange}
  //             disabled={!isEditing}
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
  //           />
  //         </div>
  //         <div>
  //           <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
  //           <textarea
  //             id="bio"
  //             name="bio"
  //             value={user1.bio}
  //             onChange={handleInputChange}
  //             disabled={!isEditing}
  //             rows="4"
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
  //           ></textarea>
  //         </div>
  //       </form>
  //     </div>
      
  //     <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
  //       <button
  //         onClick={handleLogout}
  //         className=" px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
  //       >
  //         <LogOutIcon className="w-5 h-5 mr-2"  />
  //         Logout
  //       </button>
  //       <div className="flex space-x-3">
  //         {isEditing ? (
  //           <>
  //             <button
  //               onClick={() => setIsEditing(false)}
  //               className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
  //             >
  //               <SnowflakeIcon className="w-5 h-5 mr-2" />
  //               Cancel
  //             </button>
  //             <button
  //               onClick={handleSubmit}
  //               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
  //             >
  //               <GiftIcon className="w-5 h-5 mr-2" />
  //               Save Changes
  //             </button>
  //           </>
  //         ) : (
  //           <button
  //             onClick={() => setIsEditing(true)}
  //             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
  //           >
  //             <TreePineIcon className="w-5 h-5 mr-2" />
  //             Edit Profile
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
// };

// export default Profile;


// src/pages/Profile.jsx
import React,{useState} from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GiftIcon, SnowflakeIcon, TreePineIcon, LogOutIcon } from 'lucide-react'
const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false)
  console.log(user)

 
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the updated user data to your backend
    console.log('Updated user:', user1)
    setIsEditing(false)
  }

 
  const handleLogout = () => {
    logout();
  };




  return (
   <div className="mt-24 max-w-md w-full mx-auto bg-white rounded-lg shadow-xl overflow-hidden relative my-10">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#861810] via-[#ffffff] to-[#861810]"></div>
      <div className="px-6 py-8">
        <div className="text-center mb-8 ">
          <div className="relative inline-block">
            {/* <img
              className="w-32 h-32 rounded-full border-4 border-green-500 shadow-lg"
              src={user1.avatar}
              alt={user1.name}
            />
            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2">
              <TreePineIcon className="w-6 h-6 text-white" />
            </div> */}
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-800">{user.username}</h2>
          <p className="text-black">{user.email}</p>
    
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 text-black text-center" >
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Fisrt Name</label>
            <input
              type="text"
              id="Firstname"
              name="Firstname"
              value={user.FirstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3  py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            />
            
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium  mb-1">Last Name</label>
            <input
              type="text"
              id="Lastname"
              name="Lasttname"
              value={user.LastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            />
            
          </div>

          
          <div>
            <label htmlFor="email" className="block text-sm font-medium  mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            />
          </div>
       
        </form>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
        <button
          onClick={handleLogout}
          className=" px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
        >
          <LogOutIcon className="w-5 h-5 mr-2"  />
          Logout
        </button>
        <div className="flex space-x-3">

          
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
              >
                <SnowflakeIcon className="w-5 h-5 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
              >
                <GiftIcon className="w-5 h-5 mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
            >
              <TreePineIcon className="w-5 h-5 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
