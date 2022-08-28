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
    const name = 'Test product';
    const slug = 'test-product';
    const price = 100;
    const image = '/images/f78834a4-792f-4c41-a2c0-7811d1621289.png'; //how to upload an image -> can we compare two image ?
    const countInStock = 1;
    const description = 'This is a test product';
    const data = {
      _id: '6300d4f05246a81441a4cef2',
      name,
      slug,
      price,
      image,
      countInStock,
      description,
    };

    beforeAll(async () => {
      adminUser = await connectAsUser('admin', 'admin');
    });

    test('add product', async () => {
      const newProduct = await addProduct(adminUser, data);
      data._id = newProduct.product._id;
      expect(newProduct.product).not.toBeNull();
      expect(newProduct.message).toEqual('Product Created');
    });

    test('update new product', async () => {
      await updateProduct(
        `http://localhost:5000/api/products/${data._id}`,
        data,
        adminUser
      );
      const updatedProduct = await getProductByName(
        `http://localhost:5000/api/products/${data._id}`,
        adminUser
      );

      expect(updatedProduct.name).toEqual(name);
      expect(updatedProduct.slug).toEqual(slug);
      expect(updatedProduct.price).toEqual(price);
      expect(updatedProduct.countInStock).toEqual(countInStock);
      expect(updatedProduct.description).toEqual(description);
    });

    test('delete product', async () => {
      const productId = '6300d4f05246a81441a4cef2';
      await deleteProduct(
        `http://localhost:5000/api/products/${productId}`,
        adminUser
      );
      const notFoundProduct = await getProductById(
        `http://localhost:5000/api/products/${productId}`,
        adminUser
      );
      expect(notFoundProduct.product).toBeUndefined();
      expect(notFoundProduct.message).toEqual("Product doesn't exist");
    });
  });
});
