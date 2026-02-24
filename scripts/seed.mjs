/**
 * Appwrite Seed Script (Node.js)
 *
 * Usage:
 *   1. npm install --save-dev node-appwrite
 *   2. Fill in .env and .env.seed (see README)
 *   3. node scripts/seed.mjs
 */

import { readFileSync } from "fs";
import { Client, Databases, ID } from "node-appwrite";

// ---------- load env files ----------
function loadEnv(path, required = true) {
  try {
    const raw = readFileSync(path, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      const value = rest.join("=").trim().replace(/^"(.*)"$/, "$1");
      process.env[key.trim()] = value;
    }
  } catch {
    if (required) {
      console.error(`❌  Could not read ${path}. Make sure it exists.`);
      process.exit(1);
    }
  }
}

// Load .env first (project ID, endpoint, collection IDs)
loadEnv(new URL("../.env", import.meta.url).pathname);
// Load .env.seed (API key only)
loadEnv(new URL("../.env.seed", import.meta.url).pathname);

const APPWRITE_ENDPOINT   = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const APPWRITE_API_KEY    = process.env.APPWRITE_API_KEY;
const APPWRITE_DATABASE_ID                      = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const APPWRITE_CATEGORIES_COLLECTION_ID         = process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID;
const APPWRITE_MENU_COLLECTION_ID               = process.env.EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID;
const APPWRITE_CUSTOMIZATIONS_COLLECTION_ID     = process.env.EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID;
const APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID;

const required = [
  ["EXPO_PUBLIC_APPWRITE_ENDPOINT", APPWRITE_ENDPOINT],
  ["EXPO_PUBLIC_APPWRITE_PROJECT_ID", APPWRITE_PROJECT_ID],
  ["APPWRITE_API_KEY", APPWRITE_API_KEY],
  ["EXPO_PUBLIC_APPWRITE_DATABASE_ID", APPWRITE_DATABASE_ID],
  ["EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID", APPWRITE_CATEGORIES_COLLECTION_ID],
  ["EXPO_PUBLIC_APPWRITE_MENU_COLLECTION_ID", APPWRITE_MENU_COLLECTION_ID],
  ["EXPO_PUBLIC_APPWRITE_CUSTOMIZATIONS_COLLECTION_ID", APPWRITE_CUSTOMIZATIONS_COLLECTION_ID],
  ["EXPO_PUBLIC_APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID", APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID],
];

let hasError = false;
for (const [key, value] of required) {
  if (!value) {
    console.error(`❌  Missing required env var: ${key}`);
    hasError = true;
  }
}
if (hasError) process.exit(1);

// ---------- Appwrite client ----------
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)
  .setKey(APPWRITE_API_KEY);

const db = new Databases(client);

