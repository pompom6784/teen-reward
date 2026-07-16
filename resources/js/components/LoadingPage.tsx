import { motion } from 'framer-motion';

export default function LoadingPage() {
    return (
        <div className="page loading-page">
            <motion.div
                className="balance-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <p className="balance-label">Chargement</p>
                <div className="balance-amount">…</div>
            </motion.div>
        </div>
    );
}
