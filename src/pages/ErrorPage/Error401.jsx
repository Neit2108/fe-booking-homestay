import React from 'react';

const Error401 = () => {
  return (
    <div className="bg-red-600 text-white flex items-center justify-center min-h-screen px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-6">Error 401 - Unauthorized</h1>
        <p className="text-lg leading-relaxed">
          The <strong>401 (Unauthorized)</strong> status code indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
          <br /><br />
          The server generating a 401 response <strong>MUST</strong> send a <code className="bg-white/10 px-2 py-1 rounded text-sm">WWW-Authenticate</code> header field containing at least one challenge applicable to the target resource.
        </p>

        <button
          onClick={() => window.location.href = '/'}
          className="mt-8 px-6 py-3 bg-white text-red-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
};

export default Error401;
