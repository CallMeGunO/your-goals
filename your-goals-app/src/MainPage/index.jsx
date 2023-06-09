import React, { useEffect, useState } from 'react'
import { getGoals, addGoal, editGoal, deleteGoalById, getUserByName, addUser } from '../Core/ygApi'
import Goal from '../Components/Goal'
import Button from '../Components/Button'
import Modal from '../Components/Modal'
import './styles.css'
import Input from '../Components/Input'

const MainPage = () => {
    const [userName, setUserName] = useState('')
    const [userNameField, setUserNameField] = useState('')
    const [passwordField, setPasswordField] = useState('')
    const [isLogInVisible, setIsLogInVisible] = useState(true)
    const [goalsData, setGoalsData] = useState([])
    const [filter, setFilter] = useState(null)
    const [currentGoalId, setCurrentGoalId] = useState(undefined)
    const [addGoalName, setAddGoalName] = useState('GoalName')
    const [addGoalDate, setAddGoalDate] = useState(new Date())
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [editGoalName, setEditGoalName] = useState('')
    const [editGoalDate, setEditGoalDate] = useState(new Date())

    useEffect(() => {
        updateGoalsList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userName, filter])

    const updateGoalsList = async () => {
        let goalsRequestResult = await getGoals(userName)
        if (filter) {
            goalsRequestResult = goalsRequestResult.filter((item) => {
                return item.GoalState === filter
            })
        }
        setGoalsData(goalsRequestResult)
    }

    const getGoalState = (goalDate) => {
        const goalTime = new Date(goalDate).getTime()
        const currentTime = new Date().getTime()
        // 1 day = 86400000 ms
        if (goalTime - currentTime > 86400000) {
            return 'В прогрессе'
        } else if (goalTime - currentTime <= 86400000 && goalTime - currentTime > -86400000) {
            return 'Скоро срок'
        } else {
            return 'Просрочено'
        }
    }

    const goalsFromData = (data) => {
        return data.map((item, index) => (
            <Goal
                key={index}
                goal={item}
                setIsEditModalVisible={setIsEditModalVisible}
                deleteHandler={deleteHandler}
                setCurrentGoalId={setCurrentGoalId}
            />
        ))
    }

    const addHandler = async () => {
        const goal = {
            GoalName: addGoalName,
            GoalDate: addGoalDate,
            GoalState: getGoalState(addGoalDate),
            UserName: userName
        }
        await addGoal(goal)
        updateGoalsList()
    }

    const editHandler = async () => {
        const goal = {
            GoalId: currentGoalId,
            GoalName: editGoalName,
            GoalDate: editGoalDate,
            GoalState: getGoalState(editGoalDate),
            UserName: userName
        }
        if (userName) {
            await editGoal(goal)
        }
        updateGoalsList()
        setIsEditModalVisible(false)
    }

    const deleteHandler = async (id) => {
        await deleteGoalById(id)
        updateGoalsList()
    }

    const logInHandler = async () => {
        let getUserResult
        await getUserByName(userNameField).then((result) => {
            getUserResult = result
            if (result[0]?.UserPassword === passwordField) {
                setIsLogInVisible(false)
                setUserName(getUserResult[0].UserName)
            } else {
                alert('Ошибка в логине или пароле')
            }
        })
    }

    const registrationHandler = async () => {
        let getUserResult
        await getUserByName(userNameField).then((result) => {
            getUserResult = result
        })
        if (userNameField === '' || passwordField === '') {
            alert('Заполните поля ввода')
            return
        }
        if (getUserResult[0]?.UserName === undefined) {
            setIsLogInVisible(false)
            setUserName(userNameField)
            addUser({
                UserName: userNameField,
                UserPassword: passwordField
            })
            return
        } 
        alert('Такое имя пользователя уже занято')
    }

    return (
        <div className='page'>
            <div className='header'>
                <div className='header-logo'>YG</div>
                <div>
                    <div className='header-discription-row title'>Your Goals</div>
                    <div className='header-discription-row divider'></div>
                    <div className='header-discription-row'>Онлайн планировщик задач</div>
                </div>
                <div className='header-buttons'>
                    <Button
                        title='Сменить пользователя'
                        handler={() => {
                            setIsLogInVisible(true)
                        }}
                    />
                </div>
            </div>

            <div className='bar action'>
                <div className='bar-title'>Мои цели:</div>
                <div className='bar-items'>
                    <Button
                        title='Все'
                        primary={false}
                        handler={() => {
                            setFilter(null)
                        }}
                    />
                    <Button
                        title='В прогрессе'
                        primary={false}
                        handler={() => {
                            setFilter('В прогрессе')
                        }}
                        color='green'
                    />
                    <Button
                        title='Скоро срок'
                        primary={false}
                        handler={() => {
                            setFilter('Скоро срок')
                        }}
                        color='yellow'
                    />
                    <Button
                        title='Просроченные'
                        primary={false}
                        handler={() => {
                            setFilter('Просрочено')
                        }}
                        color='red'
                    />
                </div>
            </div>

            <div className='goalslist-container'>{goalsData && goalsFromData(goalsData)}</div>

            <div className='bar addition'>
                <div className='bar-title'>Новая цель:</div>
                <div className='bar-items'>
                    <Input placeholder='Название цели' setValue={setAddGoalName} />
                    <Input placeholder='Дата окончания' setValue={setAddGoalDate} type='date' />
                    <Button title='Добавить' handler={addHandler} primary={false} />
                </div>
            </div>

            <Modal isClosable={false} isVisible={isLogInVisible} setIsVisible={setIsLogInVisible}>
                <div className='modal-container registration'>
                    <div className='modal-title'>Вход</div>
                    <div className='modal-input'>
                        Логин:
                        <Input placeholder='Логин' setValue={setUserNameField} />
                    </div>
                    <div className='modal-input'>
                        Пароль:
                        <Input placeholder='Пароль' setValue={setPasswordField} type='password' />
                    </div>
                    <div className='modal-buttons'>
                        <Button title='Войти' handler={logInHandler} primary={false} />
                        <Button title='Создать' handler={registrationHandler} />
                    </div>
                </div>
            </Modal>

            <Modal isClosable={true} isVisible={isEditModalVisible} setIsVisible={setIsEditModalVisible}>
                <div className='modal-container edit'>
                    <div className='modal-title'>Изменить</div>
                    <div className='modal-input'>
                        Цель:
                        <Input placeholder='Цель' setValue={setEditGoalName} />
                    </div>
                    <div className='modal-input'>
                        Срок:
                        <Input placeholder='Срок' setValue={setEditGoalDate} type='date' />
                    </div>
                    <div className='modal-buttons edit'>
                        <Button title='Сохранить' handler={editHandler} primary={false} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default MainPage
