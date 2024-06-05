import React from 'react';

const ViewProfile = ({ user }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">View Profile</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">First Name:</p>
            <p>{user.firstName}</p>
          </div>
          <div>
            <p className="font-semibold">Last Name:</p>
            <p>{user.lastName}</p>
          </div>
          <div>
            <p className="font-semibold">Username:</p>
            <p>{user.username}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="font-semibold">Phone Number:</p>
            <p>{user.phoneNumber}</p>
          </div>
          <div>
            <p className="font-semibold">Address:</p>
            <p>{user.address}</p>
          </div>
          <div>
            <p className="font-semibold">Postal Code:</p>
            <p>{user.postalCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
