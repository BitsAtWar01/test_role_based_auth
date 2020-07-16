const router = require('express').Router();

//User Registeration Route
router.post("/register-user", async (req, res) => {});

//Admin Registeration Route
router.post("/register-admin", async (req, res) => {});

//Super Admin Registeration Route
router.post("/register-super-admin", async (req, res) => {});

//User Login Route
router.post("/login-user", async (req, res) => {});

//Admin Login Route
router.post("/login-admin", async (req, res) => {});

//Super Admin Login Route
router.post("/login-super-admin", async (req, res) => {});

//User Protected Route
router.post("/user-profile", async (req, res) => {});

//Admin Protected Route
router.post("/admin-profile", async (req, res) => {});

//Super Admin Protected Route
router.post("/super-admin-profile", async (req, res) => {});

module.exports = router;