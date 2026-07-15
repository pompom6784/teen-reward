import { motion } from 'framer-motion'

export type Tab = { id: 'home' | 'tasks' | 'shop', emoji: string, label: string }

const tabs: Tab[] = [
  { id: 'home', emoji: '🏠', label: 'Accueil' },
  { id: 'tasks', emoji: '🧹', label: 'Missions' },
  { id: 'shop', emoji: '🛍', label: 'Boutique' },
]

export default function Navbar({ setPage, activePage }: { setPage: (page: Tab['id']) => void, activePage: string }) {
  return (
    <nav className="navbar">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => setPage(tab.id)}
          className={activePage === tab.id ? 'active' : ''}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          {tab.emoji}
        </motion.button>
      ))}
    </nav>
  )
}
