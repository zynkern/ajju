export const login = (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'aquatica123') {
    res.json({ success: true, token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
};