// ---------- data ----------
const data = {
  categories: [
    { name: "Burgers", description: "Juicy grilled burgers" },
    { name: "Pizzas", description: "Oven-baked cheesy pizzas" },
    { name: "Burritos", description: "Rolled Mexican delights" },
    { name: "Sandwiches", description: "Stacked and stuffed sandwiches" },
    { name: "Wraps", description: "Rolled up wraps packed with flavor" },
    { name: "Bowls", description: "Balanced rice and protein bowls" },
  ],

  customizations: [
    { name: "Extra Cheese", price: 25, type: "topping" },
    { name: "Jalapeños", price: 20, type: "topping" },
    { name: "Onions", price: 10, type: "topping" },
    { name: "Olives", price: 15, type: "topping" },
    { name: "Mushrooms", price: 18, type: "topping" },
    { name: "Tomatoes", price: 10, type: "topping" },
    { name: "Bacon", price: 30, type: "topping" },
    { name: "Avocado", price: 35, type: "topping" },
    { name: "Coke", price: 30, type: "side" },
    { name: "Fries", price: 35, type: "side" },
    { name: "Garlic Bread", price: 40, type: "side" },
    { name: "Chicken Nuggets", price: 50, type: "side" },
    { name: "Iced Tea", price: 28, type: "side" },
    { name: "Salad", price: 33, type: "side" },
    { name: "Potato Wedges", price: 38, type: "side" },
    { name: "Mozzarella Sticks", price: 45, type: "side" },
    { name: "Sweet Corn", price: 25, type: "side" },
    { name: "Choco Lava Cake", price: 42, type: "side" },
  ],

  menu: [
    {
      name: "Classic Cheeseburger",
      description: "Beef patty, cheese, lettuce, tomato",
      image_url: "https://static.vecteezy.com/system/resources/previews/044/844/600/large_2x/homemade-fresh-tasty-burger-with-meat-and-cheese-classic-cheese-burger-and-vegetable-ai-generated-free-png.png",
      price: 25.99, rating: 4.5, calories: 550, protein: 25,
      category_name: "Burgers",
      customizations: ["Extra Cheese", "Coke", "Fries", "Onions", "Bacon"],
    },
    {
      name: "Pepperoni Pizza",
      description: "Loaded with cheese and pepperoni slices",
      image_url: "https://static.vecteezy.com/system/resources/previews/023/742/417/large_2x/pepperoni-pizza-isolated-illustration-ai-generative-free-png.png",
      price: 30.99, rating: 4.7, calories: 700, protein: 30,
      category_name: "Pizzas",
      customizations: ["Extra Cheese", "Jalapeños", "Garlic Bread", "Coke", "Olives"],
    },
    {
      name: "Bean Burrito",
      description: "Stuffed with beans, rice, salsa",
      image_url: "https://static.vecteezy.com/system/resources/previews/055/133/581/large_2x/deliciously-grilled-burritos-filled-with-beans-corn-and-fresh-vegetables-served-with-lime-wedge-and-cilantro-isolated-on-transparent-background-free-png.png",
      price: 20.99, rating: 4.2, calories: 480, protein: 18,
      category_name: "Burritos",
      customizations: ["Jalapeños", "Iced Tea", "Fries", "Salad"],
    },
    {
      name: "BBQ Bacon Burger",
      description: "Smoky BBQ sauce, crispy bacon, cheddar",
      image_url: "https://static.vecteezy.com/system/resources/previews/060/236/245/large_2x/a-large-hamburger-with-cheese-onions-and-lettuce-free-png.png",
      price: 27.5, rating: 4.8, calories: 650, protein: 29,
      category_name: "Burgers",
      customizations: ["Onions", "Fries", "Coke", "Bacon", "Avocado"],
    },
    {
      name: "Chicken Caesar Wrap",
      description: "Grilled chicken, lettuce, Caesar dressing",
      image_url: "https://static.vecteezy.com/system/resources/previews/048/930/603/large_2x/caesar-wrap-grilled-chicken-isolated-on-transparent-background-free-png.png",
      price: 21.5, rating: 4.4, calories: 490, protein: 28,
      category_name: "Wraps",
      customizations: ["Extra Cheese", "Coke", "Potato Wedges", "Tomatoes"],
    },
    {
      name: "Grilled Veggie Sandwich",
      description: "Roasted veggies, pesto, cheese",
      image_url: "https://static.vecteezy.com/system/resources/previews/047/832/012/large_2x/grilled-sesame-seed-bread-veggie-sandwich-with-tomato-and-onion-free-png.png",
      price: 19.99, rating: 4.1, calories: 420, protein: 19,
      category_name: "Sandwiches",
      customizations: ["Mushrooms", "Olives", "Mozzarella Sticks", "Iced Tea"],
    },
    {
      name: "Double Patty Burger",
      description: "Two juicy beef patties and cheese",
      image_url: "https://static.vecteezy.com/system/resources/previews/060/359/627/large_2x/double-cheeseburger-with-lettuce-tomatoes-cheese-and-sesame-bun-free-png.png",
      price: 32.99, rating: 4.9, calories: 720, protein: 35,
      category_name: "Burgers",
      customizations: ["Extra Cheese", "Onions", "Fries", "Coke", "Chicken Nuggets"],
    },
    {
      name: "Paneer Tikka Wrap",
      description: "Spicy paneer, mint chutney, veggies",
      image_url: "https://static.vecteezy.com/system/resources/previews/057/913/530/large_2x/delicious-wraps-a-tantalizing-array-of-wraps-filled-with-vibrant-vegetables-succulent-fillings-and-fresh-ingredients-artfully-arranged-for-a-mouthwatering-culinary-experience-free-png.png",
      price: 23.99, rating: 4.6, calories: 470, protein: 20,
      category_name: "Wraps",
      customizations: ["Jalapeños", "Tomatoes", "Salad", "Fries", "Iced Tea"],
    },
    {
      name: "Mexican Burrito Bowl",
      description: "Rice, beans, corn, guac, salsa",
      image_url: "https://static.vecteezy.com/system/resources/previews/057/466/374/large_2x/healthy-quinoa-bowl-with-avocado-tomato-and-black-beans-ingredients-free-png.png",
      price: 26.49, rating: 4.7, calories: 610, protein: 24,
      category_name: "Bowls",
      customizations: ["Avocado", "Sweet Corn", "Salad", "Iced Tea"],
    },
    {
      name: "Spicy Chicken Sandwich",
      description: "Crispy chicken, spicy sauce, pickles",
      image_url: "https://static.vecteezy.com/system/resources/previews/051/814/008/large_2x/a-grilled-chicken-sandwich-with-lettuce-and-tomatoes-free-png.png",
      price: 24.99, rating: 4.3, calories: 540, protein: 26,
      category_name: "Sandwiches",
      customizations: ["Jalapeños", "Onions", "Fries", "Coke", "Choco Lava Cake"],
    },
    {
      name: "Classic Margherita Pizza",
      description: "Tomato, mozzarella, fresh basil",
      image_url: "https://static.vecteezy.com/system/resources/previews/058/700/845/large_2x/free-isolated-on-transparent-background-delicious-pizza-topped-with-fresh-tomatoes-basil-and-melted-cheese-perfect-for-food-free-png.png",
      price: 26.99, rating: 4.1, calories: 590, protein: 21,
      category_name: "Pizzas",
      customizations: ["Extra Cheese", "Olives", "Coke", "Garlic Bread"],
    },
    {
      name: "Protein Power Bowl",
      description: "Grilled chicken, quinoa, veggies",
      image_url: "https://static.vecteezy.com/system/resources/previews/056/106/379/large_2x/top-view-salad-with-chicken-avocado-tomatoes-and-lettuce-free-png.png",
      price: 29.99, rating: 4.8, calories: 580, protein: 38,
      category_name: "Bowls",
      customizations: ["Avocado", "Salad", "Sweet Corn", "Iced Tea"],
    },
    {
      name: "Paneer Burrito",
      description: "Paneer cubes, spicy masala, rice, beans",
      image_url: "https://static.vecteezy.com/system/resources/previews/056/565/254/large_2x/burrito-with-cauliflower-and-vegetables-free-png.png",
      price: 24.99, rating: 4.2, calories: 510, protein: 22,
      category_name: "Burritos",
      customizations: ["Jalapeños", "Fries", "Garlic Bread", "Coke"],
    },
    {
      name: "Chicken Club Sandwich",
      description: "Grilled chicken, lettuce, cheese, tomato",
      image_url: "https://static.vecteezy.com/system/resources/previews/060/364/135/large_2x/a-flavorful-club-sandwich-with-turkey-bacon-and-fresh-vegetables-sliced-and-isolated-on-a-transparent-background-free-png.png",
      price: 27.49, rating: 4.5, calories: 610, protein: 31,
      category_name: "Sandwiches",
      customizations: ["Bacon", "Tomatoes", "Mozzarella Sticks", "Iced Tea"],
    },
  ],
};

