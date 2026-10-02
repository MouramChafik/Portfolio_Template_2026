/*
 * Script exécuté dans <head> avant le premier affichage : il applique le thème
 * enregistré (ou celui du système) pour éviter tout flash au chargement.
 */
export const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t);var dark=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(dark)d.classList.add("is-dark")}catch(e){}})();`;
