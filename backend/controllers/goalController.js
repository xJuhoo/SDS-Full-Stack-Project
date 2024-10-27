const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require('../models/userModel');

// @Description : Get Goals
// @Route : GET /api/goals
// @Access : Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
});

// @Description : Set a Goal
// @Route : POST /api/goals
// @Access : Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add a text field.");
    };

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(goal);
});

// @Description : Update a Goal
// @Route : PUT /api/goals:id
// @Access : Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    const user = await User.findById(req.user.id);

    // Check for user
    if (!user) {
        res.status(401);
        throw new Error("User not found");
    };

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    };

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.status(200).json(updatedGoal);
});

// @Description : Delete a Goal
// @Route : DELETE /api/goals:id
// @Access : Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    const user = await User.findById(req.user.id);

    // Check for user
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    };

    await goal.deleteOne();
    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
