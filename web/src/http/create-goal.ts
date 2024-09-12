type GoalCreatedResponse = {
    id: string;
    title: string;
    desiredWeeklyFrequency: number;
    createdAt: Date;
}

type CreateGoalRequest = {
    title: string;
    desiredWeeklyFrequency: number;
}


export async function createGoal(goal: CreateGoalRequest) : Promise<GoalCreatedResponse> {
    const response = await fetch("http://localhost:3000/goals",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(goal)
    });
    const data = await response.json();

    return data.goal;
}