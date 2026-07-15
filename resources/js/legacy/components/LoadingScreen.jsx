import { motion } from 'framer-motion';

function LoadingScreen() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
                className="h-16 w-16 rounded-full border-4 border-cyan-400/30 border-t-cyan-400"
            />
        </div>
    );
}

export default LoadingScreen;
