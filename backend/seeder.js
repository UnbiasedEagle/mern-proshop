import colors from 'colors';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import users from './data/users.js';
import products from './data/products.js';
import dotenv from 'dotenv';
import db from './config/db.js';

dotenv.config({ path: '../.env' });

db();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    const createdUsers = await User.insertMany(users);
    const updatedProducts = products.map((product) => {
      return { ...product, user: createdUsers[0]._id };
    });
    await Product.insertMany(updatedProducts);
    console.log('Data Imported'.green.bold);
    process.exit(0);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.bold);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log('Data Deleted'.green.bold);
    process.exit(0);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.bold);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
}

if (process.argv[2] === '-d') {
  deleteData();
}
