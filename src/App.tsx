import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Bai1 from './Bai1';
import Bai2 from './Bai2';
import Bai3 from './Bai3';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<header style={{ padding: 12, borderBottom: '1px solid #eee' }}>
					<nav style={{ display: 'flex', gap: 12 }}>
						<Link to="/">Home</Link>
						<Link to="/bai1">Bài 1 </Link>
						<Link to="/bai2">Bài 2 </Link>
						<Link to="/bai3">Bài 3 </Link>
					</nav>
				</header>

				<main>
					<Routes>
						<Route path="/" element={<div style={{ padding: 12 }}><h2>Trang chính</h2><p>Chọn một bài ở menu trên.</p></div>} />
						<Route path="/bai1" element={<Bai1 />} />
						<Route path="/bai2/*" element={<Bai2 />} />
						<Route path="/bai3" element={<Bai3 />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
