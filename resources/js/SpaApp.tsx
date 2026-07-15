import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Navbar, { Tab } from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Shop from './pages/Shop'


export default function App() {
  const [page, setPage] = useState<Tab['id']>('home')
  const [coins, setCoins] = useState<number>(245)
  const [level, setLevel] = useState<number>(3)

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="page"
        >
          {page === 'home' && <Dashboard coins={coins} level={level} />}
          {page === 'tasks' && <Tasks setCoins={setCoins} setLevel={setLevel} coins={coins} level={level} />}
          {page === 'shop' && <Shop coins={coins} setCoins={setCoins} />}
        </motion.div>
      </AnimatePresence>
      <Navbar setPage={setPage} activePage={page} />
    </div>
  )
}