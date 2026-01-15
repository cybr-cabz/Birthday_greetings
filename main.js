function showFlowersPage() {
  var name = document.getElementById('click').value.trim();
  document.getElementById('intro-page').style.display = 'none';
  document.getElementById('flowers-page').style.display = '';

  // Start typewriter animations after page shows
  setTimeout(() => {
    startTitleTypewriter();
    startWishTypewriter();
  }, 500);
}

document.getElementById('click').onclick = showFlowersPage;

document.getElementById('click').onclick = function () {
  showFlowersPage();
}

// Typewriter effect for birthday title - infinite loop
function startTitleTypewriter() {
  const titleElement = document.querySelector('.birthday-title');
  const fullText = titleElement.textContent;
  let charIndex = 0;
  let isDeleting = false;

  titleElement.textContent = '';
  titleElement.style.opacity = '1';

  function typeTitle() {
    if (!isDeleting) {
      // Typing
      titleElement.textContent = fullText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === fullText.length) {
        // Pause at end before deleting
        setTimeout(() => {
          isDeleting = true;
          typeTitle();
        }, 1500);
        return;
      }
    } else {
      // Deleting
      titleElement.textContent = fullText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        // Pause at start before typing again
        setTimeout(() => {
          isDeleting = false;
          typeTitle();
        }, 500);
        return;
      }
    }

    // Speed: typing is faster, deleting is even faster
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeTitle, speed);
  }

  typeTitle();
}

// Typewriter effect for birthday wish - single run, stops when done
function startWishTypewriter() {
  const wishElement = document.querySelector('.birthday-wish');
  const fullHTML = wishElement.innerHTML;
  // Convert HTML to handle <br> tags properly
  const parts = fullHTML.split(/<br\s*\/?>/gi);
  let currentPart = 0;
  let charIndex = 0;
  let displayText = '';

  wishElement.innerHTML = '';
  wishElement.style.opacity = '1';

  function typeWish() {
    if (currentPart < parts.length) {
      const currentText = parts[currentPart];

      if (charIndex < currentText.length) {
        displayText += currentText.charAt(charIndex);
        wishElement.innerHTML = displayText + '<span class="cursor">|</span>';
        charIndex++;
        setTimeout(typeWish, 40);
      } else {
        // Move to next line
        currentPart++;
        if (currentPart < parts.length) {
          displayText += '<br>';
          charIndex = 0;
          setTimeout(typeWish, 100);
        } else {
          // Done typing - remove cursor
          wishElement.innerHTML = displayText;
          wishElement.classList.add('typing-done');
        }
      }
    }
  }

  // Start wish typing after title has had some time
  setTimeout(typeWish, 2000);
}