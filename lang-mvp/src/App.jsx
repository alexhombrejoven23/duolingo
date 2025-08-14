import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './screens/Home.jsx'
import Lesson from './screens/Lesson.jsx'
import Score from './screens/Score.jsx'

function App() {
	return (
		<BrowserRouter>
			<div className="min-h-full flex flex-col">
				<header className="border-b bg-white">
					<div className="mx-auto max-w-3xl w-full px-4 py-4 flex items-center justify-between">
						<h1 className="text-lg font-semibold">Language Learning MVP</h1>
						<a className="text-sm text-blue-600 hover:underline" href="/">Home</a>
					</div>
				</header>
				<main className="flex-1">
					<div className="mx-auto max-w-3xl w-full px-4 py-6">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/lesson/:lessonId" element={<Lesson />} />
							<Route path="/score" element={<Score />} />
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</div>
				</main>
			</div>
		</BrowserRouter>
	)
}

export default App
