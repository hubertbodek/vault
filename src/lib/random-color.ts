const tailwindColors = [
  'bg-blue-400',
  'bg-blue-800',
  'bg-green-400',
  'bg-green-800',
  'bg-yellow-400',
  'bg-yellow-800',
  'bg-red-400',
  'bg-red-800',
  'bg-purple-400',
  'bg-purple-800',
  'bg-pink-400',
  'bg-pink-800',
  'bg-indigo-400',
  'bg-indigo-800',
  'bg-cyan-400',
  'bg-cyan-800',
  'bg-teal-400',
  'bg-teal-800',
]

export const getRandomTailwindColor = () => {
  return tailwindColors[Math.floor(Math.random() * tailwindColors.length)]
}