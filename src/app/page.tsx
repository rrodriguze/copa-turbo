'use client'

import React, {useCallback, useEffect, useState} from "react";
import {ChevronDown, X, ChevronLeft, ChevronRight} from 'lucide-react'
import Image from 'next/image'

export default function Home() {

	const [scrolled, setScrolled] = useState(false)
	const [fullscreenImage, setFullscreenImage] = useState<{
		index: number;
		section: 'highlights' | 'gallery'
	} | null>(null)
	const [animationClass, setAnimationClass] = useState('')

	const highlightedImages = [
		'/highlighted/MACHINE-37.jpg',
		'/highlighted/MACHINE-26.jpg',
		'/highlighted/MACHINE-18.jpg',
		'/highlighted/MACHINE-35.jpg',
	]

	const galleryImages = [
		'/gallery/MACHINE-22.jpg',
		'/gallery/MACHINE-27.jpg',
		'/gallery/MACHINE-30.jpg',
		'/gallery/MACHINE-33.jpg',
		'/gallery/MACHINE-36.jpg',
		'/gallery/MACHINE-39.jpg',
		'/gallery/MACHINE-43.jpg',
		'/gallery/MACHINE-45.jpg',
		'/gallery/MACHINE-48.jpg',
		'/gallery/MACHINE-52.jpg'
	]

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const handleImageClick = (index: number, section: 'highlights' | 'gallery') => {
		setFullscreenImage({index, section})
		setAnimationClass('fade-in')
	}

	const handleCloseFullscreen = () => {
		setAnimationClass('fade-out')
		setTimeout(() => {
			setFullscreenImage(null)
			setAnimationClass('')
		}, 300)
	}

	const handlePrevImage = useCallback(() => {
		if (!fullscreenImage) return

		setAnimationClass('fade-out')
		setTimeout(() => {
			setFullscreenImage((prev) => {
				if (!prev) return null
				const images = prev.section === 'highlights' ? highlightedImages : galleryImages
				const newIndex = (prev.index - 1 + images.length) % images.length
				return {...prev, index: newIndex}
			})
			setAnimationClass('fade-in')
		}, 150)
	}, [fullscreenImage, highlightedImages, galleryImages])

	const handleNextImage = useCallback(() => {
		if (!fullscreenImage) return

		setAnimationClass('fade-out')
		setTimeout(() => {
			setFullscreenImage((prev) => {
				if (!prev) return null
				const images = prev.section === 'highlights' ? highlightedImages : galleryImages
				const newIndex = (prev.index + 1) % images.length
				return {...prev, index: newIndex}
			})
			setAnimationClass('fade-in')
		}, 150)
	}, [fullscreenImage, highlightedImages, galleryImages])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (fullscreenImage) {
				if (event.key === 'ArrowLeft') {
					handlePrevImage()
				} else if (event.key === 'ArrowRight') {
					handleNextImage()
				} else if (event.key === 'Escape') {
					handleCloseFullscreen()
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [fullscreenImage, handlePrevImage, handleNextImage])

	return (
		<div className="min-h-screen bg-neutral-900 text-neutral-50">
			<section className="relative h-screen">
				<Image
					src="/cover/MACHINE-42.jpg"
					height={613}
					width={1089}
					alt="Project Car Hero"
					className="absolute inset-0 w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/60 to-neutral-900"/>
				<div className="absolute inset-0 flex flex-col items-center justify-center text-white">
					<h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">
						Copa Turbo &apos;83
					</h1>
					<p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
						A journey of restoration and passion
					</p>
					<ChevronDown
						className={`w-12 h-12 animate-bounce ${scrolled ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
					/>
				</div>
			</section>

			<section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
				<h2 className="text-4xl font-semibold mb-12 text-center">Destacadas</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{highlightedImages.map((src, index) => (
						<div key={index} className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
							 onClick={() => handleImageClick(index, 'highlights')}>
							<Image
								src={src}
								height={400}
								width={600}
								alt={`Highlighted Car Image ${index + 1}`}
								className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
							/>
							<div
								className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
								<p className="text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
									Ver a pantalla completa
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
				<h2 className="text-4xl font-semibold mb-12 text-center">Galería</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{galleryImages.map((src, index) => (
						<div key={index} className="relative overflow-hidden cursor-pointer"
							 onClick={() => handleImageClick(index, 'gallery')}>
							<Image
								src={src}
								height={300}
								width={600}
								alt={`Project Car Image ${index + 1}`}
								className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
							/>
							<div
								className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
								<p className="text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
									Ver a pantalla completa
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			<footer className="bg-neutral-800 py-8 px-4 md:px-8">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
					<p className="mb-4 md:mb-0 text-sm">&copy; 2024 Copa Turbo Project Car Showcase. Todos los derechos
						reservados.</p>
					<div className="flex space-x-4">
						<a href="https://www.instagram.com/copaturbo83"
						   target="_blank"
						   className="hover:underline transition-colors duration-200">Instagram</a>
					</div>
				</div>
			</footer>

			{fullscreenImage && (
				<div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 md:p-8">
					<button
						onClick={handleCloseFullscreen}
						className="absolute top-4 right-4 text-white p-2"
						aria-label="Close fullscreen"
					>
						<X className="w-8 h-8"/>
					</button>
					<button
						onClick={handlePrevImage}
						className="absolute left-4 text-white p-2"
						aria-label="Previous image"
					>
						<ChevronLeft className="w-8 h-8"/>
					</button>
					<button
						onClick={handleNextImage}
						className="absolute right-4 text-white p-2"
						aria-label="Next image"
					>
						<ChevronRight className="w-8 h-8"/>
					</button>
					<div className="max-w-full max-h-full overflow-hidden">
						<img
							src={fullscreenImage.section === 'highlights' ? highlightedImages[fullscreenImage.index] : galleryImages[fullscreenImage.index]}
							alt={`Fullscreen ${fullscreenImage.section === 'highlights' ? 'Highlighted' : 'Gallery'} Imagen ${fullscreenImage.index + 1}`}
							className={`w-auto h-auto max-w-full max-h-[calc(100vh-8rem)] object-contain transition-opacity duration-300 ${animationClass}`}
						/>
					</div>
					<div
						className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-4 py-2 rounded-full">
						<p className="text-white text-sm font-semibold">
							{fullscreenImage.section === 'highlights' ? 'Destacadas' : 'Galería'} -
							Imagen {fullscreenImage.index + 1}
						</p>
					</div>
				</div>
			)}

			<style jsx global>{`
        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .fade-out {
          animation: fadeOut 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
		</div>
	);
}
