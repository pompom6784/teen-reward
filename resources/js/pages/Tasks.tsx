import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ALL_TASKS = [
  { id: 1, name: 'Plier le linge',    icon: '🧺', coins: 15, stars: 1, cat: 'rapide'   },
  { id: 2, name: 'Sortir les poubelles', icon: '🗑', coins: 10, stars: 1, cat: 'rapide'   },
  { id: 3, name: 'Laver la vaisselle',  icon: '🍽',  coins: 20, stars: 2, cat: 'fun'      },
  { id: 4, name: 'Aspirer le salon',    icon: '🧹',  coins: 25, stars: 2, cat: 'fun'      },
  { id: 5, name: 'Nettoyer la sdb',     icon: '🛁',  coins: 30, stars: 3, cat: 'gros'     },
  { id: 6, name: 'Ranger ma chambre',   icon: '🛏',  coins: 20, stars: 2, cat: 'fun'      },
  { id: 7, name: 'Laver la voiture',    icon: '🚗',  coins: 40, stars: 3, cat: 'gros'     },
  { id: 8, name: 'Nettoyer les vitres', icon: '🪟',  coins: 20, stars: 2, cat: 'fun'      },
]

const FILTERS = ['tous', 'rapide', 'fun', 'gros']

const coinEmojis = ['💰', '🪙', '✨', '⭐', '💎']

type DoneTask = { id: number, name: string, icon: string, coins: number, stars: number, cat: string }

function CoinBurst({ x, y }: { x: number, y: number }) {
  return (
    <div className="coin-burst">
      {coinEmojis.map((e, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            fontSize: 28,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: (Math.random() - 0.5) * 300,
            y: -200 - Math.random() * 200,
            opacity: 0,
            scale: 0,
            rotate: Math.random() * 360,
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {e}
        </motion.div>
      ))}
    </div>
  )
}

export default function Tasks({ setCoins, setLevel, coins, level }: { setCoins: (c: number) => void, setLevel: (l: number) => void, coins: number, level: number }) {
  const [filter, setFilter] = useState('tous')
  const [doneTask, setDoneTask] = useState<DoneTask | null>(null)
  const [burstPos, setBurstPos] = useState({ x: 0, y: 0 })

  const filtered = filter === 'tous' ? ALL_TASKS : ALL_TASKS.filter(t => t.cat === filter)

  const complete = (task: DoneTask, e: React.MouseEvent<HTMLButtonElement>) => {
    setBurstPos({ x: e.clientX, y: e.clientY })
    setDoneTask(task)
    setTimeout(() => {
      const newCoins = coins + task.coins
      if (newCoins >= 500 && level < 6) {
        setLevel(level + 1)
      }
      setCoins(newCoins)
      setDoneTask(null)
    }, 1600)
  }

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h2>🧹 Mes Missions</h2>
        <p style={{ color: '#999', marginTop: 6 }}>{coins} ChoreCoins accumulés</p>
      </div>

      <div className="filter-tabs">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'tous' ? '✨ Tous' : f === 'rapide' ? '⚡ Rapide' : f === 'fun' ? '🎮 Fun' : '💪 Gros gain'}
          </button>
        ))}
      </div>

      <div className="task-list">
        <AnimatePresence>
          {filtered.map((task, i) => (
            <motion.div
              key={task.id}
              className="task-card"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="task-icon">{task.icon}</div>
              <div className="task-info">
                <div className="task-name">{task.name}</div>
                <div className="task-meta">
                  <span className="task-coins">+{task.coins} 💰</span>
                  <span className="task-stars">{'⭐'.repeat(task.stars)}</span>
                </div>
              </div>
              <motion.button
                className="task-action"
                onClick={(e) => complete(task, e)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                ✓
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {doneTask && (
          <>
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDoneTask(null)}
            />
            <motion.div
              className="modal"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <motion.div
                className="modal-emoji"
                animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
              >
                🎉
              </motion.div>
              <h3>Bravo !</h3>
              <p>Tu as complété :</p>
              <p style={{ fontWeight: 800, fontSize: 18, marginTop: 6 }}>{doneTask.name}</p>
              <motion.div
                className="modal-coins"
                key={doneTask.coins}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                +{doneTask.coins} 💰
              </motion.div>
              <p style={{ color: '#999', fontSize: 13 }}>Continue comme ça ! 🚀</p>
            </motion.div>
            <CoinBurst x={burstPos.x} y={burstPos.y} />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
