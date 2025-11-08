import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import { AuthContext,FirebaseContext } from './store/Context';
import { useContext,useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Posts from './Components/Posts/Posts';
import About from "./Components/About/About";

function App() {
  const {user,setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  const auth = getAuth(firebase);

     useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // cleanup listener when component unmounts
    return () => unsubscribe();
  }, [auth]);

  return (
    <BrowserRouter>
      <Route exact path="/">  <>{user ? <Home /> : <Login />}</>  </Route>
      <Route path="/signup">  <Signup/>  </Route>
      <Route path="/login">  <Login/>  </Route>
      <Route path="/create">  <Create/>  </Route>
      <Route path="/product/:id"><ViewPost/></Route>
      <Route path="/search"  ><Posts/></Route>
      <Route path="/about" ><About/></Route>
      
    </BrowserRouter>
  );  
}

export default App;
 