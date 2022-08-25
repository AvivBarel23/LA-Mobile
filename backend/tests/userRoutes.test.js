import {
  changePassword,
  connectAsUser,
  getRandomSuffix,
  signUpAsUser,
} from '../helpersTest.js';


describe('Testing user routes', () => {
  test('Connect as admin user', async () => {
    const username = 'admin';
    const password = 'admin';
    const adminUser = await connectAsUser(username, password);
    expect(adminUser.isAdmin).toBeTruthy();
  });

  test('Connect as non admin user', async () => {
    const username = 'test';
    const password = 'test';
    const user = await connectAsUser(username, password);
    expect(user && !user.isAdmin).toBeTruthy();
  });
  test('Sign up', async () => {
    const suffix = getRandomSuffix();
    const username = `test${suffix}`;
    const password = `test${suffix}`;
    const email = `test${suffix}@gmail.com`;
    const newUser = await signUpAsUser(username, email, password);
    expect(newUser).not.toBeNull();
    expect(newUser.username).toEqual(username);
    expect(newUser.email).toEqual(email);
    const user = await connectAsUser(username, password);
    expect(user).not.toBeNull();
    expect(user.username).toEqual(username);
    expect(user.email).toEqual(email);
  });
  test('Change Password', async () => {
    const username = 'test';
    const email = 'test@gmail.com';
    const password = 'test';
    const newPassword = 'test123';
    //connect to user
    const user = await connectAsUser(username, password);
    let headersAuthorization = { Authorization: `Bearer ${user.token}` };

    //change password
    const updatedUser = await changePassword(
      username,
      email,
      newPassword,
      headersAuthorization
    );
    const updatedUserEmail = `${updatedUser.email}`;

    //connect with new password
    const userWithNewPassword = await connectAsUser(username, newPassword);
    //check user still exist
    expect(updatedUser).not.toBeUndefined();
    expect(userWithNewPassword).not.toBeUndefined();
    expect(updatedUserEmail).toEqual(userWithNewPassword.email);

    //reverting to original password
    headersAuthorization = {
      Authorization: `Bearer ${userWithNewPassword.token}`,
    };
    const originalUser = await changePassword(
      username,
      email,
      password,
      headersAuthorization
    );
    expect(originalUser).not.toBeUndefined();
    expect(originalUser.email).toEqual(email);
  });
});
