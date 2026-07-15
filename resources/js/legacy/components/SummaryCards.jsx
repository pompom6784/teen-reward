import { motion } from 'framer-motion';
import { cardVariants } from '../spa/utils';

function SummaryCards({ summaryCards }) {
    return (
        <section className="grid gap-4 md:grid-cols-3">
            {summaryCards.map((card, index) => (
                <motion.div
                    key={card.label}
                    variants={cardVariants(index * 0.05)}
                    initial="hidden"
                    animate="visible"
                    className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur"
                >
                    <p className="text-sm text-slate-400">{card.label}</p>
                    <p className="mt-3 text-3xl font-black text-white">{card.value}</p>
                </motion.div>
            ))}
        </section>
    );
}

export default SummaryCards;
