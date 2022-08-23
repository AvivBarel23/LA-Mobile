import { changePassword, connectAsUser, signUpAsUser } from '../helpersTest.js';
import { findOne } from '../persist.js';
import User from '../models/userModel.js';

describe('Testing user routes', () => {
  test('Connect as admin user', async () => {
    const username = 'admin';
    const password = 'admin';
    const adminUser = await connectAsUser(username, password);
    (adminUser && adminUser.isAdmin).toBeTruthy();
  });
  test('Connect as non admin user', async () => {
    const username = 'test';
    const password = 'test';
    const user = await connectAsUser(username, password);
    (user && !user.isAdmin).toBeTruthy();
  });
  test('Sign up', async () => {
    const username = 'test';
    const password = 'test';
    const newUser = signUpAsUser(username, password);
    const user = await findOne(User, { username: username });
    user.not.toBeNull()(user.username).toEqual(newUser.username);
    user.email.toEqual(newUser.email);
    bcrypt.compareSync(password, user.password).toBeTruthy();
  });
  test('Change Password', async () => {
    const username = 'test';
    const email = 'test@gmail.com';
    const password = 'test';
    const newPassword = 'test123';
    const user = await connectAsUser(username, password);
    let headersAuthorization = { Authorization: `Bearer ${user.token}` };
    await changePassword(username, email, newPassword, headersAuthorization);
    const updatedUser = await findOne(User, { username: username });
    bcrypt.compareSync(password, updatedUser.password).toBeFalsy();
    bcrypt.compareSync(newPassword, updatedUser.password).toBeTruthy();
    headersAuthorization = { Authorization: `Bearer ${updatedUser.token}` };
    await changePassword(username, email, password, headersAuthorization);
  });
});
