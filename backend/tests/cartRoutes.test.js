import {
  checkEqualityOfArrays,
  connectAsUser,
  updateCart,
} from '../helpersTest.js';
import { findOne } from '../persist.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { fetchData } from '../fetch.js';
import Cart from '../models/cartModel.js';

describe('Testing cart routes', () => {
  test('get user cart', async () => {
    const username = 'test';
    const password = 'test';
    const user = await connectAsUser(username, password);
    const products = [
      await findOne(Product, { slug: 'iphone-13-pro-max' }),
      await findOne(User, { slug: 'airpods-pro' }),
      await findOne(User, { slug: 'macbook-pro-13' }),
    ];
    await updateCart(user, products);

    const cartFromBackend = await fetchData(
      `/api/cart`,
      { userId: user._id },
      'GET',
      {
        Authorization: `Bearer ${user.token}`,
      }
    );
    const cartFromDB = await findOne(Cart, { userId: user._id });
    checkEqualityOfArrays(cartFromBackend.cartItems, cartFromDB.cartItems);
    await updateCart(user, []);
  });

  test('get user cart as admin user', async () => {
    const userAdmin = await connectAsUser('admin', 'admin');
    const testUser = await connectAsUser('test', 'test');

    const products = [
      await findOne(Product, { slug: 'iphone-13-pro-max' }),
      await findOne(User, { slug: 'airpods-pro' }),
      await findOne(User, { slug: 'macbook-pro-13' }),
    ];
    await updateCart(testUser, products);

    const cartItemsFromBackend = await fetchData(
      `/api/cart/admin/cartItems`,
      { userId: testUser._id },
      'GET',
      {
        Authorization: `Bearer ${userAdmin.token}`,
      }
    );
    const cartFromDB = await findOne(Cart, { userId: testUser._id });
    checkEqualityOfArrays(cartItemsFromBackend, cartFromDB.cartItems);
    await updateCart(testUser, []);
  });
});
