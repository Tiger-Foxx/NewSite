import React from 'react';
import { motion } from 'framer-motion';

export const ContactMap: React.FC = () => {
    return (
        <motion.div
            className="bg-fox-dark rounded-xl border border-fox-light/10 shadow-lg overflow-hidden h-80 md:h-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.5803545315826!2d11.48948447387793!3d3.867864496123981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bc58ed400c34d%3A0xcb05b175fdf5c6fd!2sNational%20Advanced%20School%20of%20Engineering%20(Polytechnic)!5e0!3m2!1sen!2scm!4v1683041932837!5m2!1sen!2scm"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="École Polytechnique de Yaoundé"
                className="w-full h-full"
            ></iframe>
        </motion.div>
    );
};