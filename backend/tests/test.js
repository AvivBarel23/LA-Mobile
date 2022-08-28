import {
  addProduct,
  changePassword,
  checkEqualityOfArrays,
  connectAsUser,
  deleteProduct,
  getProductById,
  getRandomSuffix,
  getUserCart,
  getUserCartItemsAsAdmin,
  signUpAsUser,
  updateCart,
  updateProduct,
  getProductByName,
} from '../testHelpers';

describe('Test Routes', () => {
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
  describe('Testing cart routes', () => {
    test('get user cart', async () => {
      const username = 'test';
      const password = 'test';
      const user = await connectAsUser(username, password);
      const products = [{ name: 'iphone' }, { name: 'macbook' }];

      await updateCart(user, products);
      const cartFromBackend = await getUserCart(
        `http://localhost:5000/api/cart?userId=6304f7bd66407bc0cf62b078`,
        user
      );
      checkEqualityOfArrays(cartFromBackend.cart.cartItems, products);
      await updateCart(user, []);
    });

    test('get user cart as admin user', async () => {
      const userAdmin = await connectAsUser('admin', 'admin');
      const testUser = await connectAsUser('test', 'test');

      const products = [{ name: 'iphone' }, { name: 'macbook' }];
      await updateCart(testUser, products);

      const cartItemsFromBackend = await getUserCartItemsAsAdmin(
        `http://localhost:5000/api/cart/admin/cartItems?userId=6304f7bd66407bc0cf62b078`,
        userAdmin
      );
      checkEqualityOfArrays(cartItemsFromBackend, products);
      await updateCart(testUser, []);
    });
  });
  describe('Testing product routes', () => {
    let adminUser;
    beforeAll(async () => {
      adminUser = await connectAsUser('admin', 'admin');
    });
    test('update new product', async () => {
      const name = 'test1';
      const slug = 'test1-slug';
      const price = '123456';
      const image = '/images/f78834a4-792f-4c41-a2c0-7811d1621289.png'; //how to upload an image -> can we compare two image ?
      const countInStock = 4;
      const description = 'test description';
      const data = {
        _id: '630a8f4318db4dbd90d7217b',
        name,
        slug,
        price,
        image,
        countInStock,
        description,
      };

      await updateProduct(
        'http://localhost:5000/api/products?id=630a8f4318db4dbd90d7217b',
        data,
        adminUser
      );
      const updatedProduct = await getProductByName(
        'http://localhost:5000/api/products?id=630a8f4318db4dbd90d7217b',
        adminUser
      );
      expect(updatedProduct.name).toEqual(name);
      expect(updatedProduct.slug).toEqual(slug);
      expect(updatedProduct.price).toEqual(price);
      expect(updatedProduct.countInStock).toEqual(countInStock);
      expect(updatedProduct.description).toEqual(description);
    });
    test('add product', async () => {
      const newProduct = await addProduct(adminUser);
      expect(newProduct.product).not.toBeNull();
      expect(newProduct.message).toEqual('Product Created');
    });

    test('delete product', async () => {
      await deleteProduct('http://localhost:5000/api/products?id=', adminUser);
      const notFoundProduct = await getProductById(
        'http://localhost:5000/api/products?id=',
        adminUser
      );
      expect(notFoundProduct.product).toBeNull();
      expect(notFoundProduct.message).toEqual('Product not found');
      expect(notFoundProduct.status).toEqual(404);
    });
  });
});
