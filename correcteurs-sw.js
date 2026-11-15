/* Révision INFAS — page des correcteurs : affiche les alertes « nouvelles questions à vérifier »
   (y compris celles envoyées par le serveur quand le navigateur est fermé) et rouvre la page quand on touche l'alerte.
   Ne met rien en cache. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('push', e => {
  e.waitUntil(self.registration.showNotification('Nouvelles questions à vérifier', {
    body: 'Des élèves ont signalé des questions : donne ton avis avec ton cours.', tag: 'ri-correcteurs', renotify: true,
    data: {url: 'correcteurs.html'}}));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(L => {
    const c = L.find(w => /correcteurs\.html/.test(w.url));
    return c ? c.focus() : self.clients.openWindow('correcteurs.html');
  }));
});
