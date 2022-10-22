import React, { useCallback, useEffect, useState } from 'react'

import './Game.css'

const CHARS = '0123456789ABCDEF'
const NUM_CHOICES = 3

export const Game = () => {
	const [target, setTarget] = useState()
	const [choices, setChoices] = useState([])

	const getRandomColor = () => {
		let randomColor = '#'
		for (let i = 0; i < 6; i++) {
			const randomIdx = Math.floor(Math.random() * CHARS.length)
			const randomChar = CHARS[randomIdx]
			randomColor += randomChar
		}
		return randomColor
	}

	const startGame = useCallback(() => {
		const randomTarget = getRandomColor()
		setTarget(randomTarget)

		const newChoices = [randomTarget]
		// create array of random color choices
		for (let i = 1; i < NUM_CHOICES; i++) newChoices.push(getRandomColor())
		// randomize choice order
		for (let i = 0; i < NUM_CHOICES; i++) {
			const randomIdx = Math.floor(Math.random() * NUM_CHOICES)
			const temp = newChoices[i]
			newChoices[i] = newChoices[randomIdx]
			newChoices[randomIdx] = temp
		}
		setChoices(newChoices)
	}, [])

	const submitGuess = (choice) => {
		if (choice === target) startGame()
	}

	// set random target & color choices
	useEffect(() => {
		startGame()
	}, [startGame])

	return (
		<section className='game'>
			<div className='target' style={{ backgroundColor: target }}></div>
			<div className='choices'>
				{choices.map((choice) => (
					<button
						key={choice}
						className='choice'
						onClick={() => submitGuess(choice)}
					>
						{choice}
					</button>
				))}
			</div>
		</section>
	)
}
