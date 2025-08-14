import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import lessonsData from '../data/lessons.json'

function useQuery() {
	const { search } = useLocation()
	return useMemo(() => new URLSearchParams(search), [search])
}

export default function Score() {
	const navigate = useNavigate()
	const query = useQuery()
	const language = query.get('lang') || 'Spanish'
	const earned = Number(query.get('earned') || 0)
	const lessonId = Number(query.get('lessonId') || 0)

	const course = lessonsData.find(l => l.language === language)
	const idx = course?.lessons.findIndex(l => l.id === lessonId) ?? -1
	const nextLesson = idx >= 0 ? course?.lessons[idx + 1] : undefined

	return (
		<div className="text-center space-y-4">
			<h2 className="text-2xl font-bold">Lesson Complete!</h2>
			<p className="text-lg">You earned <span className="font-semibold">{earned}</span> points.</p>
			<div className="flex gap-3 justify-center">
				<button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={() => navigate('/')}>Go Home</button>
				{nextLesson && (
					<button
						className="px-4 py-2 rounded bg-emerald-600 text-white"
						onClick={() => navigate(`/lesson/${nextLesson.id}?lang=${encodeURIComponent(language)}`)}
					>
						Continue
					</button>
				)}
			</div>
		</div>
	)
}