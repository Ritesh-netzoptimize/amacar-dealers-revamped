import api from '@/lib/api';
import { useState, useEffect, useCallback } from 'react';

const useEmailValidation = (email, isRegisterMode, shouldReset = false) => {
  const [validationState, setValidationState] = useState({
    isValidating: false,
    isDisposable: null,
    isEmailAvailable: null,
    isRegistered: null,
    error: null,
    isValid: null
  });

  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailFormatValid = email && emailRegex.test(email);

  // Reset validation state when shouldReset is true
  useEffect(() => {
    if (shouldReset) {
      setValidationState({
        isValidating: false,
        isDisposable: null,
        isEmailAvailable: null,
        isRegistered: null,
        error: null,
        isValid: null
      });
    }
  }, [shouldReset]);

  const checkEmailAvailability = useCallback(async (emailToCheck) => {
    try {
      const response = await api.post('/auth/check-email', { email: emailToCheck });
      
      if (!response.data.success) {
        // console.warn('⚠️ [EmailValidation] API returned success: false');
        throw new Error('Failed to check email availability');
      }
      
      const data = await response.data;
      const isRegistered = data.user_id !== false;
      return isRegistered;
    } catch (error) {
      // console.error('❌ [EmailValidation] Email availability check failed:', error);
      return false;
    }
  }, []);

  const checkDisposableEmail = useCallback(async (emailToCheck) => {
    

    if (!emailToCheck || !isEmailFormatValid) {
      setValidationState({
        isValidating: false,
        // isDisposable: null,
        isEmailAvailable: null,
        isRegistered: null,
        error: null,
        isValid: null
      });
      return;
    }

    setValidationState(prev => ({
      ...prev,
      isValidating: true,
      error: null
    }));

    try {
      // Random delay between 0-1000ms
      const randomDelay = Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, randomDelay));

      const response = await fetch(`https://disposable.debounce.io/?email=${encodeURIComponent(emailToCheck)}`);
      
      if (!response.ok) {
        throw new Error('Failed to validate email');
      }

      const data = await response.json();
      const isDisposable = data.disposable === 'true';
      

      // If email is disposable, stop here and show error
      if (isDisposable) {
        
        return;
      }

      // If not disposable, check email registration status
      const isRegistered = await checkEmailAvailability(emailToCheck);
      
      // Determine validation result based on mode
      let isValid;
      if (isRegisterMode) {
        // In register mode: valid if email is NOT registered (available for registration)
        isValid = !isRegistered;
      } else {
        // In login mode: valid if email IS registered (can login)
        isValid = isRegistered;
      }
      
      
      
      setValidationState({
        isValidating: false,
        isDisposable: false,
        isEmailAvailable: null,
        isRegistered,
        error: null,
        isValid
      });
    } catch (error) {
      setValidationState({
        isValidating: false,
        isDisposable: null,
        isEmailAvailable: null,
        isRegistered: null,
        error: error.message,
        isValid: null
      });
    }
  }, [isRegisterMode, isEmailFormatValid, checkEmailAvailability]);

  useEffect(() => {
    
    
    const timeoutId = setTimeout(() => {
      if (email && isEmailFormatValid) {
        checkDisposableEmail(email);
      } else if (email && !isEmailFormatValid) {
        // Reset validation state if email format is invalid
        setValidationState({
          isValidating: false,
          isDisposable: null,
          isEmailAvailable: null,
          isRegistered: null,
          error: null,
          isValid: null
        });
      } else {
        // console.log('⏭️ [EmailValidation] No validation needed - conditions not met');
      }
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(timeoutId);
    };
  // }, [email, isRegisterMode, isEmailFormatValid, checkDisposableEmail]);
  }, [email, isRegisterMode, isEmailFormatValid, checkDisposableEmail]);

  // Debug final validation state
  useEffect(() => {
    // console.log('📊 [EmailValidation] Current validation state:', validationState);
  }, [validationState]);

  return validationState;
};

export default useEmailValidation;
