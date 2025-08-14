import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import lessonsData from '../data/lessons.json'

export default function Home() {
	const navigate = useNavigate()
	const languages = useMemo(() => {
		const set = new Set(lessonsData.map(l => l.language))
		return Array.from(set)
	}, [])
	const [language, setLanguage] = useState(languages[0] ?? 'Spanish')

	function handleStart() {
		const firstLesson = lessonsData.find(l => l.language === language)
		if (!firstLesson) return
		navigate(`/lesson/${firstLesson.lessons[0].id}?lang=${encodeURIComponent(language)}`)
	}

	return (
		<div className="flex flex-col items-center text-center gap-6">
			<h2 className="text-2xl font-bold">Choose a language</h2>
			<div className="flex gap-3 flex-wrap justify-center">
				{languages.map(lang => (
					<button
						key={lang}
						onClick={() => setLanguage(lang)}
						className={`px-4 py-2 rounded border ${language === lang ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
					>
						{lang}
					</button>
				))}
			</div>
			<button onClick={handleStart} className="px-5 py-2.5 rounded bg-emerald-600 text-white hover:bg-emerald-700">
				Start Lesson
			</button>
		</div>
	)
}