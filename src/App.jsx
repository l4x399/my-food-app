import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";

import { getUserInfo } from "./api";

import NavBar from "./components/NavBar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Recipe from "./pages/Recipe.jsx";
import Favorites from "./pages/Favorites.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import AdvancedSearch from "./pages/AdvancedSearch.jsx";
import UploadRecipe from "./pages/UploadRecipe.jsx";
import Recipe2 from "./pages/Recipe2.jsx";
import UploadedRecipes from "./pages/UploadedRecipes.jsx";
import EditRecipe from "./pages/EditRecipe.jsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);
    const [user, setUser] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        mobilenumber: ''
    });
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            getUserInfo(userId)
            .then(res => {setUser(res.data);})
            .catch(err => {console.log(err)});
        }
    }, [userId]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.replace('/');
    };

    return (
        <Router>

        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} user={user} />

        <div className="container" style={{'marginTop':'1.25rem'}}>

        <Switch>
        <Route path="/register">
            <Register />
        </Route>
        <Route path="/login">
            <Login setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <PrivateRoute exact path="/" isLoggedIn={isLoggedIn}>
            <Home user={user} />
        </PrivateRoute>
        <PrivateRoute path="/profile" isLoggedIn={isLoggedIn}>
            <UserProfile handleLogout={handleLogout} user={user} />
        </PrivateRoute>
        <PrivateRoute path="/recipe/TheMealDB/:id" isLoggedIn={isLoggedIn}>
            <Recipe userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/favorites" isLoggedIn={isLoggedIn}>
            <Favorites user={user} userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/edit" isLoggedIn={isLoggedIn}>
            <EditProfile user={user} userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/search" isLoggedIn={isLoggedIn}>
            <AdvancedSearch />
        </PrivateRoute>
        <PrivateRoute path="/upload" isLoggedIn={isLoggedIn}>
            <UploadRecipe user={user} userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/recipe/User-uploaded/:id" isLoggedIn={isLoggedIn}>
            <Recipe2 user={user} userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/recipe/User-uploaded" isLoggedIn={isLoggedIn}>
            <UploadedRecipes userId={userId} />
        </PrivateRoute>
        <PrivateRoute path="/recipe/edit/:id" isLoggedIn={isLoggedIn}>
            <EditRecipe userId={userId} />
        </PrivateRoute>
        </Switch>

        </div>

        </Router>
    );
}

export default App;
