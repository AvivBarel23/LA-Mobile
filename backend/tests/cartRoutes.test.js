import {
  checkEqualityOfArrays,
  connectAsUser,
  getUserCart,
  getUserCartItemsAsAdmin,
  updateCart,
} from '../testHelpers.js';

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
