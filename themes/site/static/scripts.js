    // Function for page navigation
    function navigatePage(event) {
        if (event.key === 'ArrowLeft' || event.key === 'h') {
            var prevLink = document.getElementById('prev-link');
            if (prevLink) {
                window.location.href = prevLink.href;
            }
        } else if (event.key === 'ArrowRight' || event.key === 'l') {
            var nextLink = document.getElementById('next-link');
            if (nextLink) {
                window.location.href = nextLink.href;
            }
        } else if (event.key === 'u') {
            var prevLink = document.getElementById('lang-link');
            if (prevLink) {
                window.location.href = prevLink.href;
            }
        } else if (event.key === 'i') {
            var tocLink = document.getElementById('toc-link');
            if (tocLink) {
                window.location.href = tocLink.href;
            }
        }
    }

    // Global variables for paragraph and media navigation
    let contentElements;
    let currentElementIndex = -1;

    // Function to scroll to a specific element
    function scrollToElement(index) {
        if (currentElementIndex !== -1 && currentElementIndex < contentElements.length) {
            contentElements[currentElementIndex].classList.remove('highlight');
        }
        if (index >= 0 && index < contentElements.length) {
            contentElements[index].classList.add('highlight');
            contentElements[index].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            window.scrollBy(0, -50);
            currentElementIndex = index;
        } else {
            currentElementIndex = -1;
        }
    }

    // Function to get the index of an element with a specific ID
    function getElementIndexById(id) {
        for (let i = 0; i < contentElements.length; i++) {
            if (contentElements[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    // Function to navigate to the first link in the highlighted media element
    function navigateToFirstLinkInMedia(event) {
        if (event.key === 'Enter' && currentElementIndex !== -1) {
            const currentElement = contentElements[currentElementIndex];
            if (currentElement.classList.contains('media')) {
				const firstLink = currentElement.querySelector('a');
				if (firstLink) {
					if (firstLink.target === '_blank') {
						window.open(firstLink.href, '_blank');
					} else {
						window.location.href = firstLink.href;
					}
				}
            }
        }
    }

    // Function for paragraph and media navigation
    function navigateContent() {
        contentElements = document.querySelectorAll('article p, article .media');
        
        // Check if the URL has a hashtag and get the ID
        const hash = window.location.hash.substring(1);
        if (hash) {
            const navigationReturnElement = document.getElementById(hash);
            if (navigationReturnElement) {
                currentElementIndex = getElementIndexById(hash);
                scrollToElement(currentElementIndex);
            }
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowDown' || event.key === 'j') {
                if (currentElementIndex < contentElements.length - 1) {
                    scrollToElement(currentElementIndex + 1);
                } else {
                    // If already past the last element, just scroll the page down
                    if (currentElementIndex !== -1 && currentElementIndex < contentElements.length) {
                        contentElements[currentElementIndex].classList.remove('highlight');
                    }
                    window.scrollBy(0, window.innerHeight);
                    currentElementIndex = contentElements.length; // Indicate that we are past the last element
                }
            } else if (event.key === 'ArrowUp' || event.key === 'k') {
                if (currentElementIndex > 0) {
                    scrollToElement(currentElementIndex - 1);
                } else {
                    // If already before the first element, just scroll the page up
                    if (currentElementIndex !== -1 && currentElementIndex < contentElements.length) {
                        contentElements[currentElementIndex].classList.remove('highlight');
                    }
                    window.scrollBy(0, -window.innerHeight);
                    currentElementIndex = -1; // Indicate that we are before the first element
                }
            }
        });

        document.addEventListener('keydown', navigateToFirstLinkInMedia);
    }

	// Function for scroll down click button
	function scrollDownButton() {
		// Get the position of the bottom of the viewport before scrolling
		const previousBottomPosition = window.scrollY + window.innerHeight;

		// Create the indicator line
		const indicator = document.createElement('div');
		indicator.id = 'indicator';
		indicator.style.top = previousBottomPosition + 'px';

		// Append the indicator to the body
		document.body.appendChild(indicator);

		// Scroll the page
		window.scrollBy({
			top: document.documentElement.clientHeight * 1, // Scroll by 90% of the viewport height
			behavior: 'smooth'
		});

		// Remove the indicator after a short delay
		setTimeout(function() {
			indicator.remove();
		}, 5000); // Adjust the delay as needed (in milliseconds)
	}

    // Add event listeners
    document.addEventListener('keydown', navigatePage);
    document.addEventListener('DOMContentLoaded', navigateContent);
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('downButton').addEventListener('click', scrollDownButton);
    });
