const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Activity level multipliers for BMR
const activityMultipliers = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extremely_active: 1.9
};

// Calculate BMR using Mifflin-St Jeor Equation
const calculateBMR = (weight, height, age, gender) => {
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
};

// Calculate TDEE (Total Daily Energy Expenditure)
const calculateTDEE = (bmr, activityLevel) => {
  return bmr * activityMultipliers[activityLevel];
};

// Calculate protein requirements (g per kg body weight)
const calculateProteinRequirement = (weight, goal, activityLevel) => {
  let proteinPerKg;
  
  if (goal === 'build_muscle' || activityLevel === 'very_active' || activityLevel === 'extremely_active') {
    proteinPerKg = 2.2; // Higher protein for muscle building
  } else if (goal === 'lose_weight') {
    proteinPerKg = 2.0; // Higher protein to preserve muscle during weight loss
  } else {
    proteinPerKg = 1.6; // Standard for active individuals
  }
  
  return weight * proteinPerKg;
};

// Calculate ideal weight range using BMI
const calculateIdealWeight = (height) => {
  const heightInMeters = height / 100;
  const minWeight = 18.5 * (heightInMeters * heightInMeters);
  const maxWeight = 24.9 * (heightInMeters * heightInMeters);
  return { min: Math.round(minWeight), max: Math.round(maxWeight) };
};

// @route   GET /api/nutrition/calculations
// @desc    Get nutrition calculations for user
// @access  Private
router.get('/calculations', protect, async (req, res) => {
  try {
    const user = req.user;
    const { weight, height, age, gender, activityLevel, goal } = user;

    // Calculate BMR and TDEE
    const bmr = calculateBMR(weight, height, age, gender);
    const tdee = calculateTDEE(bmr, activityLevel);

    // Calculate protein requirement
    const proteinRequirement = calculateProteinRequirement(weight, goal, activityLevel);

    // Calculate ideal weight range
    const idealWeightRange = calculateIdealWeight(height);

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Determine weight recommendation
    let weightRecommendation = '';
    let targetCalories = tdee;

    if (weight < idealWeightRange.min) {
      weightRecommendation = `You should gain ${Math.round(idealWeightRange.min - weight)} kg to reach a healthy weight range.`;
      targetCalories = tdee + 500; // Surplus for weight gain
    } else if (weight > idealWeightRange.max) {
      weightRecommendation = `You should lose ${Math.round(weight - idealWeightRange.max)} kg to reach a healthy weight range.`;
      targetCalories = tdee - 500; // Deficit for weight loss
    } else {
      weightRecommendation = 'You are within a healthy weight range!';
    }

    // Adjust calories based on user goal
    if (goal === 'lose_weight') {
      targetCalories = tdee - 500;
    } else if (goal === 'gain_weight' || goal === 'build_muscle') {
      targetCalories = tdee + 500;
    }

    // Calculate macronutrient distribution
    const proteinCalories = proteinRequirement * 4; // 4 calories per gram of protein
    const fatCalories = targetCalories * 0.25; // 25% of calories from fat
    const carbCalories = targetCalories - proteinCalories - fatCalories;

    const macros = {
      protein: Math.round(proteinRequirement),
      carbs: Math.round(carbCalories / 4), // 4 calories per gram of carbs
      fat: Math.round(fatCalories / 9) // 9 calories per gram of fat
    };

    // Micronutrient recommendations (daily values)
    const micronutrients = {
      vitaminC: gender === 'male' ? 90 : 75, // mg
      vitaminD: 15, // mcg
      calcium: age <= 50 ? 1000 : 1200, // mg
      iron: gender === 'male' ? 8 : (age <= 50 ? 18 : 8), // mg
      magnesium: gender === 'male' ? 400 : 310, // mg
      zinc: gender === 'male' ? 11 : 8, // mg
      vitaminB12: 2.4, // mcg
      folate: 400, // mcg
      potassium: 3500, // mg
      fiber: gender === 'male' ? 38 : 25 // g
    };

    res.json({
      success: true,
      data: {
        userStats: {
          bmi: Math.round(bmi * 10) / 10,
          bmr: Math.round(bmr),
          tdee: Math.round(tdee),
          idealWeightRange,
          currentWeight: weight
        },
        recommendations: {
          weightRecommendation,
          targetCalories: Math.round(targetCalories),
          proteinRequirement: Math.round(proteinRequirement)
        },
        macros,
        micronutrients
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;