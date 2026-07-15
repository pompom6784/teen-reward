import { motion } from 'framer-motion'

const levelNames = [
  'Novice du balai',      // 1
  'Aspirateur en herbe',  // 2
  'Apprenti Ninja 🏆',    // 3
  'Maître du Magnifique',// 4
  'Champion du Propre',   // 5
  'Légende Ordure',       // 6
]

const nextLevelAt = 500

export default function Dashboard({ coins, level }: { coins: number, level: number }) {
  const pct = Math.min((coins / nextLevelAt) * 100, 100)
  const name = levelNames[level - 1] || 'Novice'

  return (
    <div className="dashboard">
      <motion.p
        className="greeting"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Salut petit ninja 👋
      </motion.p>
      <motion.h1
        className="username"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        Alex
      </motion.h1>

      <motion.div
        className="balance-card"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="balance-label">Solde actuel</p>
        <motion.div
          className="balance-amount"
          key={coins}
          initial={{ scale: 1.4 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {coins}
        </motion.div>
        <span className="level-badge">
          ⭐ {name}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <p style={{ fontSize: 13, color: '#999', marginBottom: 6 }}>
          Prochain niveau dans {nextLevelAt - coins} coins
        </p>
        <div className="level-progress">
          <motion.div
            className="level-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
        <p className="progress-text">{Math.round(pct)}% vers le niveau {level + 1}</p>
      </motion.div>

      <motion.div
        className="bonus-banner"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        🎁 Défi du jour : fais 2 tâches → +10 coins bonus !
      </motion.div>
    </div>
  )
}
