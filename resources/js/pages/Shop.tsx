import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const REWARDS = [
  { id: 1, name: '30 min d\'écran',    emoji: '📱', cost: 50  },
  { id: 2, name: 'Un dessert',        emoji: '🍰', cost: 75  },
  { id: 3, name: 'Sortie au parc',    emoji: '🎢', cost: 100 },
  { id: 4, name: 'Film + popcorn',    emoji: '🎬', cost: 150 },
  { id: 5, name: 'Sleep-in 30min',    emoji: '😴', cost: 80  },
  { id: 6, name: 'Choix du dîner',    emoji: '🍕', cost: 60  },
  { id: 7, name: 'Jour sans chores', emoji: '🏖️', cost: 200 },
  { id: 8, name: 'Bon pour 10€',     emoji: '💶', cost: 300 },
]

type Reward = { id: number, name: string, emoji: string, cost: number };

export default function Shop({ coins, setCoins }: { coins: number, setCoins: (c: number) => void }) {
  const [purchased, setPurchased] = useState<Reward | null>(null)

  const buy = (reward: Reward) => {
    if (coins < reward.cost) {
      return;
    }
    setCoins(coins - reward.cost)
    setPurchased(reward)
    setTimeout(() => setPurchased(null), 2500)
  }

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h2>🛍 Boutique</h2>
        <div className="shop-coins">💰 {coins} ChoreCoins</div>
      </div>

      <div className="shop-grid">
        {REWARDS.map((r, i) => {
          const can = coins >= r.cost
          return (
            <motion.div
              key={r.id}
              className={`reward-card ${can ? 'affordable' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              whileHover={can ? { scale: 1.05 } : {}}
              whileTap={can ? { scale: 0.95 } : {}}
            >
              <div className="reward-emoji">{r.emoji}</div>
              <div className="reward-name">{r.name}</div>
              <div className={`reward-cost ${can ? '' : 'cant'}`}>
                💰 {r.cost}
              </div>
              <motion.button
                className="reward-btn"
                disabled={!can}
                onClick={() => buy(r)}
                whileTap={can ? { scale: 0.9 } : {}}
              >
                {can ? 'échanger' : 'pas assez'}
              </motion.button>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {purchased && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            >
              <motion.div
                className="modal-emoji"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                🎁
              </motion.div>
              <h3>Échange réussi !</h3>
              <p style={{ color: '#666', marginTop: 4 }}>Tu as obtenu :</p>
              <div style={{ fontSize: 36, margin: '12px 0' }}>{purchased.emoji}</div>
              <div style={{ fontWeight: 800, fontSize: 20 }}>{purchased.name}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
