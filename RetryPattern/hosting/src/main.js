import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Firebase configuration 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase authentication
const auth = getAuth(app);

// DOM Elements for Login form
const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');
const loginError = document.getElementById('login-error');
const showRegisterLink = document.getElementById('show-register');

// DOM Elements for Register form
const registerForm = document.getElementById('register-form');
const registerEmailInput = document.getElementById('register-email');
const registerPasswordInput = document.getElementById('register-password');
const registerConfirmPasswordInput = document.getElementById('register-confirm-password');
const registerButton = document.getElementById('register-button');
const registerError = document.getElementById('register-error');
const registerSuccess = document.getElementById('register-success');
const showLoginLink = document.getElementById('show-login');

// DOM Elements for User info
const userInfo = document.getElementById('user-info');
const userEmailSpan = document.getElementById('user-email');
const logoutButton = document.getElementById('logout-button');

document.addEventListener('DOMContentLoaded', () => {

  registerForm.style.display = 'none';
  userInfo.style.display = 'none';
  loginForm.style.display = 'block';
  
  showRegisterLink.addEventListener('click', () => {
    userInfo.style.display = 'none';
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  });

  showLoginLink.addEventListener('click', () => {
    userInfo.style.display = 'none';
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  });

  // Register functionality
  registerButton.addEventListener('click', () => {
    const email = registerEmailInput.value;
    const password = registerPasswordInput.value;
    const confirmPassword = registerConfirmPasswordInput.value;
    
    // Clear previous error/success messages
    registerError.textContent = '';
    registerSuccess.textContent = '';

    // Check if email is valid
    if (!registerEmailInput.validity.valid) {
      registerError.textContent = 'Please enter a valid email address';
      return;
    }
    
    // Form validation
    if (!email || !password || !confirmPassword) {
      registerError.textContent = 'All fields are required';
      return;
    }
    
    if (password !== confirmPassword) {
      registerError.textContent = 'Passwords do not match';
      return;
    }
    
    // Firebase registration with retry pattern
    // createUserWithEmailAndPassword is an asynchronous built-in function in Firebase,
    // This function will return a Promise that resolves with the user credential object
    retryOperation(() => createUserWithEmailAndPassword(auth, email, password), 3)
      .then((userCredential) => {
        
        return signOut(auth).then(() => {
          registerSuccess.textContent = 'Registration successful! Please log in.';
          registerEmailInput.value = '';
          registerPasswordInput.value = '';
          registerConfirmPasswordInput.value = '';
          
          // Switch to login form after 2 seconds
          setTimeout(() => {
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
          }, 2000);
        });

      })
      .catch((error) => {
        const errorMessage = getReadableErrorMessage(error.code);
        registerError.textContent = errorMessage;
      });
  });

  // Login functionality
  loginButton.addEventListener('click', () => {
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;
    
    // Clear previous error message
    loginError.textContent = '';
    
    // Form validation
    if (!email || !password) {
      loginError.textContent = 'Email and password are required';
      return;
    }
    
    // Firebase login with retry pattern
    retryOperation(() => signInWithEmailAndPassword(auth, email, password), 3)
      .then((userCredential) => {

        const user = userCredential.user;
        loginEmailInput.value = '';
        loginPasswordInput.value = '';

      })
      .catch((error) => {
        const errorMessage = getReadableErrorMessage(error.code);
        loginError.textContent = errorMessage;
      });
  });

  // Logout functionality
  logoutButton.addEventListener('click', () => {
    signOut(auth)
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  });
});

// Authentication state observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    userEmailSpan.textContent = user.email;
    userInfo.style.display = 'block';
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
  } else {
    // User is signed out
    userInfo.style.display = 'none';
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  }
});

// Retry Pattern Implementation
// An asynchronous function that performs an operation with maximum 3 retries
async function retryOperation(operation, maxRetries = 3, delay = 1000) {

  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {

      console.log(`🔄 Attempt ${attempt + 1}/${maxRetries}: Starting operation...`);
      const startTime = new Date();

      // Execute the operation
      const result = await operation();

      const endTime = new Date();
      const duration = endTime - startTime;
      console.log(`✅ Attempt ${attempt + 1}/${maxRetries}: Operation successful (${duration}ms)`);
      
      return result;

    } catch (error) {
      lastError = error;
      const timestamp = new Date().toISOString();
      
      // Log detailed error information
      console.group(`❌ Attempt ${attempt + 1}/${maxRetries} failed at ${timestamp}`);
      console.log(`Error code: ${error.code || 'unknown'}`);
      console.log(`Error message: ${error.message}`);
      console.log(`Error details:`, error);
      
      // Check if error is retryable
      if (!isRetryableError(error) || attempt === maxRetries - 1) {
        console.log(`🛑 Not retrying: ${!isRetryableError(error) ? 'Non-retryable error' : 'Maximum retries reached'}`);
        console.groupEnd();
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const retryDelay = delay * Math.pow(2, attempt);
      console.log(`⏱️ Waiting ${retryDelay}ms before retry ${attempt + 2}...`);
      console.groupEnd();
      
      // Wait before next attempt with exponential backoff
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
  
  throw lastError;
}


// Helper function to determine if an error is retryable
function isRetryableError(error) {
  // Define which Firebase errors should be retried
  const retryableCodes = [
    'auth/network-request-failed',
    'auth/too-many-requests',
    'auth/internal-error'
  ];
  
  return retryableCodes.includes(error.code);
}

// Helper function to convert Firebase error codes to readable messages
function getReadableErrorMessage(errorCode) {
  const errorMessages = {
    'auth/email-already-in-use': 'Email address is already in use',
    'auth/invalid-email': 'Email address is not valid',
    'auth/operation-not-allowed': 'Email/password accounts are not enabled',
    'auth/weak-password': 'Password is too weak',
    'auth/user-disabled': 'This account has been disabled',
    'auth/user-not-found': 'Email or password is incorrect',
    'auth/wrong-password': 'Email or password is incorrect',
    'auth/too-many-requests': 'Too many attempts. Please try again later',
    'auth/network-request-failed': 'Network error. Please check your connection'
  };
  
  return errorMessages[errorCode] || 'An unknown error occurred';
}


