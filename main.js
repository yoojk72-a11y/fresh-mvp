if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
      .then(() => console.log("Service Worker 등록 완료"));
  }
  function checkExpiryNotifications() {

    const items = JSON.parse(localStorage.getItem("freshItems")) || [];
    const today = new Date();
  
    items.forEach(item => {
  
      const expiry = new Date(item.expiryDate);
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
      if (diffDays === 3) {
        sendNotification("⏰ 유통기한 3일 남음", `${item.name} 사용 준비하세요`);
      }
  
      if (diffDays === 1) {
        sendNotification("⚠️ 유통기한 하루 남음", `${item.name} 오늘 사용 권장`);
      }
  
    });
  
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