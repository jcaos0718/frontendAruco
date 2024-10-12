// const Register = () => {
//     return (
//         <div className="flex flex-col items-center justify-center h-screen text-white p-4">
//             <div className="w-full justify-center max-w-4xl flex gap-4">
//                 <div className="bg-gray-800-transparent p-6 rounded-lg">
//                     <h2 className="text-2xl text-center font-bold mb-4">Sign Up</h2>
//                     <form className="flex flex-col space-y-4">
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             className="p-2 rounded border border-gray-600 bg-gray-700 text-white text-center"
//                             required
//                         />
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             className="p-2 rounded border border-gray-600 bg-gray-700 text-white text-center"
//                             required
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             className="p-2 rounded border border-gray-600 bg-gray-700 text-white text-center"
//                             required
//                         />
//                         <button
//                             type="submit"
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
//                         >
//                             Register
//                         </button>
//                     </form>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Register;

// src/pages/Register.jsx
import { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(username, email,firstName,lastName, password);
      setSuccess('Registration successful! You can now log in.');
      navigate('/SignIn');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white p-4">
      <div className="w-full justify-center max-w-4xl flex gap-4">
        <div className="bg-gray-800-transparent p-6 rounded-lg">
          <h2 className="text-2xl text-center font-bold mb-4">Sign Up</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 rounded border border-gray-600 bg-gray-700 text-white text-center"
              required
            />

            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-2 rounded border border-gray-600 bg-gray-700 text-white text-center"
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-2 rounded border border-gray-600 bg-gray-700 text-white text-center"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded border border-gray-600 bg-gray-700 text-white text-center"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded border border-gray-600 bg-gray-700 text-white text-center"
              required
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
