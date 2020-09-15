import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import config from '../../config'
import TokenService from '../../services/token-service'
import Activity from './ActivitiesList/Activity/Activity'
import './Dashboard.css'
import DashboardHeader from './DashboardHeader/DashboardHeader'

export default function Dashboard() {
	const history = useHistory()
	const [error, setError] = useState(null)
	const [activities, setActivities] = useState([])
	const numActivities = activities.length || 0
	useEffect(() => {
		const getActivities = async () => {
			try {
				const response = await fetch(
					`${config.API_ENDPOINT}/activities`,
					{
						method: 'GET',
					}
				)
				const data = await response.json()
				if (data.error) throw data.error

				setActivities(data)
			} catch (error) {
				setError(error)
			}
		}

		if (!error) {
			getActivities()
		}
		return () => {}
	}, [error])

	const handleLogOut = async () => {
		try {
			await TokenService.clearAuthToken()
			history.push('/')
		} catch (error) {
			setError(error.message)
		}
	}
	return (
		<main>
			<DashboardHeader
				props={numActivities}
				numActivities={numActivities}
				handleLogOut={handleLogOut}
			/>
			<section className='event__section'>
				<ul className='event__list'>
					{activities &&
						activities.map((activity) => (
							<Activity
								key={activity.id}
								{...activity}
							/>
						))}
					<li>List</li>
					<li>List</li>
					<li>List</li>
					<li>List</li>
				</ul>
			</section>
		</main>
	)
}
