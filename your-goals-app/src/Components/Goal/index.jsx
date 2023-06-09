import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import './styles.css'

const Goal = ({ goal, setIsEditModalVisible, deleteHandler, setCurrentGoalId }) => {
    const getCardColor = () => {
        switch (goal.GoalState) {
            case 'В прогрессе':
                return 'green'
            case 'Скоро срок':
                return 'yellow'
            case 'Просрочено':
                return 'red'
            default:
                break
        }
    }

    return (
        <div className={`goal-container ${getCardColor()}`}>
            {window.width > 650 ? (
                <div className='goal-info'>
                    <div className='goal-content'>Цель: {goal.GoalName}</div>
                    <div className='goal-content'>Статус: {goal.GoalState}</div>
                    <div className='goal-content'>Срок: {goal.GoalDate}</div>
                </div>
            ) : (
                <div className='goal-info'>
                    <div className='goal-content'>{goal.GoalName}</div>
                    <div className='goal-content'>{goal.GoalDate}</div>
                </div>
            )}

            <div className='goal-buttons'>
                <Button
                    title='Изменить'
                    handler={() => {
                        setCurrentGoalId(goal.GoalId)
                        setIsEditModalVisible(true)
                    }}
                />
                <Button
                    title='Удалить'
                    handler={() => {
                        deleteHandler(goal.GoalId)
                    }}
                />
            </div>
        </div>
    )
}

Goal.propTypes = {
    goal: PropTypes.object,
    setIsEditModalVisible: PropTypes.func,
    deleteHandler: PropTypes.func,
    setCurrentGoalId: PropTypes.func
}

export default Goal
