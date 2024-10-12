import axios from 'axios';
import recipesData from '../shared/recipes.json';

// Simulating API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const API_BASE_URL = 'https://api.flofer.com/api/appfridgecheck';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const categories = [
    { id: '1', name: 'Breakfast', key: 'breakfast' },
    { id: '2', name: 'Lunch', key: 'lunch' },
    { id: '3', name: 'Dinner', key: 'dinner' },
    { id: '4', name: 'Desserts', key: 'desserts' },
    { id: '5', name: 'Vegetarian', key: 'vegetarian' },
    { id: '6', name: 'Quick & Easy', key: 'quickAndEasy' },
];

const assignCategory = (recipe) => {
    const name = recipe.name.toLowerCase();
    if (name.includes('breakfast') || name.includes('pancake') || name.includes('omelette')) {
        return 'breakfast';
    } else if (name.includes('salad') || name.includes('sandwich')) {
        return 'lunch';
    } else if (name.includes('soup') || name.includes('steak') || name.includes('pasta')) {
        return 'dinner';
    } else if (name.includes('cake') || name.includes('pie') || name.includes('ice cream')) {
        return 'desserts';
    } else if (name.includes('vegetable') || name.includes('vegan') || !name.includes('chicken') && !name.includes('beef') && !name.includes('pork') && !name.includes('fish')) {
        return 'vegetarian';
    } else {
        return 'quickAndEasy';
    }
};

export const login = async (email, password) => {
    await delay(1000); // Simulate network delay
    // For demo purposes, always return a successful login
    return {
        id: '123',
        name: 'John Doe',
        email: email,
        token: 'dummy_token_12345'
    };
};

export const signup = async (fullName, email, password) => {
    await delay(1000); // Simulate network delay
    // For demo purposes, always return a successful signup
    return {
        id: '124',
        name: fullName,
        email: email,
        token: 'dummy_token_67890'
    };
};

export const getRecipes = async () => {
    await delay(1000); // Simulate network delay
    // Combine all recipes and assign categories
    const allRecipes = [...recipesData.myRecipes, ...recipesData.popularRecipes];
    return allRecipes.map(recipe => ({
        ...recipe,
        category: assignCategory(recipe)
    }));
};

export const getRecipesByIngredients = async (ingredients) => {
    await delay(1000); // Simulate network delay
    // For demo purposes, just return some random recipes
    return recipesData.myRecipes.slice(0, 3);
};

export const getUserProfile = async (userId) => {
    await delay(1000); // Simulate network delay
    // Return a dummy user profile
    return {
        id: userId,
        name: 'John Doe',
        username: 'johndoe',
        profilePicture: 'https://example.com/profile-picture.jpg',
        bio: 'Food enthusiast | Amateur chef | Recipe creator',
        recipesCount: recipesData.myRecipes.length,
        followersCount: 1200,
        followingCount: 350,
        recipes: recipesData.myRecipes,
        recentActivity: [
            { icon: 'star', text: 'Liked Spaghetti Carbonara recipe' },
            { icon: 'pencil', text: 'Created Homemade Pizza recipe' }
        ]
    };
};

export const updateUserProfile = async (userId, profileData) => {
    await delay(1000); // Simulate network delay
    // For demo purposes, just return the updated profile data
    return {
        ...profileData,
        id: userId
    };
};
