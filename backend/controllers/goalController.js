const asyncHandler = require("express-async-handler");

// @Description : Get Goals
// @Route : GET /api/goals
// @Access : Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get Goals" });
});

// @Description : Set a Goal
// @Route : POST /api/goals
// @Access : Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add a text field.");
    };
    res.status(200).json({ message: "Create a Goal" });
});

// @Description : Update a Goal
// @Route : PUT /api/goals:id
// @Access : Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Goal with an ID of : ${req.params.id}`});
});

// @Description : Delete a Goal
// @Route : DELETE /api/goals:id
// @Access : Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Goal with an ID of : ${req.params.id}`});
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
