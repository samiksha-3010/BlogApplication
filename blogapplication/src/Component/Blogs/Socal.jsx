import { FacebookAuthProvider, TwitterAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './App.css';
import { auth } from './firebase';


function App() {

  /* ************** */
  // Sign-in With Google code
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      console.log('LOGGED USER', result.user);
    } catch (error) {
      console.log(error)
    }
  }

/* ************** */





/* ************** */
// Sign-in With FaceBook code

const signInWithFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();

    const result = await signInWithPopup(auth, provider);

    console.log('LOGGED USER', result.user);
  } catch (error) {
    console.log(error)
  }
}



/* ************** */






/* ************** */
// Sign-in With FaceBook code

const signInWithTwitter = async () => {
  try {
    const provider = new TwitterAuthProvider();

    const result = await signInWithPopup(auth, provider);

    console.log('LOGGED USER', result.user);
  } catch (error) {
    console.log(error)
  }
}



/* ************** */
  
  return (
    <div className="App">

       <div className="login-container">

        <h1>Register</h1>


        <button className="login-btn google" onClick={signInWithGoogle}>
          Sign In With Google
        </button>


        <button className="login-btn facebook" onClick={signInWithFacebook}>
          Sign In With Facebook
        </button>


        <button className="login-btn twitter" onClick={signInWithTwitter}>
          Sign In With Twitter
        </button>


      </div>


    </div>
  );
}

export default App;