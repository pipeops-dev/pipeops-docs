/**
 * iframe Compatibility Layer for Docusaurus
 * Fixes getBoundingClientRect and other iframe-related issues
 */
(function () {
  "use strict";

  // Check if we're running inside an iframe
  const isInIframe = window.self !== window.top;

  if (!isInIframe) {
    return; // Not in iframe, no fixes needed
  }

  console.log("Docusaurus iframe compatibility layer loaded");

  // Add iframe indicator to document
  document.documentElement.setAttribute("data-iframe", "true");

  // Fix getBoundingClientRect for iframe context
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  Element.prototype.getBoundingClientRect = function () {
    try {
      const rect = originalGetBoundingClientRect.call(this);

      // Ensure all required properties exist
      return {
        top: rect.top || 0,
        left: rect.left || 0,
        bottom: rect.bottom || 0,
        right: rect.right || 0,
        width: rect.width || 0,
        height: rect.height || 0,
        x: rect.x || rect.left || 0,
        y: rect.y || rect.top || 0,
      };
    } catch (error) {
      console.warn(
        "getBoundingClientRect fallback used for iframe context:",
        error
      );

      // Return a safe fallback
      return {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      };
    }
  };

  // Fix scroll-related issues in iframe
  const originalScrollTo = window.scrollTo;
  window.scrollTo = function (x, y) {
    try {
      originalScrollTo.call(this, x, y);
    } catch (error) {
      console.warn("scrollTo fallback used for iframe context:", error);
      // Fallback: try to scroll the iframe element itself
      if (window.parent && window.parent !== window) {
        try {
          window.parent.scrollTo(x, y);
        } catch (e) {
          // Silent fail for cross-origin restrictions
        }
      }
    }
  };

  // Fix window resize events in iframe
  let resizeTimeout;
  const handleIframeResize = function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      // Trigger a custom event for iframe resize
      window.dispatchEvent(new CustomEvent("iframe-resize"));
    }, 100);
  };

  // Listen for iframe resize
  window.addEventListener("resize", handleIframeResize);

  // Fix focus management in iframe
  document.addEventListener("DOMContentLoaded", function () {
    // Ensure proper focus handling for iframe context
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(function (element) {
      element.addEventListener("focus", function () {
        // Ensure the iframe is visible when elements are focused
        try {
          element.scrollIntoView({ behavior: "smooth", block: "nearest" });
        } catch (error) {
          // Fallback for iframe context
          element.scrollIntoView();
        }
      });
    });
  });

  // Notify parent window that iframe is ready (if same origin)
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        {
          type: "docusaurus-iframe-ready",
          url: window.location.href,
        },
        "*"
      );
    }
  } catch (error) {
    // Silent fail for cross-origin restrictions
  }
})();
