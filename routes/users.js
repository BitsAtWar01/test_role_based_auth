const router = require('express').Router();
//Bring in User Registeration Function
const { 
    userRegister, 
    userLogin, 
    userAuth, 
    checkRole,
    serializeUser 
} = require('../utils/Auth')

//User Registeration Route
router.post("/register-user", async (req, res) => {
    await userRegister(req.body, 'user', res);
});

//Admin Registeration Route
router.post("/register-admin", async (req, res) => {
    await userRegister(req.body, 'admin', res);
});

//Super Admin Registeration Route
router.post("/register-super-admin", async (req, res) => {
    await userRegister(req.body, 'superadmin', res);
});

//User Login Route
router.post("/login-user", async (req, res) => {
    await userLogin(req.body, 'user', res)
});

//Admin Login Route
router.post("/login-admin", async (req, res) => {
    await userLogin(req.body, 'admin', res)
});

//Super Admin Login Route
router.post("/login-super-admin", async (req, res) => {
    await userLogin(req.body, 'superadmin', res)
});

//Profile Route
router.get('/profile', userAuth, (req, res) => {
    return res.json(serializeUser(req.user));
});

//User Protected Route
router.get("/user-protected", userAuth, checkRole(['user']), async (req, res) => {});

//Admin Protected Route
router.get("/admin-protected", userAuth, checkRole(['admin', 'superadmin']), async (req, res) => {
    return res.json("Hello World");
});

//Super Admin Protected Route
router.get("/super-admin-protected", userAuth, checkRole(['superadmin']), async (req, res) => {
    return res.json("Hello World");
});

module.exports = router;