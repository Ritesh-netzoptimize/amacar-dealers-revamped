// Pages/UnauthorizedPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Home, Mail, RefreshCw, Lock, Users, AlertCircle } from 'lucide-react';

const UnauthorizedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { requiredRole, userRole, attemptedPath } = location.state || {};

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-lg w-full">
        {/* Main Card */}
        <div className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center transform transition-all duration-700 ${
          isAnimating ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
        }`}>
          {/* Animated Icon Container */}
          <div className="relative mb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Shield className="h-12 w-12 text-red-500 animate-pulse" />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-400 rounded-full animate-bounce delay-300"></div>
          </div>

          {/* Error Message with better typography */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
            Oops! Access Denied
          </h1>
          
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            You don't have the required permissions to access this page. 
            <br className="hidden sm:block" />
            Don't worry, we'll help you get back on track!
          </p>

          

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col justify-center sm:flex-row gap-4 mb-8">
           
            
            <button
              onClick={() => navigate('/')}
              className="group flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:shadow-orange-500/25"
            >
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Go Home</span>
            </button>
          </div>

          {/* Additional Help Section */}
          <div className="space-y-4">
            <button
              onClick={handleRefresh}
              className="group flex items-center justify-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mx-auto"
            >
              <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-sm font-medium">Try Refreshing</span>
            </button>

           
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200/50">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Lock className="h-3 w-3" />
              <span>Secure access • Protected content</span>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-orange-300/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-300/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/2 -right-8 w-4 h-4 bg-purple-300/20 rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;