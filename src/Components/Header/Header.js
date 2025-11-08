import React, { useContext, useState } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function Header() {
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);

  const [searchTerm, setSearchTerm] = useState('');

  const sell = () => {
    history.push('/Create');
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        history.push('/login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  // 🔍 Handle Search
const handleSearch = async (e) => {
  e.preventDefault();
  if (!searchTerm.trim()) return;

  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);

    // Case-insensitive search for both name and category
    const results = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((item) => {
        const term = searchTerm.toLowerCase();
        return (
          item.name?.toLowerCase().includes(term) ||
          item.category?.toLowerCase().includes(term)
        );
      });

    if (results.length === 0) {
      alert(`No results found for "${searchTerm}"`);
      return;
    }

    // Navigate to search results
    history.push({
      pathname: '/search',
      state: { results, searchTerm },
    });
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
      <div
      className="brandName"
      onClick={() => history.push('/')}
      style={{ cursor: 'pointer' }}
      >
        <OlxLogo />
      </div>

        <div className="placeSearch">
          <Search />
          <input type="text" placeholder="Your Location" />
          <Arrow />
        </div>

        {/* 🔍 Search Bar */}
        <form className="productSearch" onSubmit={handleSearch}>
          <div className="input">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="searchAction" onClick={handleSearch}>
            <Search color="#ffffff" />
          </div>
        </form>

        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>

        <div className="loginPage">
          <span>{user ? `Welcome ${user.displayName}` : 'Login'}</span>
          <hr />
        </div>

        {user && (
          <span
            onClick={handleLogout}
            style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
          >
            Logout
          </span>
        )}

        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span onClick={sell}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
