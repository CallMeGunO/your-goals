const getGoals = async (userName) => {
    const response = await fetch(`http://localhost:5000/api/goal/${userName}`)
    if (response.ok) {
        const data = await response.json()
        return data
    }
}

const addGoal = async (goal) => {
    await fetch('http://localhost:5000/api/goal', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            GoalName: goal.GoalName,
            GoalDate: goal.GoalDate,
            GoalState: goal.GoalState,
            UserName: goal.UserName
        })
    })
}

const editGoal = async (goal) => {
    await fetch('http://localhost:5000/api/goal', {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            GoalId: goal.GoalId,
            GoalName: goal.GoalName,
            GoalDate: goal.GoalDate,
            GoalState: goal.GoalState,
            UserName: goal.UserName
        })
    })
}

const deleteGoalById = async (id) => {
    await fetch(`http://localhost:5000/api/goal/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    return
}

const getUserByName = async (userName) => {
    const response = await fetch(`http://localhost:5000/api/user/${userName}`)
    if (response.ok) {
        const data = await response.json()
        return data
    }
}

const addUser = async (user) => {
    await fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            UserName: user.UserName,
            UserPassword: user.UserPassword
        })
    })
}

export { getGoals, addGoal, editGoal, deleteGoalById, getUserByName, addUser }
