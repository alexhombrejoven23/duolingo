import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import lessonsData from '../data/lessons.json'

function useQuery() {
	const { search } = useLocation()
	return useMemo(() => new URLSearchParams(search), [search])
}

export default function Lesson() {
	const navigate = useNavigate()
	const params = useParams()
	const query = useQuery()
	const language = query.get('lang') || 'Spanish'

	const course = lessonsData.find(l => l.language === language)
	const lesson = course?.lessons.find(l => String(l.id) === String(params.lessonId))

	const [currentIndex, setCurrentIndex] = useState(0)
	const [score, setScore] = useState(0)
	const [selected, setSelected] = useState('')
	const [feedback, setFeedback] = useState('')
	const [showFeedback, setShowFeedback] = useState(false)

	useEffect(() => {
		setCurrentIndex(0)
		setScore(0)
		setSelected('')
		setFeedback('')
		setShowFeedback(false)
	}, [language, params.lessonId])

	if (!course || !lesson) {
		return (
			<div className="space-y-3">
				<p className="text-red-600">Lesson not found.</p>
				<button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={() => navigate('/')}>Back Home</button>
			</div>
		)
	}

	const question = lesson.questions[currentIndex]
	const isLast = currentIndex === lesson.questions.length - 1

	function handleSubmit() {
		if (!question) return
		let correct = false
		if (question.type === 'multiple-choice') {
			correct = selected === question.answer
		} else if (question.type === 'fill-in-the-blank') {
			correct = selected.trim().toLowerCase() === String(question.answer).trim().toLowerCase()
		}
		if (correct) {
			setScore(prev => prev + 10)
			setFeedback('Correct! +10 points')
		} else {
			setFeedback(`Wrong. Correct answer: ${question.answer}`)
		}
		setShowFeedback(true)
	}

	function handleNext() {
		setShowFeedback(false)
		setSelected('')
		if (isLast) {
			navigate(`/score?lang=${encodeURIComponent(language)}&lessonId=${lesson.id}&earned=${score}`)
			return
		}
		setCurrentIndex(i => i + 1)
	}

	return (
		<div className="max-w-xl mx-auto">
			<div className="mb-4 flex items-center justify-between text-sm text-gray-600">
				<span>Language: <span className="font-medium text-gray-900">{language}</span></span>
				<span>Lesson: <span className="font-medium text-gray-900">{lesson.title}</span></span>
				<span>Score: <span className="font-medium text-gray-900">{score}</span></span>
			</div>

			<AnimatePresence mode="wait">
				<motion.div
					key={currentIndex}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
					className="bg-white border rounded-lg p-5 shadow-sm"
				>
					<p className="text-lg font-medium mb-4">{question.question}</p>

					{question.type === 'multiple-choice' && (
						<div className="grid grid-cols-1 gap-3">
							{question.options.map(opt => (
								<button
									key={opt}
									onClick={() => setSelected(opt)}
									className={`px-4 py-2 rounded border text-left ${selected === opt ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'}`}
								>
									{opt}
								</button>
							))}
						</div>
					)}

					{question.type === 'fill-in-the-blank' && (
						<input
							type="text"
							value={selected}
							onChange={e => setSelected(e.target.value)}
							className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Type your answer"
						/>
					)}

					<div className="mt-5 flex gap-3">
						<button
							onClick={handleSubmit}
							className="px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-50"
							disabled={!selected}
						>
							Submit
						</button>
						{showFeedback && (
							<button onClick={handleNext} className="px-4 py-2 rounded bg-blue-600 text-white">
								{isLast ? 'Finish' : 'Next'}
							</button>
						)}
					</div>

					{showFeedback && (
						<p className="mt-3 text-sm text-gray-700">{feedback}</p>
					)}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}