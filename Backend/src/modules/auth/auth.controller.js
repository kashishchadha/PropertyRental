const asyncHandler = require('../../utils/asyncHandler');
const { signJwt } = require('../../utils/jwt');
const authService = require('./auth.service');

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  const token = signJwt({ sub: user.id, role: user.role });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: { user, token }
  });
});

const login = asyncHandler(async (req, res) => {
  const user = await authService.login(req.body);
  const token = signJwt({ sub: user.id, role: user.role });

  res.json({
    success: true,
    message: 'Login successful',
    data: { user, token }
  });
});

const me = asyncHandler(async (req, res) => {
  const user = await authService.getProfileById(req.user.sub);

  res.json({
    success: true,
    data: user
  });
});

module.exports = {
  register,
  login,
  me
};
