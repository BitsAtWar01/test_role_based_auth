const router = require('express').Router();
//Bring in User Registeration Function
const { userRegister, userLogin } = require('../utils/Auth')

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
router.get('/profile', (req, res) => {});

//User Protected Route
router.post("/user-protected", async (req, res) => {});

//Admin Protected Route
router.post("/admin-protected", async (req, res) => {});

//Super Admin Protected Route
router.post("/super-admin-protected", async (req, res) => {});

module.exports = router;