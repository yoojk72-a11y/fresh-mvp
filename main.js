if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
      .then(() => console.log("Service Worker 등록 완료"));
  }
  function checkExpiryNotifications() {

    const items = JSON.parse(localStorage.getItem("freshItems")) || [];
    const today = new Date();
  
    items.sort((a, b) => {
      return new Date(a.expiryDate) - new Date(b.expiryDate);
     });

    items.forEach(item => {

      const expiry = new Date(item.expiryDate);
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
      if (diffDays <= item.notifyDays && !item.notified) {
    
        sendNotification(
          "⏰ 유통기한 임박",
          `${item.name} ${diffDays}일 남았습니다`
        );
    
        item.notified = true;
    
      }
    
    });
   
    localStorage.setItem("freshItems", JSON.stringify(items));
  }

  function sendNotification(title, body) {

    if (Notification.permission === "granted") {
  
      navigator.serviceWorker.getRegistration().then(reg => {
  
        if (reg) {
          reg.showNotification(title, {
            body: body,
            icon: "/icon-192.png"
          });
        }
  
      });
  
    }
  
  }
  window.addEventListener("load", () => {

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  
    checkExpiryNotifications();
  
  });