// ---------- helpers ----------
async function createDoc(collectionId, payload) {
  return db.createDocument(APPWRITE_DATABASE_ID, collectionId, ID.unique(), payload);
}

// ---------- seed ----------
async function seed() {
  console.log("🌱  Starting seed...\n");

  // 1. Categories
  console.log("📂  Creating categories...");
  const categoryMap = {};
  for (const cat of data.categories) {
    const doc = await createDoc(APPWRITE_CATEGORIES_COLLECTION_ID, cat);
    categoryMap[cat.name] = doc.$id;
    console.log(`   ✔ ${cat.name}`);
  }

  // 2. Customizations
  console.log("\n🧂  Creating customizations...");
  const customizationMap = {};
  for (const cus of data.customizations) {
    const doc = await createDoc(APPWRITE_CUSTOMIZATIONS_COLLECTION_ID, {
      name: cus.name,
      price: cus.price,
      type: cus.type,
    });
    customizationMap[cus.name] = doc.$id;
    console.log(`   ✔ ${cus.name}`);
  }

  // 3. Menu items + menu_customizations
  console.log("\n🍔  Creating menu items...");
  for (const item of data.menu) {
    const doc = await createDoc(APPWRITE_MENU_COLLECTION_ID, {
      name: item.name,
      description: item.description,
      image_url: item.image_url,
      price: item.price,
      rating: item.rating,
      calories: item.calories,
      protein: item.protein,
      categories: categoryMap[item.category_name],
    });

    for (const cusName of item.customizations) {
      await createDoc(APPWRITE_MENU_CUSTOMIZATIONS_COLLECTION_ID, {
        menu: doc.$id,
        customizations: customizationMap[cusName],
      });
    }

    console.log(`   ✔ ${item.name}`);
  }

  console.log("\n✅  Seed complete!");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message ?? err);
  process.exit(1);
});
