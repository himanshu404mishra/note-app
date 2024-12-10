
export const notification = (message, type = 'default', duration = 5000) => {

      const container = document.querySelector('.notification-container');
      
      // Create notification element
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      
      // Create message text
      const messageText = document.createElement('span');
      messageText.textContent = message;
      
      // Create close button
      const closeButton = document.createElement('button');
      closeButton.className = 'close-btn';
      closeButton.innerHTML = '<i class="ri-close-line"></i>';
      closeButton.onclick = () => removeNotification(notification);
      
      // create loading effect
      const loading = document.createElement("div")
      loading.id="loading"
      loading.classList.add("absolute","bottom-0","left-0","w-full", "h-1","bg-blue-500")

      // Append elements
      notification.appendChild(messageText);
      notification.appendChild(closeButton);
      notification.appendChild(loading)
      container.appendChild(notification);
      
      // Set timeout for auto-removal
      setTimeout(() => removeNotification(notification), duration);
  }


function removeNotification(notification) {
    notification.classList.add('fade-out');
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 500);
}
