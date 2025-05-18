// Import jQuery and make it available globally (required for Bootstrap)
import $ from 'jquery';
window.$ = window.jQuery = $;

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';

// Make Bootstrap available globally
window.bootstrap = bootstrap;

// Import Socket.IO client
import { io } from 'socket.io-client';

// Make Socket.IO available globally
window.io = io;

// Initialize your application when DOM is ready
$(document).ready(function() {
  console.log('HelioGovernor application initialized!');
  console.log('jQuery version:', $.fn.jquery);
  console.log('Bootstrap components available:', Object.keys(bootstrap).join(', '));
  
  // Example of initializing Bootstrap components
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  
  // Example function to initialize Socket.IO when needed
  function connectSocket() {
    const socket = io();
    
    socket.on('connect', () => {
      console.log('Connected to server with ID:', socket.id);
    });
    
    return socket;
  }
  
  // Export socket connection function to make it available
  window.connectSocket = connectSocket;
});

// Export anything you want to make available to other modules
export default {
  name: 'HelioGovernor',
  version: '1.0.0',
  init: function() {
    console.log('Initializing HelioGovernor application programmatically');
  }
};
