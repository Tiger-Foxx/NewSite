/**
 * Patch pour corriger les problèmes d'animation dans Framer Motion
 */
if (typeof window !== 'undefined') {
    // Intercepter toutes les animations pour corriger les cubic-bezier problématiques
    const originalAnimate = window.Element.prototype.animate;
    if (originalAnimate) {
        window.Element.prototype.animate = function (keyframes, options) {
            // Clone les options pour ne pas modifier l'original
            if (options && typeof options === 'object') {
                const newOptions = { ...options };

                // Corriger le easing si c'est un cubic-bezier problématique
                if (typeof newOptions.easing === 'string' &&
                    newOptions.easing.includes('cubic-bezier') &&
                    newOptions.easing.includes('-')) {
                    console.log('⚠️ Correcting problematic cubic-bezier:', newOptions.easing);
                    newOptions.easing = 'ease-in-out';
                }

                // Appliquer l'animation avec les options corrigées
                return originalAnimate.call(this, keyframes, newOptions);
            }

            return originalAnimate.apply(this, arguments);
        };
        console.log('✅ Framer Motion animation patch applied');
    }

    // Surcharger les presets d'ease problématiques
    // Cette partie doit être exécutée après le chargement de Framer Motion
    window.addEventListener('load', () => {
        setTimeout(() => {
            try {
                // Liste des noms de presets potentiellement problématiques
                const problematicPresets = ['circOut', 'circIn', 'circInOut', 'backIn', 'backOut', 'backInOut'];

                // Si l'objet global de Framer Motion est disponible
                if (window.framerMotion || window.framer) {
                    const fm = window.framerMotion || window.framer;

                    // Remplacer les presets problématiques
                    problematicPresets.forEach(presetName => {
                        if (fm && fm.easing && fm.easing[presetName]) {
                            console.log(`🔧 Replacing problematic ease preset: ${presetName}`);
                            fm.easing[presetName] = 'ease-in-out';
                        }
                    });
                }
            } catch (error) {
                console.warn('Could not patch Framer Motion easing presets:', error);
            }
        }, 1000); // Délai pour s'assurer que Framer Motion est chargé
    });
}