navigator.serviceWorker.register('service-worker.js');
navigator.serviceWorker.ready.then(registration => {
  addEventListener('message', event => {
    if (!localStorage.allowed) {
      return;
    }
    const origins = JSON.parse(localStorage.allowed);
    if (!origins.includes(event.origin)) {
      return;
    }
    registration.showNotification(event.data);
  });
});